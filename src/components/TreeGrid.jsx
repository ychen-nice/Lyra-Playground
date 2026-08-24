import { useState, useMemo, useCallback, useEffect, useRef, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ChevronLeft, ChevronDown, Check, Minus, EllipsisVertical, Search, X } from 'lucide-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Button from './Button';
import '../styles/typography.css';
import '../styles/treeGrid.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const INDENT = 24; // px per level — 1.5rem
const BASE_PADDING = 8; // 0.5rem — left padding for every row regardless of level
const ROW_HEIGHT_PX = 32; // matches lyra/row-height/sm, used for the grid's rowHeight param

// ag-grid's Theming API takes CSS values directly, so every param below points
// straight at a Lyra token rather than a literal color/size.
const treeGridTheme = themeQuartz.withParams({
  accentColor:            'var(--lyra-color-bg-active-strong)',
  backgroundColor:        'var(--lyra-color-bg-surface-container)',
  foregroundColor:        'var(--lyra-color-fg-default)',
  borderColor:            'transparent',
  wrapperBorder:          false,
  rowBorder:              false,
  headerRowBorder:        false,
  columnBorder:           false,
  fontFamily:             'Inter, sans-serif',
  fontSize:               '0.875rem', // matches lyra-body-md
  rowHeight:              'var(--lyra-row-height-sm)',
  headerHeight:           0,
  rowHoverColor:          'var(--lyra-color-state-bg-hover-opacity)',
  selectedRowBackgroundColor: 'var(--lyra-color-bg-active-subtle)',
});

/* ─── Tree helpers — AG Grid Community has no tree-data mode (Enterprise-only),
   so the hierarchy is flattened into plain rows ourselves, one level at a time,
   skipping any subtree whose parent isn't expanded. ────────────────────────── */
function collectLeafIds(node, out = []) {
  if (!node.children?.length) { out.push(node.id); return out; }
  for (const child of node.children) collectLeafIds(child, out);
  return out;
}

// A parent's own check state is never stored directly — it's derived from its
// descendant leaves, so a folder reads as indeterminate the instant only some
// of its contents are selected, with no separate bookkeeping to keep in sync.
function computeCheckState(node, selectedIds) {
  if (!node.children?.length) return selectedIds.has(node.id) ? 'checked' : 'unchecked';
  const childStates = node.children.map(child => computeCheckState(child, selectedIds));
  if (childStates.every(s => s === 'checked')) return 'checked';
  if (childStates.every(s => s === 'unchecked')) return 'unchecked';
  return 'indeterminate';
}

/* ─── Tree helpers — AG Grid Community has no tree-data mode (Enterprise-only),
   so the hierarchy is flattened into plain rows ourselves, one level at a time,
   skipping any subtree whose parent isn't expanded. ────────────────────────── */
function flatten(nodes, expandedIds, selectedIds, selectionMode, searchQuery, level = 0, parentId = null, out = []) {
  for (const node of nodes) {
    const hasChildren = !!node.children?.length;
    const expanded = hasChildren && expandedIds.has(node.id);
    // Only multi-select cascades into a tri-state; single/none reduce to a plain toggle.
    const checkState = selectionMode === 'none'
      ? 'unchecked'
      : selectionMode === 'multiple'
        ? computeCheckState(node, selectedIds)
        : (selectedIds.has(node.id) ? 'checked' : 'unchecked');
    out.push({
      id: node.id,
      label: node.label,
      icon: node.icon,
      info: node.info,
      level,
      parentId,
      hasChildren,
      expanded,
      checkState,
      selected: checkState === 'checked',
      leafIds: hasChildren ? collectLeafIds(node) : null,
      searchQuery,
    });
    if (expanded) flatten(node.children, expandedIds, selectedIds, selectionMode, searchQuery, level + 1, node.id, out);
  }
  return out;
}

// Shared by the cell renderer (for click/cursor affordance) and the keyboard
// handler (for Space) so the two never disagree about what's pickable.
// Applies in both selection modes: a leaf is always selectable; a parent is
// selectable only when selectableParent is true.
function isRowSelectable(row, selectionMode, selectableParent) {
  if (selectionMode === 'none') return false;
  if (!row.hasChildren) return true;
  return selectableParent;
}

// "Contains" search — keeps a node when its own label matches or any
// descendant's does, so a match's ancestor chain stays visible for context
// even though the ancestor itself didn't match anything.
function filterTree(nodes, query) {
  const out = [];
  for (const node of nodes) {
    const selfMatches = node.label.toLowerCase().includes(query);
    const filteredChildren = node.children ? filterTree(node.children, query) : undefined;
    if (selfMatches || filteredChildren?.length) {
      out.push(filteredChildren ? { ...node, children: filteredChildren } : node);
    }
  }
  return out;
}

// Wraps every case-insensitive occurrence of `query` in a bold highlighted
// span; returns the label untouched when there's nothing to search for.
function highlightLabel(label, query) {
  if (!query) return label;
  const lower = label.toLowerCase();
  let start = 0;
  let idx = lower.indexOf(query, start);
  if (idx === -1) return label;
  const parts = [];
  while (idx !== -1) {
    if (idx > start) parts.push(label.slice(start, idx));
    parts.push(
      <mark key={idx} style={{
        background: 'var(--lyra-color-accent-yellow-soft)',
        color: 'inherit', fontWeight: 700, borderRadius: 'var(--lyra-radius-xs)',
      }}>
        {label.slice(idx, idx + query.length)}
      </mark>
    );
    start = idx + query.length;
    idx = lower.indexOf(query, start);
  }
  if (start < label.length) parts.push(label.slice(start));
  return parts;
}

function collectParentIds(nodes, out = []) {
  for (const node of nodes) {
    if (node.children?.length) {
      out.push(node.id);
      collectParentIds(node.children, out);
    }
  }
  return out;
}

const ROW_MENU_ACTIONS = [
  { key: 'add', label: 'Add' },
  { key: 'rename', label: 'Rename' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'delete', label: 'Delete', destructive: true, dividerBefore: true },
];

/* ─── Row action menu — rendered via portal into document.body, positioned
   from the trigger button's own bounding rect, so it floats above the grid's
   scrolling/virtualized viewport instead of getting clipped by it. */
function RowActionMenu({ top, insetInlineEnd, triggerEl, onAction, onClose, rtl }) {
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIndexRef = useRef(0);
  // Set right before *this* component deliberately hands focus back to
  // triggerEl (Tab/Escape exit) so the reclaim listener below knows to let
  // that one through instead of treating it as an unwanted refocus.
  const exitingRef = useRef(false);

  // Focuses the first item regardless of how the menu was opened — matches
  // both the keyboard-Enter case explicitly asked for and the standard ARIA
  // menu pattern (mouse-opened menus are just as navigable afterward).
  useEffect(() => {
    itemRefs.current[0]?.focus();
  }, []);

  // Opening the menu via keyboard (Tab to the button, then Enter/Space)
  // leaves the button itself holding real focus at the moment this menu
  // mounts. ag-grid separately tracks "which cell has keyboard focus" for
  // its own navigation, and the row-highlight effect in TreeGrid forces a
  // refresh of this exact row right as the menu opens — ag-grid's redraw
  // then reasserts focus on the (re)created button as part of restoring
  // what it believes was focused, yanking focus back out of this
  // portal-rendered menu a tick after the effect above already set it.
  // Reclaiming it here, rather than trying to out-wait that redraw with a
  // fixed delay, survives regardless of how many passes it takes.
  useEffect(() => {
    if (!triggerEl) return;
    const reclaim = () => {
      if (exitingRef.current) { exitingRef.current = false; return; }
      itemRefs.current[activeIndexRef.current]?.focus();
    };
    triggerEl.addEventListener('focus', reclaim);
    return () => triggerEl.removeEventListener('focus', reclaim);
  }, [triggerEl]);

  const exitToTrigger = () => {
    exitingRef.current = true;
    onClose();
    triggerEl?.focus();
  };

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') exitToTrigger();
    };
    // The menu's position is computed once, from the trigger button's
    // bounding rect, at the moment it opens — it doesn't track the button
    // across a resize, so it would otherwise drift away from (or on top of)
    // whatever it was originally anchored to. Simplest fix is the one every
    // native menu/select uses: closing rather than trying to re-anchor.
    const handleResize = () => onClose();
    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose, triggerEl]);

  const handleMenuKeyDown = (e) => {
    const items = itemRefs.current.filter(Boolean);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = items.indexOf(document.activeElement);
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + delta + items.length) % items.length;
      activeIndexRef.current = nextIndex;
      items[nextIndex]?.focus();
    } else if (e.key === 'Tab') {
      // Either direction exits the menu the same way — back to the button
      // that opened it — rather than falling through to native DOM order.
      e.preventDefault();
      exitToTrigger();
    }
  };

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      dir={rtl ? 'rtl' : 'ltr'}
      onKeyDown={handleMenuKeyDown}
      style={{
        position: 'fixed', top, insetInlineEnd, width: 'max-content', minWidth: '7.5rem',
        background: 'var(--lyra-color-bg-surface-overlay)',
        border: '1px solid var(--lyra-color-border-subtle)',
        borderRadius: 'var(--lyra-radius-md)',
        boxShadow: 'var(--lyra-shadow-md)',
        padding: 'var(--lyra-spacing-2)',
        zIndex: 1000,
      }}
    >
      {ROW_MENU_ACTIONS.map((action, i) => (
        <div key={action.key}>
          {action.dividerBefore && (
            <div style={{ height: 1, background: 'var(--lyra-color-border-subtle)', margin: 'var(--lyra-spacing-2) 0' }} />
          )}
          <button
            ref={(el) => { itemRefs.current[i] = el; }}
            type="button"
            role="menuitem"
            className="lyra-body-md lyra-row-menu-item"
            onClick={() => { onAction(action.key); onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', textAlign: 'start', boxSizing: 'border-box',
              height: 'var(--lyra-row-height-sm)',
              padding: '0 var(--lyra-spacing-3)',
              border: 'none', background: 'transparent', cursor: 'pointer',
              borderRadius: 'var(--lyra-radius-sm)',
              color: action.destructive ? 'var(--lyra-color-status-critical-strong)' : 'var(--lyra-color-fg-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = action.destructive
                ? 'var(--lyra-color-state-bg-hover-critical-subtle)'
                : 'var(--lyra-color-state-bg-hover-opacity)';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {action.label}
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

/* ─── Checkbox — no shared Checkbox component exists yet in this design
   system, so a minimal tokenized one lives here rather than pulling in a
   dependency for a single glyph. ───────────────────────────────────────── */
function TreeCheckbox({ checked, indeterminate, onChange, ariaLabel }) {
  return (
    <span
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={ariaLabel}
      // Not its own tab stop — the row is the single roving-tabindex target,
      // and Space on the row triggers this same toggle.
      tabIndex={-1}
      onClick={(e) => { e.stopPropagation(); onChange(e.shiftKey); }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box', // keeps the unchecked border inset within 1rem instead of adding to it
        width: '1rem', height: '1rem', flexShrink: 0, cursor: 'pointer',
        borderRadius: 'var(--lyra-radius-xs)',
        border: (checked || indeterminate) ? 'none' : '1px solid var(--lyra-color-border-strong)',
        background: (checked || indeterminate) ? 'var(--lyra-color-bg-active-strong)' : 'var(--lyra-color-bg-control)',
      }}
    >
      {checked && <Check size={12} color="var(--lyra-color-fg-on-primary)" strokeWidth={3} />}
      {indeterminate && !checked && <Minus size={12} color="var(--lyra-color-fg-on-primary)" strokeWidth={3} />}
    </span>
  );
}

function HierarchyCell({
  data, selectionMode, showIcons, selectableParent,
  onToggleExpand, onToggleSelect, onRowFocus, onRowKeyDown, rowRef, initialTabIndex,
  isRenaming, onCommitRename, onCancelRename, rtl,
}) {
  const { level, hasChildren, expanded, icon, label, id, selected, checkState, searchQuery } = data;
  const renameInputRef = useRef(null);
  // Escaping unmounts the input, which fires a real DOM blur event — without
  // this guard that blur would immediately re-commit the value Escape just
  // discarded.
  const skipBlurCommitRef = useRef(false);
  useEffect(() => {
    if (isRenaming) {
      skipBlurCommitRef.current = false;
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [isRenaming]);
  // Selection can be restricted to leaves only (e.g. "pick a file, not a
  // folder") in either mode — when a parent isn't selectable, clicking it
  // just expands/collapses instead, same as clicking its chevron would.
  const isSelectable = isRowSelectable(data, selectionMode, selectableParent);
  const rowClickSelect = isSelectable
    ? () => onToggleSelect(data)
    : hasChildren
      ? () => onToggleExpand(id)
      : undefined;
  // Multi-select already marks a pick with its checkbox, so text/icon stay in the
  // default color there instead of doubling up on the active-strong accent.
  const selectedColor = selectionMode === 'multiple' ? 'var(--lyra-color-fg-default)' : 'var(--lyra-color-fg-active-strong)';
  return (
    <div
      ref={rowRef}
      role="treeitem"
      aria-level={level + 1}
      aria-expanded={hasChildren ? expanded : undefined}
      aria-selected={selectionMode !== 'none' ? selected : undefined}
      // Roving tabindex — only the currently-focused row is Tab-reachable.
      // This is the render-time (mount/refresh) value only; once mounted,
      // focus moves flip the attribute directly on the DOM node (see
      // setFocused) rather than through this prop, so an already-mounted
      // row's tabindex updates without needing to re-render at all.
      tabIndex={initialTabIndex}
      // Bubbles up from the rename `<input>` too (it's a descendant) — while
      // renaming, the roving-tabindex system must not fight the input for
      // focus by refocusing this row div out from under it.
      onFocus={() => { if (!isRenaming) onRowFocus(id); }}
      onKeyDown={(e) => onRowKeyDown(e, data)}
      className="lyra-tree-row"
      // No inline `outline` here — an inline style would beat the CSS
      // `:focus-visible` rule (lyra-tree-row) regardless of specificity,
      // permanently hiding the ring it's meant to draw.
      style={{
        // `direction` is a real, inherited CSS property — setting it once
        // here (rather than flipping flexDirection/left/right by hand) means
        // every logical property below (paddingInlineStart, insetInlineStart,
        // flex-start/flex-end) automatically resolves to the correct physical
        // side, for this row and everything nested inside it.
        direction: rtl ? 'rtl' : 'ltr',
        display: 'flex', alignItems: 'center', height: '100%',
        gap: 'var(--lyra-spacing-2)', position: 'relative',
        paddingInlineStart: BASE_PADDING + level * INDENT,
      }}
    >
      {/* Multi-select already reads as selected via its checkbox + text styling —
         the row highlight and accent bar are reserved for single-select. */}
      {selected && selectionMode !== 'multiple' && (
        <span style={{
          position: 'absolute', insetInlineStart: 0, top: '28%', bottom: '28%',
          width: 'var(--lyra-spacing-05)', background: 'var(--lyra-color-fg-active-strong)',
          borderRadius: 'var(--lyra-radius-xs)',
        }} />
      )}
      <span
        onClick={hasChildren ? (e) => { e.stopPropagation(); onToggleExpand(id); } : undefined}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 16, height: 16, flexShrink: 0,
          cursor: hasChildren ? 'pointer' : 'default',
          color: 'var(--lyra-color-fg-default)',
        }}
      >
        {hasChildren && (
          expanded ? <ChevronDown size={14} /> : rtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />
        )}
      </span>
      <div
        onClick={rowClickSelect}
        style={{
          display: 'flex', alignItems: 'center', flex: 1, minWidth: 0,
          height: '100%', gap: 'var(--lyra-spacing-2)',
          cursor: rowClickSelect ? 'pointer' : 'default',
        }}
      >
        {selectionMode === 'multiple' && isSelectable && (
          <TreeCheckbox
            checked={checkState === 'checked'}
            indeterminate={checkState === 'indeterminate'}
            onChange={(shiftKey) => onToggleSelect(data, shiftKey)}
            ariaLabel={`Select ${label}`}
          />
        )}
        {showIcons && icon && (
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            width: 'var(--lyra-icon-size-sm)', height: 'var(--lyra-icon-size-sm)',
            color: selected ? selectedColor : 'var(--lyra-color-fg-default)',
          }}>
            {cloneElement(icon, { size: '100%' })}
          </span>
        )}
        {isRenaming ? (
          <input
            ref={renameInputRef}
            type="text"
            defaultValue={label}
            className="lyra-body-md"
            aria-label={`Rename ${label}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); onCommitRename(id, e.currentTarget.value); return; }
              if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); skipBlurCommitRef.current = true; onCancelRename(); return; }
              // Tab is deliberately NOT stopped here — it's left to bubble up
              // to the row's own onKeyDown, which already knows how to move
              // focus on to "the next focusable element" (the row's menu
              // button, else the search field). ag-grid's own Tab handling
              // calls preventDefault before any React handler ever runs
              // (a native, capture-phase listener), so the browser's native
              // Tab-driven focus movement is never actually available inside
              // this grid to begin with — every other Tab stop in this tree
              // is already reached this same explicit way.
              if (e.key !== 'Tab') e.stopPropagation();
            }}
            onBlur={(e) => {
              if (skipBlurCommitRef.current) return;
              onCommitRename(id, e.currentTarget.value);
            }}
            style={{
              flex: 1, minWidth: 0, boxSizing: 'border-box',
              height: 'var(--lyra-control-height-sm)',
              padding: '0 var(--lyra-spacing-2)',
              border: '1px solid var(--lyra-color-border-focus-default)',
              borderRadius: 'var(--lyra-radius-sm)',
              background: 'var(--lyra-color-bg-field)',
              color: 'var(--lyra-color-fg-default)',
              // Always shown, not just on :focus-visible — this input only
              // ever exists while actively being edited (it mounts already
              // focused), so there's no non-editing state for a ring to be
              // distinguished from.
              outline: '2px solid var(--lyra-color-border-focus-default)',
              outlineOffset: '-1px',
            }}
          />
        ) : (
          <span
            className={selected && selectionMode !== 'multiple' ? 'lyra-body-md-em' : 'lyra-body-md'}
            style={{
              color: selected ? selectedColor : 'var(--lyra-color-fg-default)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {highlightLabel(label, searchQuery)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TreeGrid({
  data                = [],
  selectionMode       = 'none',   // 'none' | 'single' | 'multiple'
  showIcons           = true,
  showInfoColumn      = true,
  hierarchyHeader     = 'Name',
  infoHeader          = 'Info',
  defaultExpandAll    = true,
  height              = 360,
  // When false, folders can't be picked — only leaves (e.g. "choose a file
  // to open") can; clicking a folder just expands/collapses it instead, and
  // in multi-select it also loses its checkbox. Ignored in selectionMode 'none'.
  selectableParent    = true,
  selectedIds:  controlledSelectedIds,
  onSelectionChange,
  // Optional third column — a per-row overflow menu trigger. Omit onMenuAction
  // (or leave showMenuColumn false) to skip the column entirely.
  showMenuColumn      = false,
  onMenuAction,
  // Adds a "contains" search field above the tree — matches highlight in the
  // label, and a match's ancestors stay visible (expanded) for context even
  // when they don't themselves match.
  showSearch          = false,
  searchPlaceholder   = 'Search',
  // Mirrors the tree's own layout (indent, chevrons, accent bar, search
  // field icons, menu alignment) and enables ag-grid's own RTL engine
  // (column order, native scroll direction) for right-to-left locales.
  rtl                 = false,
}) {
  const [searchInput, setSearchInput] = useState('');
  const searchQuery = searchInput.trim().toLowerCase();

  const [openMenu, setOpenMenu] = useState(null); // { rowId, top, right }
  // Read from the menu-button cellRenderer instead of `openMenu` directly, so
  // that closure doesn't need to change (and force ag-grid to recreate every
  // cell in the grid via columnDefs) just to show which row's button is
  // pressed — the existing scoped refresh below already re-invokes it for
  // exactly the affected row(s) whenever openMenu changes.
  const openMenuRef = useRef(openMenu);
  openMenuRef.current = openMenu;
  const closeMenu = useCallback(() => setOpenMenu(null), []);
  const handleMenuButtonClick = useCallback((e, rowId) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    // Both directions hang the menu from the button's own inline-end edge —
    // physically right in LTR, physically left in RTL — expressed as a
    // single logical `insetInlineEnd` the menu applies under its own `dir`,
    // rather than a left/right pair chosen at render time.
    const insetInlineEnd = rtl ? rect.left : window.innerWidth - rect.right;
    setOpenMenu({ rowId, top: rect.bottom + 4, insetInlineEnd, triggerEl: e.currentTarget });
  }, [rtl]);
  const [renamingId, setRenamingId] = useState(null);
  const [labelOverrides, setLabelOverrides] = useState({});
  const commitRename = useCallback((id, newLabel) => {
    const trimmed = newLabel.trim();
    if (trimmed) setLabelOverrides((prev) => ({ ...prev, [id]: trimmed }));
    setRenamingId(null);
  }, []);
  const cancelRename = useCallback(() => setRenamingId(null), []);

  const handleMenuAction = useCallback((action) => {
    const row = rowDataRef.current.find((r) => r.id === openMenu?.rowId);
    if (!row) return;
    if (action === 'rename') {
      setRenamingId(row.id);
    } else {
      onMenuAction?.(action, row);
    }
  }, [openMenu, onMenuAction]);

  const [expandedIds, setExpandedIds] = useState(() =>
    new Set(defaultExpandAll ? collectParentIds(data) : [])
  );
  const [internalSelectedIds, setInternalSelectedIds] = useState(() => new Set());
  const selectedIds = controlledSelectedIds ?? internalSelectedIds;

  const setSelection = useCallback((next) => {
    setInternalSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  }, [onSelectionChange]);

  // A multi-selection Set can hold several ids at once, which single-select
  // can't represent — dropping into single mode with more than one still
  // checked would leave an invalid, ambiguous selection state.
  const prevSelectionModeRef = useRef(selectionMode);
  useEffect(() => {
    if (prevSelectionModeRef.current === 'multiple' && selectionMode === 'single') {
      setSelection(new Set());
    }
    prevSelectionModeRef.current = selectionMode;
  }, [selectionMode, setSelection]);

  const toggleExpand = useCallback((id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Mirrors selectedIds so toggleSelect can stay referentially stable (only
  // changing when selectionMode itself does) instead of on every selection —
  // otherwise columnDefs, which depends on it, would rebuild every cell
  // renderer on every single click or keystroke.
  const selectedIdsRef = useRef(selectedIds);
  selectedIdsRef.current = selectedIds;

  // The last checkbox clicked without Shift — a subsequent Shift+click
  // extends the range from here, same as file-explorer bulk-select. Left
  // alone across Shift+clicks so the same anchor can keep extending or
  // shrinking the range; a plain click always resets it to that row.
  const selectionAnchorIdRef = useRef(null);

  const toggleSelect = useCallback((row, shiftKey) => {
    const currentSelectedIds = selectedIdsRef.current;
    if (selectionMode === 'single') {
      // No unselect — single mode always keeps exactly one row picked once
      // any row has been clicked; clicking the already-selected row is a no-op.
      if (!currentSelectedIds.has(row.id)) setSelection(new Set([row.id]));
      return;
    }
    const anchorId = selectionAnchorIdRef.current;
    if (shiftKey && anchorId != null && anchorId !== row.id) {
      const rd = rowDataRef.current;
      const anchorIndex = rd.findIndex(r => r.id === anchorId);
      const targetIndex = rd.findIndex(r => r.id === row.id);
      if (anchorIndex !== -1 && targetIndex !== -1) {
        const [start, end] = anchorIndex < targetIndex ? [anchorIndex, targetIndex] : [targetIndex, anchorIndex];
        const next = new Set(currentSelectedIds);
        // Checks every selectable row in the range — adding to whatever's
        // already checked outside it, rather than replacing the selection —
        // since these are independent checkboxes, not exclusive list items.
        for (let i = start; i <= end; i++) {
          const r = rd[i];
          if (!isRowSelectable(r, selectionMode, selectableParent)) continue;
          (r.hasChildren ? r.leafIds : [r.id]).forEach(leafId => next.add(leafId));
        }
        setSelection(next);
        return;
      }
    }
    selectionAnchorIdRef.current = row.id;
    const next = new Set(currentSelectedIds);
    if (row.hasChildren) {
      // A folder's checkbox always acts on its leaves, not itself — toggling
      // it to fully checked or fully unchecked (an indeterminate click completes).
      const setter = row.checkState === 'checked' ? 'delete' : 'add';
      row.leafIds.forEach(leafId => next[setter](leafId));
    } else {
      next.has(row.id) ? next.delete(row.id) : next.add(row.id);
    }
    setSelection(next);
  }, [selectionMode, selectableParent, setSelection]);

  // Roving tabindex: exactly one row is ever a real Tab stop. The tabindex
  // attribute itself is written directly to the DOM (see setFocused below)
  // rather than through React/rowData — keeping focus tracking decoupled
  // from the data-refresh cycle is what lets a focus move stay synchronous
  // (required for the browser to grant :focus-visible) without also fighting
  // the force-refresh that expand/select changes need (see below).
  const gridApiRef = useRef(null);
  const rowNodeRefs = useRef(new Map());
  const menuButtonRefs = useRef(new Map());
  // Tabbing out of the rename `<input>` into its row's menu button commits
  // the rename (blur) in the very same tick — which changes renamingId,
  // which changes columnDefs, which makes ag-grid recreate every cell in the
  // row (all columns, not just the label one) to match. That recreation
  // replaces the menu button DOM node with a fresh one *after* we already
  // called .focus() on the old one, dropping focus back to nowhere. This
  // records which row's button should hold focus so it can be reclaimed from
  // the new node once that redraw has actually happened.
  const pendingMenuFocusIdRef = useRef(null);
  const searchInputRef = useRef(null);
  // Browsers grant :focus-visible to a clicked text input just as readily as
  // a Tab-focused one (unlike buttons/divs), so telling mouse and keyboard
  // focus apart here needs its own tracking rather than that pseudo-class.
  const searchMouseDownRef = useRef(false);
  const [searchFocusVariant, setSearchFocusVariant] = useState(null); // 'mouse' | 'keyboard' | null
  const [focusedId, setFocusedId] = useState(null);
  const focusedIdRef = useRef(focusedId);

  // While searching, the tree shown is a pruned copy (matches + their
  // ancestors) with every remaining branch force-expanded — the user's own
  // expand/collapse state (expandedIds) is left untouched underneath, so
  // clearing the search returns to exactly how they'd left it.
  const searchedData = useMemo(
    () => searchQuery ? filterTree(data, searchQuery) : data,
    [data, searchQuery]
  );
  const effectiveExpandedIds = useMemo(
    () => searchQuery ? new Set(collectParentIds(searchedData)) : expandedIds,
    [searchQuery, searchedData, expandedIds]
  );

  const rowData = useMemo(() => {
    const flat = flatten(searchedData, effectiveExpandedIds, selectedIds, selectionMode, searchQuery);
    return Object.keys(labelOverrides).length
      ? flat.map((row) => (labelOverrides[row.id] !== undefined ? { ...row, label: labelOverrides[row.id] } : row))
      : flat;
  }, [searchedData, effectiveExpandedIds, selectedIds, selectionMode, searchQuery, labelOverrides]);
  const rowDataRef = useRef(rowData);
  rowDataRef.current = rowData;

  // ag-grid only auto-refreshes a cell when its colDef's own `field` value
  // changes — properties read from elsewhere on the row (expanded, checkState)
  // can go stale in the DOM otherwise, so every rowData change forces a full
  // re-render of the actual cell content to match. rowData no longer carries
  // focus state, so this never fires from a plain focus move — but expanding
  // or collapsing the focused row itself (no id change, so moveFocusTo isn't
  // called) can still recreate that row's DOM node here and silently drop
  // real focus, so it's explicitly restored — but only when a row actually
  // had focus a moment ago, so a mouse-only interaction never has this
  // unexpectedly yank keyboard focus into the tree.
  useEffect(() => {
    const focused = focusedIdRef.current;
    const hadRealFocus = focused != null
      && rowNodeRefs.current.get(focused) === document.activeElement;
    gridApiRef.current?.refreshCells({ force: true });
    if (hadRealFocus) {
      requestAnimationFrame(() => rowNodeRefs.current.get(focused)?.focus());
    }
  }, [rowData]);

  // The open-menu row's highlight (getRowStyle/rowClassRules) changes via
  // plain state, not rowData, so ag-grid needs to be told explicitly to
  // redraw it (same reasoning as the rowData effect above) — but scoped to
  // just the previous/next menu row, and explicitly skipping whichever row is
  // currently in rename mode. A force refresh destroys and recreates a cell's
  // DOM, and Rename closes the menu in the very same tick it starts editing
  // that row — a blanket, all-rows refresh here would tear down the rename
  // `<input>` right after it mounts and focuses, and its commit-on-blur
  // handler would read that as the user clicking away and cancel the rename.
  const prevMenuRowIdRef = useRef(null);
  useEffect(() => {
    const prevId = prevMenuRowIdRef.current;
    const nextId = openMenu?.rowId ?? null;
    prevMenuRowIdRef.current = nextId;
    const idsToRefresh = [prevId, nextId].filter((id) => id && id !== renamingId);
    if (!idsToRefresh.length) return;
    const rowNodes = idsToRefresh.map((id) => gridApiRef.current?.getRowNode(id)).filter(Boolean);
    if (rowNodes.length) gridApiRef.current?.refreshCells({ force: true, rowNodes });
  }, [openMenu, renamingId]);

  // Clears the pending-focus flag a moment after a Tab-out-of-rename commit
  // (see pendingMenuFocusIdRef above and the menu button's own ref callback,
  // which does the actual focusing). ag-grid tears down and recreates that
  // button's cell across several redraw passes reacting to the very same
  // renamingId change, each one blurring whatever the previous pass focused
  // — the button's ref callback re-claims focus on every one of its own
  // (re)mounts while this flag is still set, which is more reliable than
  // guessing how many passes/frames those redraws take.
  useEffect(() => {
    if (pendingMenuFocusIdRef.current == null) return;
    const timer = setTimeout(() => { pendingMenuFocusIdRef.current = null; }, 300);
    return () => clearTimeout(timer);
  }, [renamingId]);

  // Flips tabindex="-1"/"0" directly on the DOM nodes — synchronous, and
  // independent of whether React/ag-grid ever re-renders that cell again.
  const setFocused = useCallback((id) => {
    const prev = focusedIdRef.current;
    if (prev === id) return;
    if (prev != null) rowNodeRefs.current.get(prev)?.setAttribute('tabindex', '-1');
    if (id != null) rowNodeRefs.current.get(id)?.setAttribute('tabindex', '0');
    focusedIdRef.current = id;
    setFocusedId(id);
  }, []);

  // Keep a roving tab stop assigned even before the user has interacted, so
  // Tabbing into the grid from outside lands somewhere instead of nowhere.
  useEffect(() => {
    if (rowData.length === 0) { setFocused(null); return; }
    if (!rowData.some(r => r.id === focusedIdRef.current)) setFocused(rowData[0].id);
  }, [rowData, setFocused]);

  const focusRowById = useCallback((id) => {
    // Adjacent-row moves (the overwhelming majority — Up/Down/Left/Right) land
    // on a row ag-grid already has mounted, since virtualization renders a
    // buffer beyond the viewport. Focusing it synchronously, in the same tick
    // as the keydown that triggered the move, is what lets the browser treat
    // it as keyboard-driven and actually show :focus-visible's ring — an
    // async (rAF-deferred) focus() call loses that keyboard-modality signal
    // even though the DOM focus itself still moves correctly.
    const immediate = rowNodeRefs.current.get(id);
    if (immediate) { immediate.focus(); return; }
    // Fallback for a row currently scrolled out of the virtualized window —
    // it doesn't exist in the DOM yet, so it has to be scrolled into view
    // and mounted before it can receive focus at all.
    const index = rowDataRef.current.findIndex(r => r.id === id);
    if (index === -1) return;
    gridApiRef.current?.ensureIndexVisible(index);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      rowNodeRefs.current.get(id)?.focus();
    }));
  }, []);

  // Also used as the row's onFocus handler (mouse clicks, not just arrow-key
  // moves), so a plain click keeps the roving tabindex bookkeeping in sync too.
  const moveFocusTo = useCallback((id) => {
    setFocused(id);
    focusRowById(id);
  }, [setFocused, focusRowById]);

  // ag-grid manages focus for its own header/body cells programmatically —
  // even with tabindex="-1" set directly on the header cell, ag-grid still
  // moves real focus there itself on Tab, ignoring the DOM attribute
  // entirely. Native Tab traversal out of the search field can't be trusted
  // to land where we want, so it's replaced outright: focus the current
  // roving-tabindex row directly ourselves.
  const handleSearchKeyDown = useCallback((e) => {
    if (e.key !== 'Tab' || e.shiftKey) return;
    // Always the first row, regardless of whatever row the roving tabindex
    // was last left on — Tab-ing in from the search field should behave
    // like landing at the top of a freshly (re)filtered list.
    const first = rowDataRef.current[0];
    if (!first) return;
    e.preventDefault();
    moveFocusTo(first.id);
  }, [moveFocusTo]);

  // The menu button is a plain native <button> outside the tree's own
  // roving-tabindex scheme, so it needs its own explicit handling to stay
  // navigable rather than becoming a dead end once Tab lands on it.
  const handleMenuButtonKeyDown = useCallback((e, rowId) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        e.preventDefault();
        rowNodeRefs.current.get(rowId)?.focus();
      } else if (showSearch && searchInputRef.current) {
        // Last stop in the tree — loop back to the search field instead of
        // exiting to whatever's next on the page.
        e.preventDefault();
        searchInputRef.current.focus();
      }
      return;
    }
    const rd = rowDataRef.current;
    const index = rd.findIndex(r => r.id === rowId);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = rd[index + 1];
      if (next) moveFocusTo(next.id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = rd[index - 1];
      if (prev) moveFocusTo(prev.id);
    }
  }, [moveFocusTo, showSearch]);

  // Behaves like a plain list box: PageUp/PageDown jump by roughly a
  // viewport's worth of rows rather than one at a time.
  const pageStep = Math.max(1, Math.floor(height / ROW_HEIGHT_PX));

  const handleRowKeyDown = useCallback((e, row) => {
    const rd = rowDataRef.current;
    const index = rd.findIndex(r => r.id === row.id);
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault(); e.stopPropagation();
        const next = rd[index + 1];
        // At the last row already — reclaim focus explicitly rather than
        // leaving it to whatever ag-grid's own (suppressed but still
        // present) keyboard handling might otherwise do with the event.
        if (next) moveFocusTo(next.id); else rowNodeRefs.current.get(row.id)?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault(); e.stopPropagation();
        const prev = rd[index - 1];
        if (prev) moveFocusTo(prev.id); else rowNodeRefs.current.get(row.id)?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault(); e.stopPropagation();
        if (rd[0]) moveFocusTo(rd[0].id);
        break;
      }
      case 'End': {
        e.preventDefault(); e.stopPropagation();
        const last = rd[rd.length - 1];
        if (last) moveFocusTo(last.id);
        break;
      }
      case 'PageUp': {
        e.preventDefault(); e.stopPropagation();
        // Matches a plain list box: jump by roughly a viewport's worth of
        // rows rather than one at a time, clamped to the first row.
        const target = rd[Math.max(0, index - pageStep)];
        if (target) moveFocusTo(target.id);
        break;
      }
      case 'PageDown': {
        e.preventDefault(); e.stopPropagation();
        const target = rd[Math.min(rd.length - 1, index + pageStep)];
        if (target) moveFocusTo(target.id);
        break;
      }
      case 'ArrowRight': {
        if (!row.hasChildren) break;
        e.preventDefault(); e.stopPropagation();
        if (!row.expanded) {
          toggleExpand(row.id);
        } else {
          const child = rd[index + 1];
          if (child) moveFocusTo(child.id);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault(); e.stopPropagation();
        if (row.hasChildren && row.expanded) {
          toggleExpand(row.id);
        } else if (row.parentId != null) {
          moveFocusTo(row.parentId);
        }
        break;
      }
      case ' ':
      case 'Spacebar': {
        e.preventDefault(); e.stopPropagation();
        if (isRowSelectable(row, selectionMode, selectableParent)) toggleSelect(row);
        break;
      }
      case 'Tab': {
        if (e.shiftKey) {
          // Native order can't be trusted here either — same hidden
          // ag-grid header cell that intercepts forward Tab from the
          // search field also intercepts Shift+Tab going the other way.
          if (showSearch && searchInputRef.current) {
            e.preventDefault();
            searchInputRef.current.focus();
          }
          break;
        }
        // Redirect into this row's own menu button rather than letting Tab
        // fall through to native DOM order (which would exit the grid) —
        // or, with no menu column to go to, loop straight back to search.
        if (showMenuColumn) {
          const btn = menuButtonRefs.current.get(row.id);
          if (btn) {
            e.preventDefault();
            // Leaving the rename `<input>` (if any) commits it via blur,
            // which can force ag-grid to recreate this row's cells — see
            // pendingMenuFocusIdRef above for why focus needs reclaiming.
            pendingMenuFocusIdRef.current = row.id;
            btn.focus();
          }
        } else if (showSearch && searchInputRef.current) {
          e.preventDefault();
          searchInputRef.current.focus();
        }
        break;
      }
      default:
        break;
    }
  }, [moveFocusTo, toggleExpand, toggleSelect, selectionMode, selectableParent, showMenuColumn, showSearch, pageStep]);

  const makeRowRef = useCallback((id) => (el) => {
    if (el) rowNodeRefs.current.set(id, el);
    else rowNodeRefs.current.delete(id);
  }, []);

  const columnDefs = useMemo(() => {
    const cols = [{
      headerName: hierarchyHeader,
      field: 'label',
      flex: 1,
      minWidth: 200,
      // Zeroed so the cell renderer's own accent bar sits flush against the
      // row's true edge, matching DashboardList's active-item indicator.
      // `direction` here is what makes the logical `paddingInlineStart` (and
      // everything logical inside HierarchyCell's own `direction: rtl`) work
      // out to the correct physical side.
      cellStyle: { direction: rtl ? 'rtl' : 'ltr', paddingInlineStart: 0 },
      cellRenderer: (params) => (
        <HierarchyCell
          data={params.data}
          selectionMode={selectionMode}
          showIcons={showIcons}
          selectableParent={selectableParent}
          onToggleExpand={toggleExpand}
          onToggleSelect={toggleSelect}
          onRowFocus={moveFocusTo}
          onRowKeyDown={handleRowKeyDown}
          rowRef={makeRowRef(params.data.id)}
          initialTabIndex={focusedIdRef.current === params.data.id ? 0 : -1}
          isRenaming={renamingId === params.data.id}
          onCommitRename={commitRename}
          onCancelRename={cancelRename}
          rtl={rtl}
        />
      ),
    }];
    if (showInfoColumn) {
      cols.push({
        colId: 'info',
        headerName: infoHeader,
        field: 'info',
        cellClass: 'lyra-body-md',
        // ag-grid's default cell padding reserves space on both sides, but the
        // text hugs the far edge from the hierarchy column — the near side is
        // always empty, so it's zeroed. `justifyContent: flex-end` and
        // `paddingInlineStart` are both logical — setting `direction` here is
        // the only thing that needs to change between LTR and RTL.
        cellStyle: {
          direction: rtl ? 'rtl' : 'ltr',
          color: 'var(--lyra-color-fg-secondary)', display: 'flex', alignItems: 'center',
          justifyContent: 'flex-end', paddingInlineStart: 0,
        },
      });
    }
    if (showMenuColumn) {
      cols.push({
        colId: 'menu',
        headerName: '',
        width: 32, // 2rem, fixed
        minWidth: 32,
        maxWidth: 32,
        resizable: false,
        sortable: false,
        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
        cellRenderer: (params) => {
          const isMenuOpen = openMenuRef.current?.rowId === params.data.id;
          return (
          <span
            className={`lyra-tree-grid__menu-btn${isMenuOpen ? ' lyra-tree-grid__menu-btn--open' : ''}`}
            ref={(el) => {
              const id = params.data.id;
              if (el) {
                const btn = el.querySelector('button');
                menuButtonRefs.current.set(id, btn);
                // ag-grid tears down and recreates this cell's DOM across
                // several passes after a Tab-out-of-rename commit (its own
                // redraw reacting to the same renamingId change that
                // triggered this), each one blurring whatever the previous
                // pass focused — so the button re-claims focus on every one
                // of its own (re)mounts while a reclaim is pending, rather
                // than guessing how many passes/frames to wait out.
                if (pendingMenuFocusIdRef.current === id) btn?.focus();
              } else {
                menuButtonRefs.current.delete(id);
              }
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              forcePressed={isMenuOpen}
              aria-label={`More actions for ${params.data.label}`}
              onClick={(e) => { handleMenuButtonClick(e, params.data.id); }}
              onKeyDown={(e) => handleMenuButtonKeyDown(e, params.data.id)}
            >
              <EllipsisVertical />
            </Button>
          </span>
          );
        },
      });
    }
    return cols;
  }, [hierarchyHeader, infoHeader, selectionMode, showIcons, showInfoColumn, selectableParent, showMenuColumn, handleMenuButtonClick, toggleExpand, toggleSelect, moveFocusTo, handleRowKeyDown, handleMenuButtonKeyDown, makeRowRef, renamingId, commitRename, cancelRename, rtl]);

  // Multi-select's checkbox + active text already convey selection, so the row
  // highlight is reserved for single-select (where nothing else marks the pick).
  // Rounded in every state (default, hover, selected) — not just when selected —
  // so hover/selected backgrounds inherit the same corner radius automatically.
  const getRowStyle = useCallback((params) => ({
    borderRadius: 'var(--lyra-radius-md)',
    ...((params.data.selected && selectionMode !== 'multiple') || params.data.id === openMenu?.rowId
      ? { background: 'var(--lyra-color-bg-active-subtle)' }
      : null),
  }), [selectionMode, openMenu]);

  // ag-grid's hover overlay is a single global color (rowHoverColor in the
  // theme) — marking selected rows with their own class lets treeGrid.css
  // swap in the token made for this exact combination (state-bg-hover-active-subtle)
  // instead of the generic hover tint, which is nearly invisible layered on
  // top of the already-light bg-active-subtle background. This has to be
  // rowClassRules, not the imperative getRowClass — the latter is only
  // evaluated once at row creation, so a class it applied would never clear
  // again on deselection (rowClassRules re-checks its predicate on refresh).
  const rowClassRules = useMemo(() => ({
    'lyra-row-selected': (params) =>
      (params.data.selected && selectionMode !== 'multiple') || params.data.id === openMenu?.rowId,
  }), [selectionMode, openMenu]);

  // The info column has no flex — it's sized to its longest visible value instead
  // of sharing space with the hierarchy column, so it's re-measured after every
  // render that can change which rows (and thus which info text) are on screen.
  const autoSizeInfoColumn = useCallback((params) => {
    if (showInfoColumn) params.api.autoSizeColumns(['info'], false);
  }, [showInfoColumn]);

  // headerHeight: 0 collapses the header row visually, but ag-grid still
  // renders its cells as real (tabbable) DOM elements — without this, Tab
  // from outside the grid lands on an invisible header cell instead of the
  // roving-tabindex row, breaking (or "stalling") keyboard navigation into
  // the tree entirely.
  const gridWrapperRef = useRef(null);
  const disableHeaderTabbing = useCallback(() => {
    gridWrapperRef.current?.querySelectorAll('.ag-header-cell, .ag-header-cell *[tabindex]')
      .forEach(el => el.setAttribute('tabindex', '-1'));
  }, []);

  const handleGridReady = useCallback((params) => {
    gridApiRef.current = params.api;
    autoSizeInfoColumn(params);
    disableHeaderTabbing();
  }, [autoSizeInfoColumn, disableHeaderTabbing]);

  // Column defs changing (e.g. toggling showMenuColumn) recreates the header
  // cells, so the ones just added need this reapplied too.
  useEffect(() => {
    disableHeaderTabbing();
  }, [columnDefs, disableHeaderTabbing]);

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-2)', width: '100%', maxWidth: '720px' }}>
      {showSearch && (
        // `dir` on the outer wrapper already set `direction` for everything
        // in this subtree — insetInlineStart/End and paddingInline* below
        // resolve to the correct physical side from that alone.
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Search size={16} style={{
            position: 'absolute', insetInlineStart: 'var(--lyra-spacing-3)', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--lyra-color-fg-secondary)', pointerEvents: 'none',
          }} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onMouseDown={() => { searchMouseDownRef.current = true; }}
            onFocus={() => {
              setSearchFocusVariant(searchMouseDownRef.current ? 'mouse' : 'keyboard');
              searchMouseDownRef.current = false;
            }}
            onBlur={() => setSearchFocusVariant(null)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="lyra-tree-grid__search lyra-body-md"
            style={{
              width: '100%', boxSizing: 'border-box', height: 'var(--lyra-control-height-md)',
              paddingInlineStart: 'calc(var(--lyra-spacing-3) + 20px)',
              paddingInlineEnd: 'var(--lyra-spacing-8)',
              borderRadius: 'var(--lyra-radius-md)',
              border: `1px solid ${
                searchFocusVariant === 'mouse' ? 'var(--lyra-color-border-active)'
                  : searchFocusVariant === 'keyboard' ? 'var(--lyra-color-border-focus-default)'
                  : 'var(--lyra-color-border-soft)'
              }`,
              outline: searchFocusVariant === 'keyboard' ? '2px solid var(--lyra-color-border-focus-default)' : 'none',
              outlineOffset: '-1px',
              background: 'var(--lyra-color-bg-field)', color: 'var(--lyra-color-fg-default)',
            }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              aria-label="Clear search"
              style={{
                position: 'absolute', insetInlineEnd: 'var(--lyra-spacing-2)', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20,
                border: 'none', borderRadius: 'var(--lyra-radius-xs)', background: 'transparent',
                color: 'var(--lyra-color-fg-secondary)', cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
      <div
        ref={gridWrapperRef}
        className={`lyra-tree-grid${selectionMode === 'none' ? ' lyra-tree-grid--no-selection' : ''}`}
        role="tree"
        aria-multiselectable={selectionMode === 'multiple' || undefined}
        style={{ height, width: '100%' }}
      >
        <AgGridReact
          // enableRtl is only read once, at grid creation — ag-grid never
          // applies a later change to an already-mounted grid, so the key
          // forces a full remount (and re-init with the new value) whenever
          // it flips, rather than silently no-opping.
          key={rtl ? 'rtl' : 'ltr'}
          theme={treeGridTheme}
          enableRtl={rtl}
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={(p) => String(p.data.id)}
          getRowStyle={getRowStyle}
          rowClassRules={rowClassRules}
          suppressCellFocus
          // ag-grid manages Tab internally (header cell, then body cells) as
          // part of its own keyboard nav, independent of DOM tabindex — that
          // silently wins over our roving-tabindex scheme unless it's told to
          // leave Tab alone entirely and let the browser (and our own
          // handlers) decide where focus goes.
          suppressHeaderKeyboardEvent={(p) => p.event.key === 'Tab'}
          suppressKeyboardEvent={(p) => p.event.key === 'Tab'}
          animateRows={false}
          onGridReady={handleGridReady}
          onFirstDataRendered={disableHeaderTabbing}
          onRowDataUpdated={autoSizeInfoColumn}
        />
      </div>
      {openMenu && (
        <RowActionMenu
          top={openMenu.top}
          insetInlineEnd={openMenu.insetInlineEnd}
          triggerEl={openMenu.triggerEl}
          rtl={rtl}
          onAction={handleMenuAction}
          onClose={closeMenu}
        />
      )}
    </div>
  );
}

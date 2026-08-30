import { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import Button from './Button';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=17643-51520
// Behavior modeled on Base UI's Toolbar: https://base-ui.com/react/components/toolbar
//   Root      — container, owns roving-tabindex + arrow-key navigation + orientation
//   Group     — groups related items visually (doesn't affect focus behavior)
//   Button    — an action item (wraps this project's own Button)
//   Link      — a link item
//   Separator — a visual divider, orientation defaults to perpendicular to the toolbar

const ToolbarContext = createContext({ orientation: 'horizontal', disabled: false });

function getItems(root) {
  return Array.from(root.querySelectorAll('[data-toolbar-item="true"]')).filter(
    (el) => el.getAttribute('data-disabled') !== 'true'
  );
}

// Roving tabindex: exactly one item is a Tab stop at a time (tabIndex 0); arrow keys
// move focus — and which item is the Tab stop — between the others (WAI-ARIA toolbar
// pattern, same as Base UI's Root). Assigned imperatively via DOM query rather than
// React state so adding/removing items never requires the whole toolbar to re-render.
function useRovingTabIndex(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = getItems(root);
    if (items.length > 0 && !items.some((el) => el.tabIndex === 0)) {
      items.forEach((el, i) => { el.tabIndex = i === 0 ? 0 : -1; });
    }
  });

  return useCallback((e) => {
    const root = rootRef.current;
    if (!root) return;
    getItems(root).forEach((el) => { el.tabIndex = el === e.target ? 0 : -1; });
  }, [rootRef]);
}

function Root({
  // 'horizontal' | 'vertical' — also flips which arrow keys move focus.
  orientation = 'horizontal',
  // Wraps focus to the opposite end once the boundary item is passed.
  loopFocus = true,
  disabled = false,
  // true = tinted toolbar (bg-control-subtle), matching the Figma "with background"
  // variant. false = transparent, toolbar reads as flush with its surroundings.
  withBackground = true,
  // Figma's named slots — the common case. leftSlot is for text (a title, an item
  // counter, etc.) and grows to fill remaining space; rightSlot is for form controls
  // (buttons, dropdowns, toggle groups) and stays right-aligned at its natural width.
  leftSlot,
  rightSlot,
  // Escape hatch for composing raw Toolbar.Group/Button/Separator children instead
  // of the title+actions layout, matching Base UI's own free-form Root composition.
  children,
}) {
  const rootRef = useRef(null);
  const handleFocusIn = useRovingTabIndex(rootRef);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    const root = rootRef.current;
    if (!root) return;
    const items = getItems(root);
    if (items.length === 0) return;
    const currentIndex = items.indexOf(document.activeElement);
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    const move = (delta) => {
      let next = currentIndex === -1 ? 0 : currentIndex + delta;
      next = loopFocus ? (next + items.length) % items.length : Math.max(0, Math.min(items.length - 1, next));
      items[next]?.focus();
    };

    if (e.key === nextKey) { e.preventDefault(); move(1); }
    else if (e.key === prevKey) { e.preventDefault(); move(-1); }
    else if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); items[items.length - 1]?.focus(); }
  }, [disabled, orientation, loopFocus]);

  return (
    <ToolbarContext.Provider value={{ orientation, disabled }}>
      <div
        ref={rootRef}
        role="toolbar"
        aria-orientation={orientation}
        aria-disabled={disabled || undefined}
        data-orientation={orientation}
        data-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        onFocus={handleFocusIn}
        style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
          gap: 'var(--lyra-spacing-6)',
          height: orientation === 'horizontal' ? 'var(--lyra-row-height-2xl)' : undefined,
          padding: 'var(--lyra-spacing-3) var(--lyra-spacing-4)',
          borderBottom: '1px solid var(--lyra-color-border-subtle)',
          background: withBackground ? 'var(--lyra-color-bg-control-subtle)' : 'var(--lyra-color-bg-none)',
          boxSizing: 'border-box',
          width: '100%',
          overflow: 'clip',
        }}
      >
        {children ?? (
          <>
            <div style={{ display: 'flex', flex: '1 0 0', gap: 'var(--lyra-spacing-4)', height: '100%', alignItems: 'center', minWidth: 0 }}>
              {leftSlot ?? (
                <span className="lyra-body-md-em" style={{
                  flex: '1 0 0', minWidth: 0, color: 'var(--lyra-color-fg-default)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  Title
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
              {rightSlot ?? <ToolbarButton>Button</ToolbarButton>}
            </div>
          </>
        )}
      </div>
    </ToolbarContext.Provider>
  );
}

function ToolbarGroup({ disabled = false, children, style }) {
  const ctx = useContext(ToolbarContext);
  return (
    <div
      role="group"
      data-orientation={ctx.orientation}
      data-disabled={disabled || undefined}
      style={{ display: 'flex', flexDirection: ctx.orientation === 'horizontal' ? 'row' : 'column', alignItems: 'center', gap: 'var(--lyra-spacing-2)', ...style }}
    >
      {children}
    </div>
  );
}

function ToolbarButton({
  disabled = false,
  // Base UI keeps a disabled item reachable by keyboard by default — this project's
  // Button ties its visual disabled state to the native `disabled` attribute, which
  // also removes it from the tab order, so that exact behavior isn't reproduced here;
  // the prop is accepted for API parity and documented rather than silently dropped.
  focusableWhenDisabled = true,
  children,
  ...rest
}) {
  const ctx = useContext(ToolbarContext);
  const isDisabled = disabled || ctx.disabled;
  return (
    <Button
      {...rest}
      disabled={isDisabled}
      data-toolbar-item="true"
      data-disabled={isDisabled || undefined}
      data-orientation={ctx.orientation}
      data-focusable={focusableWhenDisabled || undefined}
      tabIndex={-1}
    >
      {children}
    </Button>
  );
}

function ToolbarLink({ disabled = false, children, style, ...rest }) {
  const ctx = useContext(ToolbarContext);
  const isDisabled = disabled || ctx.disabled;
  return (
    <a
      {...rest}
      aria-disabled={isDisabled || undefined}
      data-toolbar-item="true"
      data-disabled={isDisabled || undefined}
      data-orientation={ctx.orientation}
      tabIndex={-1}
      className="lyra-body-md"
      style={{
        color: isDisabled ? 'var(--lyra-color-fg-disabled)' : 'var(--lyra-color-fg-action)',
        pointerEvents: isDisabled ? 'none' : undefined,
        textDecoration: 'none',
        ...style,
      }}
    >
      {children}
    </a>
  );
}

function ToolbarSeparator({ orientation }) {
  const ctx = useContext(ToolbarContext);
  // Perpendicular to the toolbar by default, same as Base UI.
  const sepOrientation = orientation ?? (ctx.orientation === 'horizontal' ? 'vertical' : 'horizontal');
  return (
    <div
      role="separator"
      aria-orientation={sepOrientation}
      data-orientation={sepOrientation}
      style={sepOrientation === 'vertical'
        ? { width: 1, alignSelf: 'stretch', flexShrink: 0, background: 'var(--lyra-color-border-subtle)' }
        : { height: 1, width: '100%', flexShrink: 0, background: 'var(--lyra-color-border-subtle)' }}
    />
  );
}

Root.Group = ToolbarGroup;
Root.Button = ToolbarButton;
Root.Link = ToolbarLink;
Root.Separator = ToolbarSeparator;

export default Root;

// Figma node: 17643:45205  "Page Header"
import { useState, useLayoutEffect, useEffect, useRef, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Menu, PanelLeftOpen, EllipsisVertical } from 'lucide-react';
import '../styles/typography.css';
import '../styles/breadcrumb.css';
import Button from './Button';
import Tooltip from './Tooltip';
import TitleBreadcrumb from './TitleBreadcrumb';

// Dropdown shown in place of the header actions (e.g. Secondary/Primary) once they no
// longer fit their own row — anchored under the trigger button, closes on an outside
// click, Escape, or window resize (same pattern as TreeGrid's RowActionMenu).
function HeaderActionsMenu({ triggerEl, onClose, children }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !triggerEl?.contains(e.target)) onClose();
    };
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    // The menu's position is computed once, from the trigger's rect, at the moment it
    // opens — it doesn't track the button across a resize, so closing (rather than
    // re-anchoring) matches how every native menu/select handles this.
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

  if (!triggerEl) return null;
  const rect = triggerEl.getBoundingClientRect();

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      // Closes after any action inside is clicked — bubbling means the action's own
      // onClick already ran by the time this fires, same as TreeGrid's row menu.
      onClick={onClose}
      style={{
        position: 'fixed',
        top: rect.bottom + 4,
        // Left-aligned to the trigger, not right-aligned — the trigger sits at the
        // left edge of its row (header-actions precedes the AI section), so a wider
        // menu should grow rightward from there instead of backing leftward over it.
        insetInlineStart: rect.left,
        display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-2)',
        width: 'max-content', minWidth: rect.width,
        background: 'var(--lyra-color-bg-surface-overlay)',
        border: '1px solid var(--lyra-color-border-subtle)',
        borderRadius: 'var(--lyra-radius-md)',
        boxShadow: 'var(--lyra-shadow-md)',
        padding: 'var(--lyra-spacing-2)',
        zIndex: 1000,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

// spacing-8=32 (h-padding each side), col-gap=40, spacing-3=12, spacing-2=8
const H_PAD  = 64; // 2 × spacing-8
const COL_GAP = 40;
const GAP3   = 12; // sidenav → TitleBreadcrumb
const GAP2   = 8;
const MENU_W = 32; // ··· button — minimum breadcrumb width
const DIVIDER_W = 1; // vertical rule between the sidenav trigger and the title/breadcrumb
const GAP4   = 16; // divider → title/breadcrumb
// Extra width required (beyond the bare minimum) before the header actions un-wrap back
// onto the breadcrumb row. Without this, un-wrapping happens the instant avail1Row clears
// minTbW, which is only enough for an ellipsis-only breadcrumb — the actions steal the row
// back and the breadcrumb collapses hard right as the window grows. The buffer holds the
// wrapped (own-row) layout a bit longer so growth feels continuous instead of regressing.
const UNWRAP_BUFFER = 140;

export default function PageHeader({
  title                  = 'Page Title',
  levels                 = [],
  showSideNavTrigger     = true,
  sidenavTriggerIcon     = 'panel-left-open', // 'menu' | 'panel-left-open'
  showBreadcrumb         = true,
  showStatusBadge        = false,
  statusBadgeLabel       = 'Active',
  showAiTrigger          = true,
  onAiTriggerClick,
  aiPanelOpen            = false,
  headerLayout           = 'default', // 'default' | 'v3' (stacked breadcrumb above title)
  onSidenavTriggerClick,
  onSidenavTriggerMouseEnter,
  onSidenavTriggerMouseLeave,
  _sidebarOpen           = false,
  _sidebarTransitioning  = false,
  headerActionsSlot,
  breadcrumbSlot,
  // Renders a row of tabs directly under the header (Figma node 33023:136798)
  // — pass a <Tabs variant="flush" .../>. Shifts the header's own bottom
  // padding tighter and moves the separating border down to sit under the
  // tabs row instead of under the title/actions row.
  tabsSlot,
}) {
  const headerRef        = useRef(null);
  const rightRef         = useRef(null);   // inner right div — natural button width
  const sidenavRef       = useRef(null);
  const titleMeasureRef  = useRef(null);   // hidden span — measures title text width
  const tbWrapperRef     = useRef(null);   // direct DOM ref — width set imperatively to avoid async React lag
  const actionsMeasureRef = useRef(null);  // hidden clone of header-actions — natural width even while collapsed
  const aiSectionRef      = useRef(null);  // divider + AI button — never collapses, but still counts against row width
  const actionsTriggerRef = useRef(null);  // the "more actions" icon button, once collapsed

  const [tbBcAvailWidth, setTbBcAvailWidth] = useState(null); // passed to TitleBreadcrumb to skip its own ResizeObserver
  const [sidenavHovered, setSidenavHovered] = useState(false);
  const [wrapButtons, setWrapButtons] = useState(false);
  const wrapButtonsRef          = useRef(false); // mirrors wrapButtons, always current (avoids stale closure)
  const [actionsCollapsed, setActionsCollapsed] = useState(false);
  const actionsCollapsedRef     = useRef(false); // mirrors actionsCollapsed, always current (avoids stale closure)
  const [actionsMenuOpen, setActionsMenuOpen]   = useState(false);
  const computeRef              = useRef(null);  // called after wrap commits to update tbWidth imperatively
  const sidebarTransitioningRef = useRef(false); // mirrors _sidebarTransitioning, always current
  sidebarTransitioningRef.current = _sidebarTransitioning;

  // The breadcrumb always shows the page's full ancestor trail — the sidenav-open trigger
  // is a separate control, not a stand-in for level 0, so its visibility no longer changes
  // which levels are displayed. This keeps the breadcrumb's behavior identical across every
  // page regardless of whether that page happens to have a sidebar.
  const displayedLevels = showBreadcrumb ? levels : [];
  const showSidenavTrigger = showSideNavTrigger && !_sidebarOpen;
  // Width the trigger button, its divider, and their gaps to neighbors claim from
  // header-left, so the breadcrumb/title sizing math below accounts for it instead of
  // overflowing by that amount.
  const sidenavTriggerW = showSidenavTrigger ? MENU_W + GAP3 + DIVIDER_W + GAP4 : 0;

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const compute = () => {
      const rightEl = rightRef.current;
      const titleEl = titleMeasureRef.current;
      if (!rightEl || !titleEl) return;

      const headerW  = header.getBoundingClientRect().width;
      const rightW   = rightEl.getBoundingClientRect().width;
      const titleW   = titleEl.getBoundingClientRect().width;

      const n = displayedLevels.length;
      const isV3 = headerLayout === 'v3';

      // V3: breadcrumb is stacked above title — minimum width is title+badge only.
      // Default: title+badge + (if levels: gap + ··· button) since both share one row.
      const minTbW = isV3
        ? titleW
        : titleW + (n > 0 ? GAP2 + MENU_W : 0);

      // Space available for TitleBreadcrumb when right stays on the same row
      const avail1Row = headerW - H_PAD - rightW - COL_GAP - sidenavTriggerW;

      // Hysteresis: wrap as soon as it's tight, but require extra headroom before
      // un-wrapping so the breadcrumb doesn't collapse to bare minimum right at the crossover.
      const shouldWrap = wrapButtonsRef.current
        ? avail1Row < minTbW + UNWRAP_BUFFER
        : avail1Row < minTbW;

      const isWrapped = wrapButtonsRef.current && shouldWrap;
      const tbAvail = isWrapped
        ? headerW - H_PAD - sidenavTriggerW
        : avail1Row;

      // Set wrapper width directly on the DOM element — synchronous, fires before paint.
      // Using React state here would defer by one frame, letting CSS flex see a transiently
      // wrong width and wrap the buttons before any state change occurs.
      if (tbWrapperRef.current) {
        tbWrapperRef.current.style.width = Math.max(0, tbAvail) + 'px';
      }

      // V3: breadcrumb gets the full wrapper width (it's on its own row above the title).
      // Default: subtract the title+badge and gap since they share the row.
      const bcAvailW = isV3
        ? Math.max(0, tbAvail)
        : Math.max(0, tbAvail - titleW - (n > 0 ? GAP2 : 0));
      setTbBcAvailWidth(bcAvailW);

      // Actions-collapse: whether header-actions (e.g. Secondary/Primary) still fit
      // next to the AI section, once header-right has a full row to itself. On a
      // shared row with the title, avail1Row's own formula above already proved
      // there was enough space for both minTbW *and* the full natural rightW, so
      // actions always fit there by construction — this only matters once wrapped.
      const actionsEl = actionsMeasureRef.current;
      if (isWrapped && actionsEl) {
        const actionsW = actionsEl.getBoundingClientRect().width;
        const aiW = aiSectionRef.current?.getBoundingClientRect().width ?? 0;
        const gapW = (actionsW > 0 && aiW > 0) ? GAP2 : 0;
        const availableRightRowW = headerW - H_PAD;
        const ACTIONS_COLLAPSE_BUFFER = 24; // hysteresis, same spirit as UNWRAP_BUFFER above
        const shouldCollapseActions = actionsCollapsedRef.current
          ? (actionsW + gapW + aiW + ACTIONS_COLLAPSE_BUFFER) > availableRightRowW
          : (actionsW + gapW + aiW) > availableRightRowW;
        if (shouldCollapseActions !== actionsCollapsedRef.current) {
          actionsCollapsedRef.current = shouldCollapseActions;
          setActionsCollapsed(shouldCollapseActions);
          if (!shouldCollapseActions) setActionsMenuOpen(false); // trigger's about to unmount
        }
      } else if (actionsCollapsedRef.current) {
        actionsCollapsedRef.current = false;
        setActionsCollapsed(false);
        setActionsMenuOpen(false);
      }

      if (shouldWrap) {
        // Only commit the wrap when the sidebar is NOT mid-transition.
        // During the 300ms padding-left ease, shouldWrap may be transiently true
        // at intermediate header widths — suppressing it here prevents the stutter.
        // Outside a transition (window resize, stable layout), wrap commits immediately.
        if (!wrapButtonsRef.current && !sidebarTransitioningRef.current) {
          wrapButtonsRef.current = true;
          setWrapButtons(true);
          computeRef.current?.(); // re-run so tbWrapperRef gets the wider wrapped width
        }
      } else if (!sidebarTransitioningRef.current) {
        wrapButtonsRef.current = false;
        setWrapButtons(false);
      }
    };
    computeRef.current = compute;

    const ro = new ResizeObserver(compute);
    ro.observe(header);
    compute();
    return () => ro.disconnect();
  }, [levels, showBreadcrumb, title, showStatusBadge, statusBadgeLabel, headerLayout, displayedLevels, sidenavTriggerW]);

  // When the sidebar transition ends, re-run compute so any pending wrap commits immediately
  useEffect(() => {
    if (!_sidebarTransitioning) computeRef.current?.();
  }, [_sidebarTransitioning]);

  return (
    <>
    <div ref={headerRef} className="main-header" style={{
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      gap:            'var(--lyra-spacing-2) var(--lyra-spacing-10)',
      alignItems:     'center',
      // The header row itself is identical whether or not tabs are shown below —
      // same min-height, same padding, same center alignment. Only the border's
      // color differs: with tabs, the border moves down to the tabs row instead
      // (so the two rows read as one connected unit) — but its 1px width stays
      // reserved (transparent, not `none`) since this box is border-box sized,
      // so removing the border outright would give the centered content 1px more
      // room to center in, shifting it by half a pixel relative to the plain header.
      minHeight:      '4.5rem',
      padding:        'var(--lyra-spacing-4) var(--lyra-spacing-8)',
      borderBottom:   `var(--lyra-border-default) solid ${tabsSlot ? 'transparent' : 'var(--lyra-color-border-subtle)'}`,
      width:          '100%',
      boxSizing:      'border-box',
      position:       'relative',
      flexShrink:     0,
    }}>

      {/* Hidden block — measures the minimum width of the title+badge row (same layout as TitleBreadcrumb) */}
      <div
        ref={titleMeasureRef}
        aria-hidden
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', display: 'inline-flex', alignItems: 'center', gap: '16px' }}
      >
        <span className="lyra-heading-lg" style={{ whiteSpace: 'nowrap' }}>{title}</span>
        {showStatusBadge && (
          <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 var(--lyra-spacing-2)', borderRadius: 'var(--lyra-radius-md)', flexShrink: 0 }}>
            <span className="lyra-body-md-em" style={{ whiteSpace: 'nowrap' }}>{statusBadgeLabel}</span>
          </div>
        )}
      </div>

      {/* ── Left: sidenav trigger + TitleBreadcrumb at imperatively set width ── */}
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', ...(headerLayout !== 'v3' && { height: 'var(--lyra-control-height-lg)' }), flexShrink: 0 }}>
        {showSidenavTrigger && (
          <>
            <span
              ref={sidenavRef}
              style={{ display: 'inline-flex', flexShrink: 0, marginRight: 'var(--lyra-spacing-3)' }}
              onMouseEnter={() => setSidenavHovered(true)}
              onMouseLeave={() => setSidenavHovered(false)}
            >
              <Button variant="ghost" size="md" iconOnly onClick={onSidenavTriggerClick} aria-label="Open dashboards sidebar">
                {sidenavTriggerIcon === 'panel-left-open' ? <PanelLeftOpen size={16} />
                  : <Menu size={16} />}
              </Button>
              {sidenavHovered && <Tooltip label="Open dashboards sidebar" anchorRef={sidenavRef} side="bottom" />}
            </span>
            <div style={{ width: DIVIDER_W, height: '100%', marginRight: 'var(--lyra-spacing-4)', background: 'var(--lyra-color-border-subtle)', flexShrink: 0 }} />
          </>
        )}
        <div ref={tbWrapperRef} className="header-title" style={{ minWidth: 0, overflow: 'hidden' }}>
          <TitleBreadcrumb
            levels={displayedLevels}
            title={title}
            showStatusBadge={showStatusBadge}
            statusBadgeLabel={statusBadgeLabel}
            layout={headerLayout === 'v3' ? 'stacked' : 'inline'}
            breadcrumbSlot={breadcrumbSlot}
            bcAvailWidth={tbBcAvailWidth}
          />
        </div>
      </div>

      {/* Hidden clone — measures header-actions' natural (uncollapsed) width even
          while actionsCollapsed is showing the single trigger button instead. */}
      <div
        ref={actionsMeasureRef}
        aria-hidden
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', display: 'inline-flex', gap: 'var(--lyra-spacing-2)' }}
      >
        {headerActionsSlot || (
          <>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="primary"   size="lg">Primary</Button>
          </>
        )}
      </div>

      {/* ── Right: outer div forces wrap via flexBasis when wrapButtons=true;
               inner div (rightRef) always reports natural button width ── */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, ...(wrapButtons ? { flexBasis: '100%' } : {}) }}>
        <div ref={rightRef} style={{ display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>

          <div className="header-actions" style={{ display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>
            {actionsCollapsed ? (
              // Button isn't ref-forwarding — wrap it so actionsTriggerRef resolves
              // to a real DOM node for the menu's anchoring/outside-click logic.
              <span ref={actionsTriggerRef} style={{ display: 'inline-flex' }}>
                <Button
                  variant="secondary"
                  size="lg"
                  iconOnly
                  aria-label="More actions"
                  aria-haspopup="menu"
                  aria-expanded={actionsMenuOpen}
                  onClick={() => setActionsMenuOpen(o => !o)}
                >
                  <EllipsisVertical size={16} />
                </Button>
              </span>
            ) : (
              headerActionsSlot || (
                <>
                  <Button variant="secondary" size="lg">Secondary</Button>
                  <Button variant="primary"   size="lg">Primary</Button>
                </>
              )
            )}
          </div>

          {showAiTrigger && (
            <div ref={aiSectionRef} style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 var(--lyra-spacing-1)', flexShrink: 0 }}>
                <div style={{ width: 1, height: 'var(--lyra-control-height-lg)', background: 'var(--lyra-color-border-subtle)' }} />
              </div>
              <Button variant="toggle" size="lg" active={aiPanelOpen} leftIcon={<Sparkles size={16} />} onClick={onAiTriggerClick}>
                AI
              </Button>
            </div>
          )}

        </div>
      </div>

      {actionsCollapsed && actionsMenuOpen && (
        <HeaderActionsMenu triggerEl={actionsTriggerRef.current} onClose={() => setActionsMenuOpen(false)}>
          {headerActionsSlot || (
            // Primary leads in the menu — the strongest action goes first in a
            // vertical list, unlike the row order to its left (secondary, then
            // primary last) where trailing draws the eye instead.
            <>
              <Button variant="primary"   size="lg">Primary</Button>
              <Button variant="secondary" size="lg">Secondary</Button>
            </>
          )}
        </HeaderActionsMenu>
      )}
    </div>
    {tabsSlot && (
      // Full-width border lives here, not on Tabs' own tablist — that div is only
      // as wide as its tab content (unless alignment="fit"), so its own border
      // wouldn't reach the row's right edge the way the plain header's does.
      // Tabs' own border is suppressed (showBorder={false}) to avoid a second,
      // narrower line directly beneath this one.
      <div style={{
        display:      'flex',
        alignItems:   'flex-end',
        padding:      '0 var(--lyra-spacing-8)',
        width:        '100%',
        boxSizing:    'border-box',
        borderBottom: 'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
        // Nudged down 1px so this border lands on the exact same line the
        // plain header's own bottom border would occupy.
        transform:    'translateY(1px)',
        flexShrink:   0,
      }}>
        {cloneElement(tabsSlot, { showBorder: false })}
      </div>
    )}
    </>
  );
}

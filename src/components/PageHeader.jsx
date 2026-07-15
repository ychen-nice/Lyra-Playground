// Figma node: 17643:45205  "Page Header"
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Sparkles, Menu } from 'lucide-react';
import '../styles/typography.css';
import '../styles/breadcrumb.css';
import Button from './Button';
import Tooltip from './Tooltip';
import TitleBreadcrumb from './TitleBreadcrumb';

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
  showBreadcrumb         = true,
  showStatusBadge        = false,
  statusBadgeLabel       = 'Active',
  showAiTrigger          = true,
  onAiTriggerClick,
  headerLayout           = 'default', // 'default' | 'v3' (stacked breadcrumb above title)
  onSidenavTriggerClick,
  onSidenavTriggerMouseEnter,
  onSidenavTriggerMouseLeave,
  _sidebarOpen           = false,
  _sidebarTransitioning  = false,
  headerActionsSlot,
  breadcrumbSlot,
}) {
  const headerRef       = useRef(null);
  const rightRef        = useRef(null);   // inner right div — natural button width
  const sidenavRef      = useRef(null);
  const titleMeasureRef = useRef(null);   // hidden span — measures title text width
  const tbWrapperRef    = useRef(null);   // direct DOM ref — width set imperatively to avoid async React lag

  const [tbBcAvailWidth, setTbBcAvailWidth] = useState(null); // passed to TitleBreadcrumb to skip its own ResizeObserver
  const [sidenavHovered, setSidenavHovered] = useState(false);
  const [wrapButtons, setWrapButtons] = useState(false);
  const wrapButtonsRef          = useRef(false); // mirrors wrapButtons, always current (avoids stale closure)
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
    <div ref={headerRef} className="main-header" style={{
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      gap:            'var(--lyra-spacing-2) var(--lyra-spacing-10)',
      alignItems:     'center',
      minHeight:      '4.5rem',
      padding:        'var(--lyra-spacing-4) var(--lyra-spacing-8)',
      borderBottom:   'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
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
                <Menu size={16} />
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

      {/* ── Right: outer div forces wrap via flexBasis when wrapButtons=true;
               inner div (rightRef) always reports natural button width ── */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, ...(wrapButtons ? { flexBasis: '100%' } : {}) }}>
        <div ref={rightRef} style={{ display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>

          <div className="header-actions" style={{ display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>
            {headerActionsSlot || (
              <>
                <Button variant="secondary" size="lg">Secondary</Button>
                <Button variant="primary"   size="lg">Primary</Button>
              </>
            )}
          </div>

          {showAiTrigger && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 var(--lyra-spacing-1)', flexShrink: 0 }}>
                <div style={{ width: 1, height: 'var(--lyra-control-height-lg)', background: 'var(--lyra-color-border-subtle)' }} />
              </div>
              <Button variant="secondary" size="lg" leftIcon={<Sparkles size={16} />} onClick={onAiTriggerClick}>
                AI
              </Button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

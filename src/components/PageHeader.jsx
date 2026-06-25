// Figma node: 17643:45205  "Page Header"
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import '../styles/typography.css';
import '../styles/breadcrumb.css';
import Button from './Button';
import TitleBreadcrumb from './TitleBreadcrumb';

// spacing-8=32 (h-padding each side), col-gap=40, spacing-3=12, spacing-2=8
const H_PAD  = 64; // 2 × spacing-8
const COL_GAP = 40;
const GAP3   = 12; // sidenav → TitleBreadcrumb
const GAP2   = 8;
const MENU_W = 32; // ··· button — minimum breadcrumb width

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
  const [wrapButtons, setWrapButtons] = useState(false);
  const wrapButtonsRef          = useRef(false); // mirrors wrapButtons, always current (avoids stale closure)
  const computeRef              = useRef(null);  // called after wrap commits to update tbWidth imperatively
  const sidebarTransitioningRef = useRef(false); // mirrors _sidebarTransitioning, always current
  sidebarTransitioningRef.current = _sidebarTransitioning;

  const displayedLevels = showBreadcrumb
    ? (showSideNavTrigger && _sidebarOpen ? levels.slice(1) : levels)
    : [];

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
      const avail1Row = headerW - H_PAD - rightW - COL_GAP;

      const shouldWrap = avail1Row < minTbW;

      const isWrapped = wrapButtonsRef.current && shouldWrap;
      const tbAvail = isWrapped
        ? headerW - H_PAD
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
  }, [levels, showBreadcrumb, title, showStatusBadge, statusBadgeLabel, headerLayout, displayedLevels]);

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
      <div className="header-left" style={{ display: 'flex', gap: 'var(--lyra-spacing-3)', alignItems: 'center', ...(headerLayout !== 'v3' && { height: 'var(--lyra-control-height-lg)' }), flexShrink: 0 }}>
        <div ref={tbWrapperRef} className="header-title" style={{ minWidth: 0 }}>
          <TitleBreadcrumb
            levels={displayedLevels}
            title={title}
            showStatusBadge={showStatusBadge}
            statusBadgeLabel={statusBadgeLabel}
            layout={headerLayout === 'v3' ? 'stacked' : 'inline'}
            breadcrumbSlot={breadcrumbSlot}
            bcAvailWidth={tbBcAvailWidth}
            sidebarBreadcrumb={showSideNavTrigger && !_sidebarOpen}
            onSidenavTriggerClick={onSidenavTriggerClick}
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

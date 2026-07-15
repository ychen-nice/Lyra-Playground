import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import PageContent, { DEFAULT_SIDEBAR_W } from './PageContent';
import AiAssistantPanel from './AiAssistantPanel';
import PageHeader from './PageHeader';
import SideNavigation, { DEFAULT_NAV_ITEMS } from './SideNavigation';
import DashboardList, { DEFAULT_DASHBOARD_NAMES } from './DashboardList';

// ── Icons (top bar only) ─────────────────────────────────────────────────────

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2.5C7.24 2.5 5 4.74 5 7.5V12L3.5 13.5V14.5H16.5V13.5L15 12V7.5C15 4.74 12.76 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8.5 14.5C8.5 15.33 9.17 16 10 16C10.83 16 11.5 15.33 11.5 14.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10V11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="10" cy="13.5" r="0.75" fill="currentColor"/>
  </svg>
);

// ── Shell ────────────────────────────────────────────────────────────────────

export default function Shell({
  navItems,
  showAiPanel: initialShowAiPanel = true,
  contentBreakpoint = 720,
  navTrigger = 'floating', // 'floating' | 'floating-hover' | 'top'
  header,
  children,
  aiUserName,
  aiSuggestions,
}) {
  const baseNavItems = navItems || DEFAULT_NAV_ITEMS;
  const initialActiveId = baseNavItems.find(i => i.active)?.id ?? baseNavItems[0]?.id;
  const [activePageId, setActivePageId] = useState(initialActiveId);

  const activePage = baseNavItems.find(i => i.id === activePageId) ?? baseNavItems[0];
  const isDashboards = activePageId === 'dashboards';

  // The Dashboards page's own identity isn't fixed — it tracks whichever dashboard is
  // selected in the content sidebar's list, mirrored here so the header can use it.
  const [selectedDashboardName, setSelectedDashboardName] = useState(DEFAULT_DASHBOARD_NAMES[0]);

  // Pages have no fixed ancestor trail of their own, so the breadcrumb levels supplied to
  // `header` (e.g. via a story's levelCount control) are repurposed: the first level is
  // pinned to the page's own identity (its nav name, or the selected dashboard name for
  // Dashboards) instead of its own demo label, remaining levels shift left to fill the
  // trail, and the last level becomes the page title — mirroring how a real app's title
  // reflects the deepest breadcrumb segment. At the default single-level (or empty) state
  // there's no trail yet, so the title is simply that same identity.
  const headerLevels = header?.props?.levels ?? [];
  const n = headerLevels.length;
  const firstLevelLabel = isDashboards ? selectedDashboardName : activePage?.label;
  let derivedLevels, derivedTitle;
  if (n > 1) {
    derivedLevels = [{ ...headerLevels[0], label: firstLevelLabel }, ...headerLevels.slice(1, n - 1)];
    derivedTitle  = headerLevels[n - 1].label;
  } else {
    // No trail yet — a single (or zero) level is just the page's own identity, already
    // shown as the title, so showing it again as a one-item breadcrumb would be a
    // redundant duplicate. The sidenav-open trigger is a standalone header control, not
    // tied to breadcrumb level 0, so this holds the same for every page, sidebar or not.
    derivedLevels = [];
    derivedTitle  = firstLevelLabel;
  }
  const navItemsWithNav = baseNavItems.map(item => ({
    ...item,
    active: item.id === activePageId,
    onClick: () => {
      if (item.id === activePageId) return;
      setActivePageId(item.id);
      // The content sidebar's dashboard list remounts fresh (key={activePageId}) and
      // defaults back to its first item, so mirror that reset here — otherwise the header
      // would keep showing whatever was selected the last time this page was visited.
      if (item.id === 'dashboards') setSelectedDashboardName(DEFAULT_DASHBOARD_NAMES[0]);
      // Navigating to a different page closes the AI panel — its context (e.g. sidebar
      // resize headroom, suggestions) is tied to the page the user was just on.
      if (aiPanelOpenRef.current) {
        if (aiPanelOverlayRef.current) overlayAnimDirRef.current = 'closing';
        setAiPanelOpenAnimated(false);
      }
    },
  }));

  const [navCollapsed, setNavCollapsed] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(initialShowAiPanel);
  // true = AI panel renders as full-width overlay; false = side-by-side flex
  const [aiPanelOverlay, setAiPanelOverlay] = useState(false);
  const narrowRef = useRef(false);        // current narrow state (no re-render)
  const contentWidthRef = useRef(Infinity); // latest content area width from PageContent
  const contentBreakpointRef = useRef(contentBreakpoint);
  const closeSidebarRef = useRef(null);

  // ── AI panel resize (flex mode only — overlay mode has no handle) ──────────
  const AI_PANEL_MIN_W = 400; // 25rem
  const AI_PANEL_MAX_W = 720; // 45rem
  const AI_PANEL_GAP    = 8;  // spacing between content panel and AI panel
  // Extra headroom kept above contentBreakpoint so the content area never reads as
  // "narrow" (ResizeObserver/sub-pixel rounding could otherwise land it exactly on the
  // line) — without this, maxing out the AI panel could flip the narrow cascade and
  // force-close the very panel being resized.
  const BREAKPOINT_SAFETY_MARGIN = 4;
  const [aiPanelWidth, setAiPanelWidth] = useState(AI_PANEL_MIN_W);
  const aiPanelWidthRef = useRef(AI_PANEL_MIN_W);
  const [isResizingAiPanel, setIsResizingAiPanel] = useState(false);
  const isResizingAiPanelRef = useRef(false);
  const [aiHandleHovered, setAiHandleHovered] = useState(false);
  const contentAiRowRef = useRef(null); // outer row containing both content panel + AI panel
  // True only for a brief window right after aiPanelOpen flips — enables the width
  // transition for that deliberate open/close animation. Off at all other times, so
  // continuous window-resize-driven flex-shrink and manual dragging both track live
  // instead of animating toward a stale target (that lag is what read as "jerky"/jumpy).
  const [aiOpenToggling, setAiOpenToggling] = useState(false);
  const aiOpenTogglingTimerRef = useRef(null);

  useLayoutEffect(() => { aiPanelWidthRef.current = aiPanelWidth; }, [aiPanelWidth]);
  useLayoutEffect(() => { isResizingAiPanelRef.current = isResizingAiPanel; }, [isResizingAiPanel]);

  // Sets aiPanelOpen and enables its width transition together, in the same render — doing
  // this reactively (e.g. a useLayoutEffect watching aiPanelOpen) would apply the width
  // change one render before the transition turns on, so there'd be nothing left to animate.
  const setAiPanelOpenAnimated = useCallback((open) => {
    setAiPanelOpen(open);
    setAiOpenToggling(true);
    clearTimeout(aiOpenTogglingTimerRef.current);
    aiOpenTogglingTimerRef.current = setTimeout(() => setAiOpenToggling(false), 320);
  }, []);

  const handleAiPanelResizeStart = (e) => {
    e.preventDefault();
    const startX     = e.clientX;
    const startWidth = aiPanelWidthRef.current;
    const bp         = contentBreakpointRef.current;
    // Derive the real (content + AI panel) budget from actual measured widths — rather
    // than recomputing row padding/border/gap by hand, which is easy to get slightly
    // wrong and let the content area dip a few px under the breakpoint when maxed out.
    const budget = contentWidthRef.current + startWidth;
    const maxByBreakpoint = budget - bp - BREAKPOINT_SAFETY_MARGIN;
    const maxW = Math.max(AI_PANEL_MIN_W, Math.min(AI_PANEL_MAX_W, maxByBreakpoint));

    setIsResizingAiPanel(true);
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (e) => {
      // Panel is on the right edge — dragging left (negative delta) grows it.
      const raw = startWidth + (startX - e.clientX);
      setAiPanelWidth(Math.max(AI_PANEL_MIN_W, Math.min(maxW, raw)));
    };
    const onUp = () => {
      setIsResizingAiPanel(false);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup',   onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup',   onUp);
  };
  // 'opening' | 'closing' | null — drives @keyframes animation names for overlay mode
  const overlayAnimDirRef = useRef(null);
  const aiPanelOverlayRef = useRef(false);
  const sidebarInfoRef = useRef({ isOpen: false, width: 256 });

  // ── Responsive cascade (driven by PageContent's content-area measurement) ─
  const navCollapsedRef  = useRef(navCollapsed);
  const aiPanelOpenRef   = useRef(aiPanelOpen);
  const cascadeCancelRef = useRef(null);
  const prevNarrowRef    = useRef(false);

  useEffect(() => { setAiPanelOpenAnimated(initialShowAiPanel); }, [initialShowAiPanel, setAiPanelOpenAnimated]);

  useLayoutEffect(() => { navCollapsedRef.current = navCollapsed; }, [navCollapsed]);
  useLayoutEffect(() => { aiPanelOpenRef.current  = aiPanelOpen;  }, [aiPanelOpen]);
  useLayoutEffect(() => { aiPanelOverlayRef.current = aiPanelOverlay; }, [aiPanelOverlay]);
  useLayoutEffect(() => { contentBreakpointRef.current = contentBreakpoint; }, [contentBreakpoint]);

  // Row's own right-padding (matches `padding: '0 12px 12px 0'` below) — subtracted when
  // deriving how much width is actually available to content + AI panel inside the row.
  const ROW_RIGHT_PADDING = 12;

  // Live (not cached) content-area width, measured directly from the row's current DOM
  // box rather than contentWidthRef — that ref only updates when PageContent's own
  // ResizeObserver fires, which can lag or (observed with some browser zoom levels) simply
  // not fire at all if the reported box size rounds to the same value. Reading the row
  // synchronously here means the one-time decision below (which page-navigation state to
  // mount PageContent with) is never made against a stale pre-zoom/pre-resize measurement.
  const getLiveContentAreaWidth = () => {
    const rowWidth = contentAiRowRef.current?.getBoundingClientRect().width;
    if (rowWidth == null) return contentWidthRef.current; // not mounted yet — fall back
    const available = rowWidth - ROW_RIGHT_PADDING;
    return (aiPanelOpen && !aiPanelOverlay) ? available - AI_PANEL_GAP - aiPanelWidth : available;
  };

  // True once the row genuinely has no room for content-at-its-breakpoint AND the AI panel
  // at its own min-width simultaneously. Reads the ROW's width directly rather than content's
  // or the AI panel's own rendered width — once either of those hits its min-width floor,
  // its size stops changing and its own ResizeObserver stops firing, so it can't be used to
  // detect *further* narrowing. The row itself keeps shrinking with the window regardless of
  // what its floored children are doing, so it's the one continuously-reliable signal.
  const aiPanelHasNoRoom = useCallback(() => {
    const rowWidth = contentAiRowRef.current?.getBoundingClientRect().width ?? Infinity;
    const available = rowWidth - ROW_RIGHT_PADDING;
    const bp = contentBreakpointRef.current;
    return available < bp + AI_PANEL_GAP + AI_PANEL_MIN_W;
  }, []);

  // Closes the AI panel once neither floor (content's breakpoint, the panel's own min-width)
  // can be honored simultaneously anymore. Reads live refs so it gives credit for space
  // already freed by the nav/sidebar steps, and is safe to call repeatedly.
  const closeAiPanelIfNoRoom = useCallback(() => {
    if (!aiPanelOpenRef.current || aiPanelOverlayRef.current) return;
    // A pinned ('opened') sidebar is still mid-cascade — wait for it to free its row space
    // (or become an overlay) before judging whether the AI panel has room. An 'overlay'
    // sidebar floats above content and never consumes row width, so it doesn't gate this.
    if (!navCollapsedRef.current || sidebarInfoRef.current.isOpen) return;
    if (cascadeCancelRef.current !== null) return; // nav/sidebar transition still mid-flight
    if (aiPanelHasNoRoom()) setAiPanelOpenAnimated(false);
  }, [aiPanelHasNoRoom, setAiPanelOpenAnimated]);

  // Continuously watches the row itself (see aiPanelHasNoRoom above) so narrowing is caught
  // even after content and the AI panel have both already hit their min-width floors, at
  // which point their own ResizeObservers stop firing.
  useEffect(() => {
    const el = contentAiRowRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (isResizingAiPanelRef.current) return;
      closeAiPanelIfNoRoom();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [closeAiPanelIfNoRoom]);

  // Cascade order: (1) minimize shell nav → (2) close content sidebar →
  // (3) close the AI panel — but only once CSS has already squeezed it down to its own
  // min-width floor and content is still at its breakpoint floor too. The shrinking itself
  // is native flexbox (content: min-width=contentBreakpoint, non-shrinking; AI panel:
  // min-width=25rem, shrinkable) — resolved in the same layout pass as the resize, so it
  // tracks the live window drag with zero JS round-trip lag. JS only decides the one
  // discrete moment neither floor can be honored anymore and the panel must close outright.
  const handleContentNarrow = useCallback((narrow, width) => {
    // Store as ref only — don't set state here to avoid a feedback loop:
    // overlay mode frees flex space → content widens → narrow=false → overlay off →
    // AI panel takes flex space again → content narrows → narrow=true → repeat.
    narrowRef.current = narrow;
    if (width !== undefined) contentWidthRef.current = width;

    // While the user is actively dragging the AI panel handle, the resize itself is the
    // thing changing content width — don't let that also trigger the nav/sidebar/AI-panel
    // auto-collapse cascade. The drag's own max-width clamp already keeps content at or
    // above the breakpoint; this is a belt-and-suspenders guard against measurement jitter.
    if (isResizingAiPanelRef.current) return;

    // Fast path: nav + sidebar are already collapsed, so keep checking on every measurement —
    // not just the initial narrow/wide flip, which fires once per crossing. (The dedicated
    // row observer above also covers this once content/AI panel are floored; this covers the
    // case where content is still resizing normally, before hitting its own floor.)
    if (narrow) closeAiPanelIfNoRoom();

    if (narrow === prevNarrowRef.current) return;
    prevNarrowRef.current = narrow;

    if (!narrow) {
      clearTimeout(cascadeCancelRef.current);
      cascadeCancelRef.current = null;
      return;
    }
    if (cascadeCancelRef.current !== null) return;

    const step3 = () => {
      cascadeCancelRef.current = null;
      closeAiPanelIfNoRoom();
    };

    const step2 = () => {
      cascadeCancelRef.current = null;
      closeSidebarRef.current?.();
      cascadeCancelRef.current = setTimeout(step3, 350);
    };

    const step1 = () => {
      cascadeCancelRef.current = null;
      if (!navCollapsedRef.current) {
        setNavCollapsed(true);
        cascadeCancelRef.current = setTimeout(step2, 350);
      } else {
        step2();
      }
    };

    step1();
  }, [closeAiPanelIfNoRoom]);

  return (
    <>
    <style>{`
      @keyframes lyra-ai-open  { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes lyra-ai-close { from { transform: translateX(0); }    to { transform: translateX(100%); } }
      @keyframes lyra-ct-out   { from { transform: translateX(0); }    to { transform: translateX(-100%); } }
      @keyframes lyra-ct-in    { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    `}</style>
    <div style={{
      background: 'var(--lyra-color-bg-surface-shell, #f5f7f9)',
      border: '1px solid var(--lyra-color-border-soft, rgba(0,0,0,0.16))',
      borderRadius: 16,
      boxShadow: '0px 12px 24px rgba(0,0,0,0.08)',
      overflow: 'clip',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    }}>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div style={{
        height: 56, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px',
      }}>
        {/* App name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 8px', height: 40, borderRadius: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M23.7188 5.81445C23.8757 5.8146 24.0015 5.94038 24 6.0957C23.8494 15.8179 15.9182 23.6985 6.13379 23.8477C5.97839 23.8493 5.85077 23.7237 5.85059 23.5684V19.3086C5.85059 19.1563 5.97502 19.0335 6.12891 19.0303C13.2448 18.8844 19.0048 13.1599 19.1523 6.08984C19.1556 5.93599 19.2788 5.81255 19.4326 5.8125L23.7188 5.81445Z" fill="#3694FC"/>
            <path d="M12.2559 0.000976562C13.8714 0.00104033 15.1804 1.30219 15.1807 2.90625C15.1807 4.51051 13.8716 5.81244 12.2559 5.8125C10.6401 5.8125 9.33008 4.51055 9.33008 2.90625C9.33031 1.30215 10.6402 0.000976562 12.2559 0.000976562Z" fill="#3694FC"/>
            <path d="M2.92578 0C4.5412 0.000213196 5.85033 1.30132 5.85059 2.90527C5.85059 4.50944 4.54135 5.81131 2.92578 5.81152C1.31003 5.81152 0 4.50957 0 2.90527C0.000253194 1.30119 1.31018 0 2.92578 0Z" fill="#3694FC"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="lyra-heading-md" style={{ color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))', whiteSpace: 'nowrap' }}>
              Application Name
            </span>
            <span style={{ color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}><ChevronDown /></span>
          </div>
        </div>

        {/* Right utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[QuestionIcon, GridIcon, BellIcon].map((Icon, i) => (
            <button key={i} style={{
              width: 40, height: 40, borderRadius: 8, border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--lyra-color-fg-secondary, rgba(0,0,0,0.6))', cursor: 'pointer',
            }}>
              <Icon />
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--lyra-color-border-subtle, rgba(0,0,0,0.1))', margin: '0 4px' }} />
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '0 8px', height: 40, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 20, flexShrink: 0,
              background: 'var(--lyra-color-fg-action, #5d6a79)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500,
            }}>
              JS
            </div>
            <span style={{ color: 'var(--lyra-color-fg-secondary, rgba(0,0,0,0.6))' }}><ChevronDown /></span>
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{
        flex: '1 0 0', minHeight: 0,
        display: 'flex', alignItems: 'stretch',
      }}>

        <SideNavigation
          navItems={navItemsWithNav}
          minimized={navCollapsed}
          triggerVisibility={navTrigger === 'floating-hover' ? 'hover' : 'always'}
          version={navTrigger === 'top' ? 'v2' : 'v1'}
          onToggle={() => setNavCollapsed(o => {
            // Expanding (o=true means currently collapsed) costs the row NAV_EXPAND_DELTA
            // of width — refuse it if that would push content below its breakpoint, the
            // same way the internal sidebar's pin button disables itself when too narrow.
            if (o) {
              const NAV_EXPAND_DELTA = 256 - 60; // must match SideNavigation's expanded/collapsed widths
              const bp = contentBreakpointRef.current;
              if (getLiveContentAreaWidth() - NAV_EXPAND_DELTA < bp) return o;
            }
            const next = !o;
            // Minimizing the nav while the content sidebar floats as an overlay closes it too —
            // an overlay only makes sense as a temporary, in-context reveal.
            if (next && sidebarInfoRef.current.isOverlay) closeSidebarRef.current?.();
            return next;
          })}
        />

        {/* Page content + AI panel */}
        <div ref={contentAiRowRef} style={{
          flex: '1 0 0', minWidth: 0,
          display: 'flex',
          padding: `0 12px 12px 0`,
          boxSizing: 'border-box',
          height: '100%',
          zIndex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Content panel — in overlay mode becomes absolute so AI panel can push it aside */}
          <div style={aiPanelOverlay ? {
            position: 'absolute',
            top: 0, left: 0, right: 12, bottom: 12,
            transform: aiPanelOpen ? 'translateX(-100%)' : 'translateX(0)',
            animation: overlayAnimDirRef.current === 'opening'
              ? 'lyra-ct-out 300ms ease forwards'
              : overlayAnimDirRef.current === 'closing'
              ? 'lyra-ct-in 300ms ease forwards'
              : 'none',
          } : {
            // min-width is the breakpoint floor — flex-shrink:0 means this item is never
            // touched by the shrink algorithm at all; the AI panel (flex-shrink:1) absorbs
            // any squeeze first, natively, in the same layout pass as the resize. Only
            // applied while the AI panel is actually open and competing for space —
            // otherwise it would floor the content area (and PageHeader's own internal
            // wrap logic) at the breakpoint even with no AI panel around to justify it.
            flex: '1 0 0', minWidth: aiPanelOpen ? contentBreakpoint : 0, height: '100%',
          }}>
            <PageContent
              key={activePageId}
              header={header ? React.cloneElement(header, { title: derivedTitle, levels: derivedLevels, showSideNavTrigger: isDashboards, showBreadcrumb: derivedLevels.length > 0 }) : header}
              sidebar={isDashboards ? <DashboardList onSelect={setSelectedDashboardName} /> : null}
              initialSidebarState={isDashboards
                // Pinning the sidebar adds DEFAULT_SIDEBAR_W of padding to the content area —
                // if that would push it below the breakpoint, open as a floating overlay instead.
                ? (getLiveContentAreaWidth() - DEFAULT_SIDEBAR_W >= contentBreakpointRef.current ? 'opened' : 'overlay')
                : 'hidden'}
              contentBreakpoint={contentBreakpoint}
              onAiTriggerClick={() => {
                clearTimeout(cascadeCancelRef.current);
                cascadeCancelRef.current = null;
                const opening = !aiPanelOpen;
                if (opening) {
                  const W  = getLiveContentAreaWidth();
                  const bp = contentBreakpointRef.current;
                  const { isOpen: sidebarOpen, width: sidebarWidth } = sidebarInfoRef.current;
                  if (W >= bp + AI_PANEL_MIN_W + AI_PANEL_GAP) {
                    // Wide enough as-is — flex mode
                    setAiPanelOpenAnimated(true);
                  } else if (sidebarOpen && W + sidebarWidth >= bp + AI_PANEL_MIN_W + AI_PANEL_GAP) {
                    // Closing the sidebar frees enough room for the AI panel in flex mode
                    closeSidebarRef.current?.();
                    setAiPanelOpenAnimated(true);
                  } else {
                    // Not enough room either way — overlay mode
                    overlayAnimDirRef.current = 'opening';
                    setAiPanelOverlay(true);
                    setAiPanelOpenAnimated(true);
                  }
                } else {
                  if (aiPanelOverlayRef.current) overlayAnimDirRef.current = 'closing';
                  setAiPanelOpenAnimated(false);
                }
              }}
              onNarrow={handleContentNarrow}
              closeSidebarRef={closeSidebarRef}
              sidebarInfoRef={sidebarInfoRef}
            >
              {children}
            </PageContent>
          </div>

          {/* AI panel — slides from right (wide: width) or pushes content aside (narrow: translateX) */}
          <div style={aiPanelOverlay ? {
            position: 'absolute',
            top: 0, left: 0, right: 12, bottom: 12,
            transform: aiPanelOpen ? 'translateX(0)' : 'translateX(100%)',
            animation: overlayAnimDirRef.current === 'opening'
              ? 'lyra-ai-open 300ms ease forwards'
              : overlayAnimDirRef.current === 'closing'
              ? 'lyra-ai-close 300ms ease forwards'
              : 'none',
            overflow: 'hidden',
          } : {
            // flex-shrink:1 + min-width let the browser squeeze this down toward its own
            // floor natively (same layout pass as the resize, no JS round-trip) once content's
            // own min-width has nothing left to give. No width transition — the shrink should
            // track the live resize/drag instantly, not ease toward a stale target.
            flexGrow: 0,
            flexShrink: aiPanelOpen ? 1 : 0,
            width: aiPanelOpen ? aiPanelWidth : 0,
            // min-width has no transition of its own, so it would otherwise snap to 400
            // instantly and floor the width animation from frame one — suppress it during
            // the open/close toggle so width is free to animate the full 0↔aiPanelWidth
            // range, then restore it once settled to protect against resize-squeeze again.
            minWidth: (aiPanelOpen && !aiOpenToggling) ? AI_PANEL_MIN_W : 0,
            marginLeft: aiPanelOpen ? AI_PANEL_GAP : 0,
            overflow: 'hidden',
            transition: aiOpenToggling ? 'width 300ms ease, margin-left 300ms ease' : 'margin-left 300ms ease',
            height: '100%',
            borderRadius: 'var(--lyra-radius-lg)',
            boxShadow: 'var(--lyra-shadow-sm)',
            position: 'relative',
          }}
            onAnimationEnd={() => {
              overlayAnimDirRef.current = null;
              if (!aiPanelOpen) setAiPanelOverlay(false);
            }}
            onTransitionEnd={() => {
              if (!aiPanelOpen) setAiPanelOverlay(false);
            }}
          >
            {/* Resize handle — sits in the gap between content panel and AI panel, visible on hover */}
            {aiPanelOpen && !aiPanelOverlay && (
              <div
                onPointerDown={handleAiPanelResizeStart}
                onMouseEnter={() => setAiHandleHovered(true)}
                onMouseLeave={() => setAiHandleHovered(false)}
                style={{
                  position: 'absolute',
                  left: -12,
                  top: 0, bottom: 0,
                  width: 16,
                  cursor: 'col-resize',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{
                  width: 2,
                  background: (aiHandleHovered || isResizingAiPanel)
                    ? 'var(--lyra-color-accent-blue-strong, #3b82f6)'
                    : 'transparent',
                  transition: 'background 120ms',
                  pointerEvents: 'none',
                }} />
              </div>
            )}
            {aiPanelOverlay ? (
              // Overlay mode: panel fills full width; content centering is handled inside AiAssistantPanel
              <div style={{ width: '100%', height: '100%', border: '1px solid var(--lyra-color-border-subtle)', borderRadius: 'var(--lyra-radius-lg)', overflow: 'clip' }}>
                <AiAssistantPanel embedded userName={aiUserName} suggestions={aiSuggestions} onClose={() => { overlayAnimDirRef.current = 'closing'; setAiPanelOpen(false); }} />
              </div>
            ) : (
              // Wide mode: resizable panel, defaults to 25rem (min width). Width is 100% of
              // the parent, not aiPanelWidth directly — the parent's *rendered* size may be
              // less than aiPanelWidth when flex-shrink has squeezed it toward its floor.
              <div style={{ width: '100%', height: '100%', border: '1px solid var(--lyra-color-border-subtle)', borderRadius: 'var(--lyra-radius-lg)', overflow: 'clip' }}>
                <AiAssistantPanel embedded userName={aiUserName} suggestions={aiSuggestions} onClose={() => setAiPanelOpenAnimated(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

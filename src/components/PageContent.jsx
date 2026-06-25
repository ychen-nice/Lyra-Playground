// Figma node: 2338:2667  "Content - shell"
//
// Sidebar state machine (driven by user interaction):
//   hidden  → [click sidenav icon]   → overlay
//   overlay → [click outside sidebar] → hidden
//   overlay → [click inside sidebar]  → opened
//   opened  → [click inside sidebar]  → overlay
//
// All transitions are animated in InternalSidebar (translateX) and in the
// content panel (paddingLeft), both 300ms ease.

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import InternalSidebar from './InternalSidebar';

const DEFAULT_SIDEBAR_W = 256; // 16rem
const MIN_SIDEBAR_W     = 192; // 12rem
const MAX_SIDEBAR_W     = 400; // 25rem

export default function PageContent({
  header,
  sidebar,
  sidebarState: controlledState,
  contentBreakpoint = 720, // min content-area width at which sidebar auto-closes
  onAiTriggerClick,
  onNarrow, // (isNarrow: boolean) => void — notifies Shell for nav/AI-panel cascade
  closeSidebarRef, // ref populated by PageContent so Shell can imperatively close sidebar
  children,
}) {
  const [state, setState] = useState(controlledState ?? 'hidden');
  const [isSidebarTransitioning, setIsSidebarTransitioning] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_W);
  const [isDragging, setIsDragging] = useState(false);

  // Imperative close handle — Shell calls this in cascade step 2
  if (closeSidebarRef) closeSidebarRef.current = () => setState('hidden');

  const closeTimerRef     = useRef(null);
  const sidebarTransitionTimerRef = useRef(null);
  const containerRef      = useRef(null);
  const contentAreaRef    = useRef(null); // the content panel div — measures true content area width
  const stateRef          = useRef(state);       // always-current mirror of state, for ResizeObserver
  const sidebarWidthRef   = useRef(DEFAULT_SIDEBAR_W); // always-current mirror of sidebarWidth
  const isDraggingRef     = useRef(false);        // used synchronously in event handlers
  const [isNarrow, setIsNarrow]         = useState(false);
  const [isPinDisabled, setIsPinDisabled] = useState(false);
  const prevNarrowRef     = useRef(false);
  const onNarrowRef       = useRef(onNarrow);
  useLayoutEffect(() => { onNarrowRef.current = onNarrow; }, [onNarrow]);

  // Keep state in sync with controlledState — runs after every render so that if the
  // user opens the sidebar while Shell has it force-closed, it immediately re-closes.
  useLayoutEffect(() => {
    if (controlledState !== undefined && state !== controlledState) setState(controlledState);
  }, [controlledState, state]);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  // Keep refs current before ResizeObserver fires (useLayoutEffect runs before paint/RO)
  useLayoutEffect(() => { stateRef.current = state; }, [state]);
  useLayoutEffect(() => { sidebarWidthRef.current = sidebarWidth; }, [sidebarWidth]);

  // Mark the 300ms padding-left transition so PageHeader suppresses wrap decisions during it,
  // and so openOverlay ignores hover events while the layout is animating.
  const isOpened = state === 'opened';
  const isSidebarTransitioningRef = useRef(false);
  useEffect(() => {
    isSidebarTransitioningRef.current = true;
    setIsSidebarTransitioning(true);
    clearTimeout(sidebarTransitionTimerRef.current);
    sidebarTransitionTimerRef.current = setTimeout(() => {
      isSidebarTransitioningRef.current = false;
      setIsSidebarTransitioning(false);
    }, 350);
    return () => clearTimeout(sidebarTransitionTimerRef.current);
  }, [isOpened]);

  // Observe the content area div (not the outer container) so measurement reflects the true
  // available content width — already excluding the sidebar padding and any future panels.
  // narrow formula: when sidebar is open, contentRect.width IS the content area, so compare
  // directly to contentBreakpoint; when sidebar is hidden, add sidebarWidth to ask "would there
  // be room if we opened it?"
  useEffect(() => {
    const el = contentAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      const cb = onNarrowRef.current;

      const narrow = w < contentBreakpoint + (stateRef.current === 'opened' ? 0 : sidebarWidthRef.current);
      const pinDis = narrow;
      const prev = prevNarrowRef.current;
      prevNarrowRef.current = narrow;

      if (!isDraggingRef.current) {
        setIsNarrow(w < contentBreakpoint);
        setIsPinDisabled(pinDis);

        // Notify Shell for nav/AI-panel cascade (passes raw width as 2nd arg)
        if (cb) cb(w < contentBreakpoint, w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [contentBreakpoint]);

  const isOverlay = state === 'overlay';

  const sidenavProps = {
    onSidenavTriggerClick: () => {
      setState(isPinDisabled ? 'overlay' : 'opened');
    },
  };

  const enhancedHeader = header
    ? React.cloneElement(header, { ...sidenavProps, _sidebarOpen: state !== 'hidden', _sidebarTransitioning: isSidebarTransitioning, onAiTriggerClick })
    : null;

  // ── Resize drag logic ──────────────────────────────────────────────────────
  const handleResizeStart = (e) => {
    e.preventDefault();
    const startX     = e.clientX;
    const startWidth = sidebarWidthRef.current;

    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';

    // Tracks the latest clamped width synchronously so onUp always has the final value,
    // even before the setSidebarWidth re-render has flushed sidebarWidthRef.
    let lastDragWidth = startWidth;

    const onMove = (e) => {
      // Use contentAreaRef (not containerRef) so the cap is based on the same element as
      // onUp's narrow check — the container has a border that makes it 2px wider, which
      // would allow lastDragWidth to exceed the breakpoint by that margin and cause
      // narrow = true in onUp even when the drag ended at the max position.
      const containerWidth = contentAreaRef.current?.getBoundingClientRect().width ?? Infinity;
      // In overlay mode the sidebar floats above content — only cap at MAX_SIDEBAR_W.
      // In opened (pinned) mode — also cap so content area stays >= contentBreakpoint.
      const contentCap = stateRef.current === 'opened'
        ? containerWidth - contentBreakpoint
        : MAX_SIDEBAR_W;
      const maxW = Math.min(MAX_SIDEBAR_W, Math.max(MIN_SIDEBAR_W, contentCap));
      const raw  = startWidth + (e.clientX - startX);
      lastDragWidth = Math.max(MIN_SIDEBAR_W, Math.min(maxW, raw));
      setSidebarWidth(lastDragWidth);
    };

    const onUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup',   onUp);

      // Re-evaluate isNarrow after drag ends. When the sidebar is in overlay/hidden state,
      // paddingLeft is 0, so the content area width is unaffected by sidebar width changes —
      // the ResizeObserver never fires and isNarrow stays frozen at its pre-drag value.
      // Use lastDragWidth (updated synchronously in onMove) rather than sidebarWidthRef,
      // which may still hold the old value if the React re-render hasn't flushed yet.
      const el = contentAreaRef.current;
      if (el) {
        // outerW = getBoundingClientRect().width of the border-box div = container inner width.
        // In overlay/hidden mode paddingLeft=0, so the ResizeObserver never fires when the
        // sidebar width changes — isPinDisabled would stay frozen at its pre-drag value.
        // Recompute it here so the pin button reflects the actual post-drag width.
        // isNarrow is intentionally NOT updated here: it is solely the ResizeObserver's job
        // (window resize), so dragging the overlay sidebar wider never activates hover mode.
        const outerW = el.getBoundingClientRect().width;
        setIsPinDisabled(outerW < contentBreakpoint + lastDragWidth);
      }
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup',   onUp);
  };

  return (
    <div ref={containerRef} className="page-shell" style={{
      background:    'var(--lyra-color-bg-surface-base)',
      border:        'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
      borderRadius:  'var(--lyra-radius-lg)',
      boxShadow:     'var(--lyra-shadow-sm)',
      overflow:      'clip',
      position:      'relative',
      width:         '100%',
      height:        '100%',
      display:       'flex',
      flexDirection: 'column',
    }}>

      {/* Transparent backdrop — catches clicks outside the sidebar to dismiss it */}
      {isOverlay && (
        <div
          className="sidebar-backdrop"
          onClick={() => setState('hidden')}
          style={{ position: 'absolute', inset: 0, zIndex: 9 }}
        />
      )}

      {/* Content panel — shifts right when the sidebar is in opened (locked) mode.
          box-sizing: border-box ensures paddingLeft shrinks the content area rather
          than expanding the total width, keeping the header flush with the right edge.
          Transition is suppressed during resize drag so paddingLeft tracks the handle live. */}
      <div ref={contentAreaRef} className="main-content" style={{
        flex:          '1 0 0',
        display:       'flex',
        flexDirection: 'column',
        boxSizing:     'border-box',
        width:         '100%',
        height:        '100%',
        paddingLeft:   isOpened ? `${sidebarWidth}px` : '0',
        transition:    isDragging ? 'none' : 'padding-left 300ms ease',
        minWidth:      0,
      }}>
        {enhancedHeader}
        <div className="main-body" style={{ flex: '1 0 0', position: 'relative', minHeight: 1 }}>
          {children}
        </div>
      </div>

      {/* Sidebar — always mounted so CSS transitions play on every state change.
          Pin button is the only control for overlay ↔ opened; sidenav trigger opens as overlay. */}
      <InternalSidebar
        state={state}
        width={sidebarWidth}
        isDragging={isDragging}
        isTransitioning={isSidebarTransitioning}
        onResizeStart={handleResizeStart}
        onPinClick={() => setState('hidden')}
        pinDisabled={isPinDisabled}
      >
        {sidebar}
      </InternalSidebar>
    </div>
  );
}

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import PageContent from './PageContent';
import AiAssistantPanel from './AiAssistantPanel';
import PageHeader from './PageHeader';
import SideNavigation from './SideNavigation';

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
  sidebarState,
  contentBreakpoint = 720,
  header,
  children,
  aiUserName,
  aiSuggestions,
}) {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(initialShowAiPanel);
  // true = AI panel renders as full-width overlay; false = side-by-side flex
  const [aiPanelOverlay, setAiPanelOverlay] = useState(false);
  const narrowRef = useRef(false);        // current narrow state (no re-render)
  const contentWidthRef = useRef(Infinity); // latest content area width from PageContent
  const contentBreakpointRef = useRef(contentBreakpoint);
  const closeSidebarRef = useRef(null);
  // 'opening' | 'closing' | null — drives @keyframes animation names for overlay mode
  const overlayAnimDirRef = useRef(null);
  const aiPanelOverlayRef = useRef(false);

  // Keep the panel mounted during close animation so it can slide out
  const aiPanelMounted = useRef(aiPanelOpen);
  if (aiPanelOpen) aiPanelMounted.current = true;

  // ── Responsive cascade (driven by PageContent's content-area measurement) ─
  const navCollapsedRef  = useRef(navCollapsed);
  const aiPanelOpenRef   = useRef(aiPanelOpen);
  const cascadeCancelRef = useRef(null);
  const prevNarrowRef    = useRef(false);

  useLayoutEffect(() => { navCollapsedRef.current = navCollapsed; }, [navCollapsed]);
  useLayoutEffect(() => { aiPanelOpenRef.current  = aiPanelOpen;  }, [aiPanelOpen]);
  useLayoutEffect(() => { aiPanelOverlayRef.current = aiPanelOverlay; }, [aiPanelOverlay]);
  useLayoutEffect(() => { contentBreakpointRef.current = contentBreakpoint; }, [contentBreakpoint]);

  // Cascade order: (1) minimize shell nav → (2) close content sidebar → (3) close AI panel.
  const handleContentNarrow = useCallback((narrow, width) => {
    // Store as ref only — don't set state here to avoid a feedback loop:
    // overlay mode frees flex space → content widens → narrow=false → overlay off →
    // AI panel takes flex space again → content narrows → narrow=true → repeat.
    narrowRef.current = narrow;
    if (width !== undefined) contentWidthRef.current = width;

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
      if (aiPanelOpenRef.current) {
        if (aiPanelOverlayRef.current) overlayAnimDirRef.current = 'closing';
        setAiPanelOpen(false);
      }
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
  }, []);

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
          navItems={navItems}
          minimized={navCollapsed}
          onToggle={() => setNavCollapsed(o => !o)}
        />

        {/* Page content + AI panel */}
        <div style={{
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
            flex: '1 0 0', minWidth: 0, height: '100%',
          }}>
            <PageContent
              header={header}
              sidebarState={sidebarState}
              contentBreakpoint={contentBreakpoint}
              onAiTriggerClick={() => {
                clearTimeout(cascadeCancelRef.current);
                cascadeCancelRef.current = null;
                const opening = !aiPanelOpen;
                if (opening) {
                  if (contentWidthRef.current < contentBreakpointRef.current + 408) {
                    // Overlay mode: @keyframes define the start position so both panels
                    // can switch to absolute and start animating in a single render.
                    overlayAnimDirRef.current = 'opening';
                    setAiPanelOverlay(true);
                    setAiPanelOpen(true);
                  } else {
                    setAiPanelOpen(true);
                  }
                } else {
                  if (aiPanelOverlayRef.current) overlayAnimDirRef.current = 'closing';
                  setAiPanelOpen(false);
                }
              }}
              onNarrow={handleContentNarrow}
              closeSidebarRef={closeSidebarRef}
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
            flexShrink: 0,
            width: aiPanelOpen ? 400 : 0,
            marginLeft: aiPanelOpen ? 8 : 0,
            overflow: 'hidden',
            transition: 'width 300ms ease, margin-left 300ms ease',
            height: '100%',
            borderRadius: 'var(--lyra-radius-lg)',
            boxShadow: 'var(--lyra-shadow-sm)',
          }}
            onAnimationEnd={() => {
              overlayAnimDirRef.current = null;
              if (!aiPanelOpen) {
                aiPanelMounted.current = false;
                setAiPanelOverlay(false);
              }
            }}
            onTransitionEnd={() => {
              if (!aiPanelOpen) {
                aiPanelMounted.current = false;
                setAiPanelOverlay(false);
              }
            }}
          >
            {aiPanelMounted.current && (aiPanelOverlay ? (
              // Overlay mode: panel fills full width; content centering is handled inside AiAssistantPanel
              <div style={{ width: '100%', height: '100%', border: '1px solid var(--lyra-color-border-subtle)', borderRadius: 'var(--lyra-radius-lg)', overflow: 'clip' }}>
                <AiAssistantPanel embedded userName={aiUserName} suggestions={aiSuggestions} onClose={() => { overlayAnimDirRef.current = 'closing'; setAiPanelOpen(false); }} />
              </div>
            ) : (
              // Wide mode: 400px fixed panel
              <div style={{ width: 400, height: '100%', border: '1px solid var(--lyra-color-border-subtle)', borderRadius: 'var(--lyra-radius-lg)', overflow: 'clip', flexShrink: 0 }}>
                <AiAssistantPanel embedded userName={aiUserName} suggestions={aiSuggestions} onClose={() => { overlayAnimDirRef.current = 'closing'; setAiPanelOpen(false); }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

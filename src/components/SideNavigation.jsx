import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, ListCheck, UserRoundCheck, LayoutDashboard, DatabaseSearch, Settings } from 'lucide-react';
import '../styles/typography.css';
import Tooltip from './Tooltip';
import TruncatedLabel from './TruncatedLabel';
import Button from './Button';

// ── Icons ─────────────────────────────────────────────────────────────────────

const PlaceholderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// ── Sub-components ────────────────────────────────────────────────────────────

function NavBadge({ label = 'New' }) {
  return (
    <div style={{
      background: 'var(--lyra-color-accent-blue-strong, #2d5bb9)',
      color: 'var(--lyra-color-accent-blue-soft, #d6e4ff)',
      fontSize: 12, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.2px',
      padding: '0 var(--lyra-spacing-2)', height: 'var(--lyra-control-height-xs)', borderRadius: 'var(--lyra-radius-sm)',
      display: 'flex', alignItems: 'center', flexShrink: 0,
    }}>
      {label}
    </div>
  );
}

function NavPageItem({ label, active, badge, minimized, onClick, icon: Icon = PlaceholderIcon }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const btnRef = useRef(null);

  if (minimized) {
    return (
      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 'var(--lyra-row-height-md)', borderRadius: 'var(--lyra-radius-md)', flexShrink: 0,
          background: active
            ? 'var(--lyra-color-bg-active-moderate, #d3e6fd)'
            : pressed ? 'var(--lyra-color-state-bg-pressed-opacity)'
            : hovered ? 'var(--lyra-color-state-bg-hover-opacity)' : 'transparent',
          border: 'none', cursor: 'pointer', position: 'relative',
        }}>
        {active ? (
          <span style={{
            position: 'absolute', left: 0, top: '28%', bottom: '28%',
            width: 'var(--lyra-spacing-05)', background: 'var(--lyra-color-fg-active-strong, #185ba4)',
            borderRadius: 'var(--lyra-radius-xs)',
          }} />
        ) : (hovered || pressed) && (
          <span style={{
            position: 'absolute', left: 0, top: '28%', bottom: '28%',
            width: 'var(--lyra-spacing-05)', background: 'var(--lyra-color-fg-secondary)',
            borderRadius: 'var(--lyra-radius-xs)',
          }} />
        )}
        <span style={{ display: 'flex', color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
          <Icon size={16} />
        </span>
        {hovered && <Tooltip label={label} anchorRef={btnRef} />}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)',
        height: 'var(--lyra-row-height-md)', padding: '0 10px', width: '100%', flexShrink: 0,
        background: active
          ? 'var(--lyra-color-bg-active-moderate, #d3e6fd)'
          : pressed ? 'var(--lyra-color-state-bg-pressed-opacity)'
          : hovered ? 'var(--lyra-color-state-bg-hover-opacity)' : 'transparent',
        border: 'none', borderRadius: 'var(--lyra-radius-md)', cursor: 'pointer',
        textAlign: 'left', position: 'relative',
      }}>
      {active ? (
        <span style={{
          position: 'absolute', left: 0, top: '28%', bottom: '28%',
          width: 'var(--lyra-spacing-05)', background: 'var(--lyra-color-fg-active-strong, #185ba4)',
          borderRadius: 'var(--lyra-radius-xs)',
        }} />
      ) : (hovered || pressed) && (
        <span style={{
          position: 'absolute', left: 0, top: '28%', bottom: '28%',
          width: 'var(--lyra-spacing-05)', background: 'var(--lyra-color-fg-secondary)',
          borderRadius: 'var(--lyra-radius-xs)',
        }} />
      )}
      <span style={{ display: 'flex', flexShrink: 0, color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
        <Icon size={16} />
      </span>
      <TruncatedLabel className={active ? 'lyra-body-md-em' : 'lyra-body-md'} style={{
        flex: '1 0 0', minWidth: 0,
        color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
      }}>
        {label}
      </TruncatedLabel>
      {badge && <NavBadge label={badge} />}
    </button>
  );
}

function NavGroupItem({ label, children: navChildren, minimized }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const btnRef = useRef(null);

  if (minimized) {
    return (
      <button
        ref={btnRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 'var(--lyra-row-height-md)', borderRadius: 'var(--lyra-radius-md)', flexShrink: 0,
          background: pressed ? 'var(--lyra-color-state-bg-pressed-opacity)'
            : hovered ? 'var(--lyra-color-state-bg-hover-opacity)' : 'transparent',
          border: 'none', cursor: 'pointer', position: 'relative',
        }}>
        <span style={{ display: 'flex', color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
          <PlaceholderIcon />
        </span>
        {hovered && <Tooltip label={label} anchorRef={btnRef} />}
      </button>
    );
  }

  return (
    <div style={{ width: '100%', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)',
          height: 'var(--lyra-row-height-md)', padding: '0 10px', width: '100%',
          background: pressed ? 'var(--lyra-color-state-bg-pressed-opacity)'
            : hovered ? 'var(--lyra-color-state-bg-hover-opacity)' : 'transparent',
          border: 'none', borderRadius: 'var(--lyra-radius-md)', cursor: 'pointer',
        }}>
        <span style={{ display: 'flex', color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))', flexShrink: 0 }}>
          <PlaceholderIcon />
        </span>
        <TruncatedLabel className="lyra-body-md" style={{
          flex: '1 0 0', minWidth: 0, textAlign: 'left',
          color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
        }}>
          {label}
        </TruncatedLabel>
        <span style={{
          display: 'flex',
          color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 200ms ease',
          flexShrink: 0,
        }}>
          <ChevronDown />
        </span>
      </button>
      {open && navChildren && (
        <div>
          {navChildren.map((child, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center',
              height: 'var(--lyra-row-height-md)', paddingLeft: 'var(--lyra-spacing-5)', paddingRight: 'var(--lyra-spacing-2)',
              borderRadius: 'var(--lyra-radius-md)', position: 'relative',
            }}>
              <span style={{
                position: 'absolute', left: 10, top: 0, bottom: 0,
                width: 'var(--lyra-border-default)', background: 'var(--lyra-color-border-soft)',
              }} />
              <TruncatedLabel className="lyra-body-md" style={{
                color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
                flex: '1 0 0', minWidth: 0,
              }}>
                {child}
              </TruncatedLabel>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Expanded/collapsed nav item row width (must match the "Nav items" wrapper below) — the
// trigger row stays fixed at the expanded width always so it isn't clipped mid-transition;
// the outer clipping container (overflow: hidden) trims whatever spills past the collapsed
// width.
const NAV_ROW_W = 232;

function NavV2Trigger({ minimized, onToggle, triggerVisibility, hovered }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const visible = triggerVisibility !== 'hover' || hovered;
  const btnRef = useRef(null);
  const label = minimized ? 'Expand navigation' : 'Collapse navigation';

  return (
    <div style={{
      display: 'flex', width: NAV_ROW_W, flexShrink: 0,
      // The row stays a fixed (wide) width regardless of minimized state — without pinning
      // it to the start, the parent's centered alignItems (used while minimized) would
      // center this oversized row and push the button entirely outside the collapsed
      // nav's clipped viewport.
      alignSelf: 'flex-start',
      opacity: visible ? 1 : 0,
      transition: 'opacity 150ms ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {/* Button doesn't forward refs, so the tooltip anchors to this wrapper span instead */}
      <span
        ref={btnRef}
        style={{ display: 'inline-flex' }}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        <Button variant="ghost" size="lg" iconOnly onClick={onToggle} aria-label={label}>
          {minimized ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </Button>
        {btnHovered && <Tooltip label={label} anchorRef={btnRef} />}
      </span>
    </div>
  );
}

function NavDivider({ minimized }) {
  return (
    <div style={{
      width: minimized ? 36 : '100%',
      height: 'var(--lyra-border-default)',
      background: 'var(--lyra-color-border-subtle)',
      flexShrink: 0,
      margin: 'var(--lyra-spacing-1) 0',
    }} />
  );
}

// ── SideNavigation ────────────────────────────────────────────────────────────

export const DEFAULT_NAV_ITEMS = [
  { id: 'evaluation', type: 'page', label: 'Evaluation Tasks', icon: ListCheck },
  { id: 'quality', type: 'page', label: 'Quality Performance', icon: UserRoundCheck, active: true },
  { id: 'dashboards', type: 'page', label: 'Dashboards', icon: LayoutDashboard },
  { id: 'search', type: 'page', label: 'Interaction Search', icon: DatabaseSearch },
  { id: 'settings', type: 'page', label: 'Settings', icon: Settings },
];

export default function SideNavigation({
  navItems = DEFAULT_NAV_ITEMS,
  minimized = false,
  triggerVisibility = 'always', // 'always' | 'hover'
  version = 'v1', // 'v1' | 'v2'
  onToggle,
}) {
  // displayMinimized drives what's rendered inside the panel.
  // On expand: switch to full content immediately so text reveals as the container grows.
  // On collapse: keep full content while the container shrinks (text clips out),
  //              then switch to icon-only once the width transition ends.
  const [displayMinimized, setDisplayMinimized] = useState(minimized);
  const [hovered, setHovered] = useState(false);
  const [toggleHovered, setToggleHovered] = useState(false);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    if (!minimized) setDisplayMinimized(false);
  }, [minimized]);

  const handleTransitionEnd = () => {
    if (minimized) setDisplayMinimized(true);
  };

  return (
    // Outer wrapper: overflow visible so the toggle button can hang outside the clipping boundary
    <div
      style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Clipping container: width transitions, hides overflowing text during animation */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: minimized ? 60 : 256,
          paddingTop: version === 'v2' ? 'var(--lyra-spacing-0)' : 'var(--lyra-spacing-2)',
          paddingBottom: 'var(--lyra-spacing-5)',
          paddingLeft: 'var(--lyra-spacing-3)',
          paddingRight: 'var(--lyra-spacing-3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: displayMinimized ? 'center' : 'flex-start',
          gap: displayMinimized ? 'var(--lyra-spacing-1)' : 'var(--lyra-spacing-0)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          transition: 'width 300ms ease',
        }}>
        {/* Nav items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: displayMinimized ? 36 : NAV_ROW_W,
          alignItems: displayMinimized ? 'center' : 'flex-start',
        }}>
          {version === 'v2' && (
            <>
              <NavV2Trigger
                minimized={minimized}
                onToggle={onToggle}
                triggerVisibility={triggerVisibility}
                hovered={hovered}
              />
              <NavDivider minimized={displayMinimized} />
            </>
          )}
          {navItems.map((item, i) =>
            item.type === 'group'
              ? <NavGroupItem key={i} label={item.label} minimized={displayMinimized}>{item.children}</NavGroupItem>
              : <NavPageItem key={i} label={item.label} icon={item.icon} active={item.active} badge={item.badge} minimized={displayMinimized} onClick={item.onClick} />
          )}
        </div>
      </div>

      {/* Toggle button — V1 only, positioned on the outer wrapper so it isn't clipped */}
      {version === 'v1' && <button
        ref={toggleBtnRef}
        onClick={onToggle}
        onMouseEnter={() => setToggleHovered(true)}
        onMouseLeave={() => setToggleHovered(false)}
        style={{
          position: 'absolute',
          right: -12,
          top: 24,
          width: '1.5rem', height: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none',
          cursor: 'pointer',
          zIndex: 1,
          padding: 0,
          opacity: triggerVisibility === 'hover' && !hovered ? 0 : 1,
          transition: 'opacity 150ms ease',
          pointerEvents: triggerVisibility === 'hover' && !hovered ? 'none' : 'auto',
        }}>
        <div style={{
          width: '1.25rem', height: '1.25rem', borderRadius: '50%',
          background: 'var(--lyra-color-bg-surface-base, #ffffff)',
          border: '1px solid var(--lyra-color-border-soft, rgba(0,0,0,0.16))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--lyra-color-fg-action)',
        }}>
          {minimized ? <ChevronRight size="0.75rem" /> : <ChevronLeft size="0.75rem" />}
        </div>
        {toggleHovered && (
          <Tooltip label={minimized ? 'Expand navigation' : 'Collapse navigation'} anchorRef={toggleBtnRef} />
        )}
      </button>}

      {/* Hover extension — keeps hover active when cursor moves toward the trigger button */}
      {version === 'v1' && <div aria-hidden style={{
        position: 'absolute',
        top: 0, bottom: 0,
        right: '-0.75rem',
        width: '0.75rem',
      }} />}
    </div>
  );
}

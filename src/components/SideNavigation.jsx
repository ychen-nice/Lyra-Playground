import React, { useState, useEffect } from 'react';

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

const CollapseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
    <path d="M11.5 7L8.5 10L11.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Sub-components ────────────────────────────────────────────────────────────

function NavBadge({ label = 'New' }) {
  return (
    <div style={{
      background: 'var(--lyra-color-accent-blue-strong, #2d5bb9)',
      color: 'var(--lyra-color-accent-blue-soft, #d6e4ff)',
      fontSize: 12, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.2px',
      padding: '0 8px', height: 20, borderRadius: 6,
      display: 'flex', alignItems: 'center', flexShrink: 0,
    }}>
      {label}
    </div>
  );
}

function NavPageItem({ label, active, badge, minimized, onClick }) {
  const [hovered, setHovered] = useState(false);

  if (minimized) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={label}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: active
            ? 'var(--lyra-color-bg-active-moderate, #d3e6fd)'
            : hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
          border: 'none', cursor: 'pointer', position: 'relative',
        }}>
        {active && (
          <span style={{
            position: 'absolute', left: 0, top: '28%', bottom: '28%',
            width: 2, background: 'var(--lyra-color-fg-active-strong, #185ba4)',
            borderRadius: 2,
          }} />
        )}
        <span style={{ display: 'flex', color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
          <PlaceholderIcon />
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 36, padding: '0 10px', width: '100%', flexShrink: 0,
        background: active
          ? 'var(--lyra-color-bg-active-moderate, #d3e6fd)'
          : hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
        border: 'none', borderRadius: 8, cursor: 'pointer',
        textAlign: 'left', position: 'relative',
      }}>
      {active && (
        <span style={{
          position: 'absolute', left: 0, top: '28%', bottom: '28%',
          width: 2, background: 'var(--lyra-color-fg-active-strong, #185ba4)',
          borderRadius: 2,
        }} />
      )}
      <span style={{ display: 'flex', flexShrink: 0, color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
        <PlaceholderIcon />
      </span>
      <span style={{
        fontSize: 14, lineHeight: '20px', flex: '1 0 0', minWidth: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
        fontWeight: active ? 500 : 400,
      }}>
        {label}
      </span>
      {badge && <NavBadge label={badge} />}
    </button>
  );
}

function NavGroupItem({ label, children: navChildren, minimized }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (minimized) {
    return (
      <button
        title={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
          border: 'none', cursor: 'pointer',
        }}>
        <span style={{ display: 'flex', color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))' }}>
          <PlaceholderIcon />
        </span>
      </button>
    );
  }

  return (
    <div style={{ width: '100%', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 36, padding: '0 10px', width: '100%',
          background: hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
          border: 'none', borderRadius: 8, cursor: 'pointer',
        }}>
        <span style={{ display: 'flex', color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))', flexShrink: 0 }}>
          <PlaceholderIcon />
        </span>
        <span style={{
          fontSize: 14, lineHeight: '20px', flex: '1 0 0', minWidth: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left',
          color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))', fontWeight: 400,
        }}>
          {label}
        </span>
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
              height: 36, paddingLeft: 20, paddingRight: 8,
              borderRadius: 8, position: 'relative',
            }}>
              <span style={{
                position: 'absolute', left: 10, top: 0, bottom: 0,
                width: 1, background: 'rgba(0,0,0,0.12)',
              }} />
              <span style={{
                fontSize: 14, lineHeight: '20px',
                color: 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                flex: '1 0 0', minWidth: 0,
              }}>
                {child}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SideNavigation ────────────────────────────────────────────────────────────

const DEFAULT_NAV_ITEMS = [
  { type: 'page', label: 'Page Name' },
  { type: 'page', label: 'Page Name', active: true },
  { type: 'group', label: 'Category Name' },
  { type: 'group', label: 'Category Name' },
  { type: 'group', label: 'Category Name', children: ['Page Name', 'Page Name', 'Page Name'] },
];

export default function SideNavigation({
  navItems = DEFAULT_NAV_ITEMS,
  minimized = false,
  onToggle,
}) {
  // displayMinimized drives what's rendered inside the panel.
  // On expand: switch to full content immediately so text reveals as the container grows.
  // On collapse: keep full content while the container shrinks (text clips out),
  //              then switch to icon-only once the width transition ends.
  const [displayMinimized, setDisplayMinimized] = useState(minimized);

  useEffect(() => {
    if (!minimized) setDisplayMinimized(false);
  }, [minimized]);

  const handleTransitionEnd = () => {
    if (minimized) setDisplayMinimized(true);
  };

  return (
    // Outer wrapper: overflow visible so the toggle button can hang outside the clipping boundary
    <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
      {/* Clipping container: width transitions, hides overflowing text during animation */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: minimized ? 60 : 256,
          paddingTop: 8,
          paddingBottom: 20,
          paddingLeft: 12,
          paddingRight: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: displayMinimized ? 'center' : 'flex-start',
          gap: displayMinimized ? 4 : 0,
          boxSizing: 'border-box',
          overflow: 'hidden',
          transition: 'width 300ms ease',
        }}>
        {/* Nav items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: displayMinimized ? 36 : 232,
          alignItems: displayMinimized ? 'center' : 'flex-start',
        }}>
          {navItems.map((item, i) =>
            item.type === 'group'
              ? <NavGroupItem key={i} label={item.label} minimized={displayMinimized}>{item.children}</NavGroupItem>
              : <NavPageItem key={i} label={item.label} active={item.active} badge={item.badge} minimized={displayMinimized} />
          )}
        </div>
      </div>

      {/* Toggle button — positioned on the outer wrapper so it isn't clipped */}
      <button
        onClick={onToggle}
        title={minimized ? 'Expand navigation' : 'Collapse navigation'}
        style={{
          position: 'absolute',
          right: -12,
          top: 24,
          width: 24, height: 24, borderRadius: 12,
          background: 'var(--lyra-color-bg-surface-base, #ffffff)',
          border: '1px solid var(--lyra-color-border-soft, rgba(0,0,0,0.16))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--lyra-color-fg-secondary, rgba(0,0,0,0.6))',
          transform: minimized ? 'rotate(180deg)' : 'none',
          transition: 'transform 300ms ease',
          zIndex: 1,
        }}>
        <CollapseIcon />
      </button>
    </div>
  );
}

import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/typography.css';

// Rendered via a portal into document.body so it always escapes ancestors with
// overflow:hidden (e.g. the side nav's collapse/expand animation container) —
// a tooltip positioned relative to a clipped ancestor would otherwise be cut off.
export default function Tooltip({ label, anchorRef, side = 'right' }) {
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (side === 'right') {
      setPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
    } else if (side === 'bottom') {
      setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    }
  }, [anchorRef, side]);

  if (!pos) return null;

  return createPortal(
    <div className="lyra-body-md" style={{
      position: 'fixed',
      top: pos.top,
      left: pos.left,
      transform: side === 'right' ? 'translateY(-50%)' : 'translateX(-50%)',
      background: 'var(--lyra-color-bg-surface-overlay)',
      color: 'var(--lyra-color-fg-default)',
      border: 'var(--lyra-border-default) solid var(--lyra-color-border-soft)',
      padding: 'var(--lyra-spacing-2) var(--lyra-spacing-3)',
      borderRadius: 'var(--lyra-radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--lyra-shadow-md)',
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      {label}
    </div>,
    document.body
  );
}

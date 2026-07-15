// Figma nodes:
//   2338:2710  Left panel slot — "opened"  (no shadow, pinned)
//   2338:2734  Left panel slot — "overlay" (shadow-xl, floating)
//   Panel header: padding 1.25rem top/bottom, 1.5rem sides

import { useState, useRef } from 'react';
import { PanelLeftClose } from 'lucide-react';
import Button from './Button';
import Tooltip from './Tooltip';

export default function InternalSidebar({ state = 'hidden', width = 256, isDragging = false, isTransitioning = false, onResizeStart, title = 'Dashboards', onPinClick, pinDisabled = false, onMouseEnter, onMouseLeave, children }) {
  const isHidden  = state === 'hidden';
  const isOverlay = state === 'overlay';
  const isOpened  = state === 'opened';

  const [handleHovered, setHandleHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const closeBtnRef = useRef(null);

  return (
    <div className="sidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{
      position:      'absolute',
      left:          '-1px',
      top:           '-1px',
      bottom:        '-1px',
      width:         `${width}px`,
      background:    'var(--lyra-color-bg-surface-container-subtle)',
      borderRight:   'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
      boxShadow:     isOverlay ? 'var(--lyra-shadow-xl)' : 'none',
      zIndex:        10,
      transform:     isHidden ? 'translateX(-100%)' : 'translateX(0)',
      // Width transition is suppressed during drag so it tracks the handle live.
      transition:    isDragging ? 'box-shadow 300ms ease' : 'transform 300ms ease, box-shadow 300ms ease',
      display:       'flex',
      flexDirection: 'column',
    }}>

      {/* Panel header — 1.25rem top/bottom padding, 1.5rem left / spacing-5 right padding */}
      <div className="sidebar-header" style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        minHeight:      '4.5rem',
        paddingTop:     0,
        paddingBottom:  0,
        paddingLeft:    '1.5rem',
        paddingRight:   'var(--lyra-spacing-5)',
        flexShrink:     0,
      }}>
        <span className="lyra-heading-md" style={{ color: 'var(--lyra-color-fg-default)' }}>
          {title}
        </span>

        {(isOpened || isTransitioning) && onPinClick && (
          <span
            ref={closeBtnRef}
            style={{ display: 'inline-flex', visibility: isOpened ? 'visible' : 'hidden' }}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
          >
            <Button
              variant="ghost"
              size="md"
              onClick={onPinClick}
              aria-label="Close dashboards sidebar"
            >
              <PanelLeftClose size={16} />
            </Button>
            {closeHovered && isOpened && <Tooltip label="Close dashboards sidebar" anchorRef={closeBtnRef} side="bottom" />}
          </span>
        )}
      </div>

      {/* Panel body */}
      <div className="sidebar-body" style={{
        flex:          '1 0 0',
        display:       'flex',
        flexDirection: 'column',
        gap:           'var(--lyra-spacing-3)',
        alignItems:    'flex-start',
        padding:       '0 var(--lyra-spacing-6)',
        minHeight:     '1px',
        position:      'relative',
        width:         '100%',
        boxSizing:     'border-box',
        overflowY:     'auto',
      }}>
        {children}
      </div>

      {/* Resize handle — 8px hit area on the right border, 2px visual line on hover/drag */}
      <div
        onPointerDown={onResizeStart}
        onMouseEnter={() => setHandleHovered(true)}
        onMouseLeave={() => setHandleHovered(false)}
        style={{
          position: 'absolute',
          right:    0,
          top:      0,
          bottom:   0,
          width:    8,
          cursor:   'col-resize',
          zIndex:   2,
          display:  'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{
          width:      2,
          background: (handleHovered || isDragging)
            ? 'var(--lyra-color-accent-blue-strong, #3b82f6)'
            : 'transparent',
          transition: 'background 120ms',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

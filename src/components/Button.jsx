import React, { useState } from 'react';
import '../styles/button.css';

const VARIANT_STYLES = {
  primary: {
    bg:      'var(--lyra-color-bg-primary)',
    bgHover: 'var(--lyra-color-state-bg-hover-primary)',
    bgPress: 'var(--lyra-color-state-bg-pressed-primary)',
    color:   'var(--lyra-color-fg-on-primary)',
    border:  'none',
  },
  secondary: {
    bg:      'var(--lyra-color-bg-secondary)',
    bgHover: 'var(--lyra-color-state-bg-hover-secondary)',
    bgPress: 'var(--lyra-color-state-bg-pressed-secondary)',
    color:   'var(--lyra-color-fg-action)',
    border:  '1px solid var(--lyra-color-border-soft)',
  },
  ghost: {
    bg:      'transparent',
    bgHover: 'var(--lyra-color-state-bg-hover-opacity)',
    bgPress: 'var(--lyra-color-state-bg-pressed-opacity)',
    color:   'var(--lyra-color-fg-action)',
    border:  'none',
  },
  destructive: {
    bg:      'var(--lyra-color-bg-destructive)',
    bgHover: 'var(--lyra-color-state-bg-hover-critical-strong)',
    bgPress: 'var(--lyra-color-state-bg-pressed-critical-strong)',
    color:   'var(--lyra-color-fg-on-destructive)',
    border:  'none',
  },
};

const SIZE_STYLES = {
  sm: {
    height:        'var(--lyra-control-height-sm)',
    padding:       '0 var(--lyra-spacing-2)',
    iconPx:        12,
    minWidth:      '4rem',
    borderRadius:  'var(--lyra-radius-sm)',
    fontSize:      '0.75rem',
    fontWeight:    500,
    lineHeight:    '1rem',
    letterSpacing: '0.01rem',
  },
  md: {
    height:        'var(--lyra-control-height-md)',
    padding:       '0 var(--lyra-spacing-3)',
    iconPx:        16,
    minWidth:      '5rem',
    borderRadius:  'var(--lyra-radius-md)',
    fontSize:      '0.875rem',
    fontWeight:    500,
    lineHeight:    '1.25rem',
    letterSpacing: '0',
  },
  lg: {
    height:        'var(--lyra-control-height-lg)',
    padding:       '0 var(--lyra-spacing-4)',
    iconPx:        16,
    minWidth:      '5rem',
    borderRadius:  'var(--lyra-radius-md)',
    fontSize:      '0.875rem',
    fontWeight:    500,
    lineHeight:    '1.25rem',
    letterSpacing: '0',
  },
};

export default function Button({
  variant      = 'primary',
  size         = 'md',
  iconOnly     = false,
  leftIcon,
  rightIcon,
  disabled     = false,
  forcePressed = false,
  onClick,
  onMouseEnter: externalMouseEnter,
  onMouseLeave: externalMouseLeave,
  children,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const v = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;
  const s = SIZE_STYLES[size]       ?? SIZE_STYLES.md;

  const bg = disabled
    ? (variant === 'ghost' ? 'transparent' : 'var(--lyra-color-bg-disabled)')
    : (pressed || forcePressed) ? v.bgPress
    : hovered ? v.bgHover
    : v.bg;

  const color  = disabled ? 'var(--lyra-color-fg-disabled)' : v.color;
  const border = disabled ? 'none' : v.border;

  const sizedIcon = (icon) =>
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon, { size: s.iconPx })
      : icon;

  return (
    <button
      className="lyra-btn"
      disabled={disabled}
      onClick={onClick}
      {...rest}
      onMouseEnter={e => { if (!disabled) setHovered(true); externalMouseEnter?.(e); }}
      onMouseLeave={e => { if (!disabled) { setHovered(false); setPressed(false); } externalMouseLeave?.(e); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => { if (!disabled) setPressed(false); }}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            iconOnly ? 0 : (size === 'sm' || variant === 'ghost') ? 'var(--lyra-spacing-1)' : 'var(--lyra-spacing-2)',
        height:         s.height,
        width:          iconOnly ? s.height : undefined,
        padding:        iconOnly ? 0 : (variant === 'ghost' ? '0 var(--lyra-spacing-2)' : s.padding),
        minWidth:       iconOnly ? undefined : (variant === 'ghost' ? undefined : s.minWidth),
        borderRadius:   s.borderRadius,
        border,
        background:     bg,
        color,
        cursor:         disabled ? 'not-allowed' : 'pointer',
        userSelect:     'none',
        whiteSpace:     'nowrap',
        boxSizing:      'border-box',
        fontFamily:     'Inter, sans-serif',
        fontSize:       s.fontSize,
        fontWeight:     s.fontWeight,
        lineHeight:     s.lineHeight,
        letterSpacing:  s.letterSpacing,
        transition:     'background 120ms ease',
        flexShrink:     0,
      }}
    >
      {iconOnly
        ? sizedIcon(children)
        : <>{leftIcon && sizedIcon(leftIcon)}{children}{rightIcon && sizedIcon(rightIcon)}</>
      }
    </button>
  );
}

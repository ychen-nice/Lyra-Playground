import { cloneElement } from 'react';
import '../styles/typography.css';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=17780-58157
//
// type='label'   — text (+ optional leading/trailing icon), rounded rect, no
//                  border. Only 'large' and 'medium' sizes exist for this type
//                  — 'small' falls back to 'large' below.
// type='counter' — a number/short string in a circular pill, bordered.
// type='icon'    — a single icon in a circular pill, bordered, no padding.
//
// color/colorStyle select the accent-{color}-{colorStyle}-bg/fg token pair
// (see tokens.js's Accent section) — 'subtle' is a tinted bg + readable text,
// 'strong' is a solid, saturated bg + light text.

// No named typography class at 10px — the smallest size in the type scale is
// 12px — so counter's 'small' size sets Inter explicitly rather than relying
// on a class.
const TINY_TEXT_STYLE = { fontFamily: 'Inter, sans-serif', fontSize: 10, lineHeight: '16px', fontWeight: 500, letterSpacing: '0.2px' };

const LABEL_SIZES = {
  large:  { height: 'var(--lyra-control-height-sm)', minWidth: 24, iconSize: 16, textClass: 'lyra-body-md-em' },
  medium: { height: 'var(--lyra-control-height-xs)', minWidth: 20, iconSize: 12, textClass: 'lyra-body-sm-em' },
};

const COUNTER_SIZES = {
  large:  { height: 'var(--lyra-control-height-sm)',  minWidth: 24, textClass: 'lyra-body-md-em' },
  medium: { height: 'var(--lyra-control-height-xs)',  minWidth: 20, textClass: 'lyra-body-sm-em' },
  small:  { height: 'var(--lyra-control-height-2xs)', minWidth: 16, textStyle: TINY_TEXT_STYLE },
};

const ICON_SIZES = {
  large:  { height: 'var(--lyra-control-height-sm)',  minWidth: 24, iconSize: 16 },
  medium: { height: 'var(--lyra-control-height-xs)',  minWidth: 20, iconSize: 12 },
  small:  { height: 'var(--lyra-control-height-2xs)', minWidth: 16, iconSize: 12 },
};

export default function Badge({
  color = 'slate',
  colorStyle = 'subtle',
  size = 'large', // 'large' | 'medium' | 'small'
  type = 'label', // 'label' | 'counter' | 'icon'
  leadingIcon,
  trailingIcon,
  icon,
  children,
}) {
  const bg = `var(--lyra-color-accent-${color}-${colorStyle}-bg)`;
  const fg = `var(--lyra-color-accent-${color}-${colorStyle}-fg)`;
  // Strong badges sit on a saturated fill, so they use an inverse (light) border
  // for definition; subtle badges sit near-white and use the neutral border.
  const borderColor = colorStyle === 'strong' ? 'var(--lyra-color-border-inverse)' : 'var(--lyra-color-border-subtle)';

  if (type === 'label') {
    const s = LABEL_SIZES[size] ?? LABEL_SIZES.large;
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 'var(--lyra-spacing-1)',
        height: s.height,
        minWidth: s.minWidth,
        padding: '0 6px',
        borderRadius: 'var(--lyra-radius-sm)',
        background: bg,
        boxSizing: 'border-box',
      }}>
        {leadingIcon && (
          <span style={{ display: 'flex', flexShrink: 0, width: s.iconSize, height: s.iconSize, color: fg }}>
            {cloneElement(leadingIcon, { size: '100%' })}
          </span>
        )}
        <span className={s.textClass} style={{ color: fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...(s.textStyle ?? {}) }}>
          {children}
        </span>
        {trailingIcon && (
          <span style={{ display: 'flex', flexShrink: 0, width: s.iconSize, height: s.iconSize, color: fg }}>
            {cloneElement(trailingIcon, { size: '100%' })}
          </span>
        )}
      </div>
    );
  }

  if (type === 'icon') {
    const s = ICON_SIZES[size] ?? ICON_SIZES.large;
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: s.height,
        width: s.height,
        minWidth: s.minWidth,
        borderRadius: 'var(--lyra-radius-round)',
        background: bg,
        border: `1px solid ${borderColor}`,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {icon && (
          <span style={{ display: 'flex', flexShrink: 0, width: s.iconSize, height: s.iconSize, color: fg }}>
            {cloneElement(icon, { size: '100%' })}
          </span>
        )}
      </div>
    );
  }

  // type === 'counter'
  const s = COUNTER_SIZES[size] ?? COUNTER_SIZES.large;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      height: s.height,
      minWidth: s.minWidth,
      padding: '0 var(--lyra-spacing-1)',
      borderRadius: 'var(--lyra-radius-round)',
      background: bg,
      border: `1px solid ${borderColor}`,
      boxSizing: 'border-box',
    }}>
      <span
        className={s.textClass}
        style={{ color: fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...(s.textStyle ?? {}) }}
      >
        {children}
      </span>
    </div>
  );
}

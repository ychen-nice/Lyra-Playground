import { useState, useRef, useReducer, useEffect, useLayoutEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import '../styles/breadcrumb.css';
import Button from './Button';

// Renders a single level label or link (without the trailing separator)
function BreadcrumbItem({ label, item, className = 'lyra-body-lg' }) {
  const isLink = item?.type === 'link' && item?.href;

  if (isLink) {
    return (
      <a href={item.href} className={`${className} lyra-breadcrumb-link`} style={{ whiteSpace: 'nowrap' }}>
        {label}
      </a>
    );
  }
  return (
    <span className={className} style={{ color: 'var(--lyra-color-fg-secondary)', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

function Sep() {
  return <span style={{ color: 'var(--lyra-color-fg-default)', flexShrink: 0 }}>/</span>;
}

function LevelWithSep({ label, item, itemClassName = 'lyra-body-lg' }) {
  return (
    <span style={{ display: 'inline-flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>
      <BreadcrumbItem label={label} item={item} className={itemClassName} />
      <Sep />
    </span>
  );
}

function MenuItem({ label, item, onClose }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bg = pressed
    ? 'var(--lyra-color-state-bg-pressed-opacity)'
    : hovered
      ? 'var(--lyra-color-state-bg-hover-opacity)'
      : 'transparent';

  const handleClick = () => {
    if (item?.type === 'link' && item?.href) {
      window.location.href = item.href;
    }
    onClose();
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="lyra-body-md"
      style={{
        display:      'flex',
        alignItems:   'center',
        height:       'var(--lyra-row-height-sm)',
        padding:      '0 var(--lyra-spacing-3)',
        borderRadius: 'var(--lyra-radius-md)',
        background:   bg,
        color:        'var(--lyra-color-fg-default)',
        whiteSpace:   'nowrap',
        cursor:       item?.type === 'link' && item?.href ? 'pointer' : 'default',
        userSelect:   'none',
        outline:      'none',
        margin:       '0 var(--lyra-spacing-1)',
      }}
    >
      {label}
    </div>
  );
}

function CollapseMenu({ collapsedLevels, collapsedItems }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!btnRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen(o => !o);
  };

  return (
    <span style={{ display: 'inline-flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center', flexShrink: 0 }}>
      <span ref={btnRef} style={{ position: 'relative', display: 'inline-flex' }}>
        <Button
          variant="ghost"
          size="md"
          iconOnly
          forcePressed={open}
          onClick={toggle}
          aria-label="Show hidden breadcrumb levels"
        >
          <Ellipsis size={16} />
        </Button>

        {open && pos && (
          <div
            role="menu"
            style={{
              position:     'fixed',
              top:          pos.top,
              left:         pos.left,
              zIndex:       1000,
              background:   'var(--lyra-color-bg-surface-base)',
              border:       'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
              borderRadius: 'var(--lyra-radius-md)',
              padding:      'var(--lyra-spacing-1) 0',
              minWidth:     140,
              boxShadow:    'var(--lyra-shadow-md)',
              display:      'flex',
              flexDirection:'column',
            }}
          >
            {collapsedLevels.map((label, i) => (
              <MenuItem
                key={i}
                label={label}
                item={collapsedItems[i]}
                onClose={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </span>
      <Sep />
    </span>
  );
}

// Collapse modes:
//   'all'              → every level shown (n ≤ 3 when space allows, or no availableWidth)
//   'l1-parent-current'→ L1 / [menu] / last /
//   'parent-current'   →      [menu] / last /
//   'current-only'     →      [menu] /
//
// Responsive rules:
//   n > 3 (n ≥ 4)      → always responsive (never shows 'all'; menu always present)
//   n ≤ 3              → responsive only when availableWidth is provided; shows 'all' when space allows
//
// availableWidth is supplied by the parent (PageHeader or Breadcrumb component) which
// measures the space externally, avoiding the circular dependency of sizing against self.
export default function BreadcrumbBar({ levels, items = [], availableWidth, itemClassName = 'lyra-body-lg' }) {
  const n           = levels.length;
  const measureRef  = useRef(null);
  const thresholds  = useRef(null);
  const [, remeasure] = useReducer(x => x + 1, 0);

  // needsResponsive: true when collapse thresholds must be computed
  //   n > 3: always   |   n ≤ 3: only when a width constraint is provided
  const needsResponsive = n > 3 || (n > 1 && availableWidth != null);

  // Measure text widths once per levels change and store thresholds in a ref.
  // No setState here — just ref + remeasure() so we don't re-run on every resize.
  // Measurement spans: [label_0, label_1, …, label_n-1, sep, menuPlaceholder]
  useLayoutEffect(() => {
    if (!needsResponsive) return;
    const ms = measureRef.current;
    if (!ms || ms.children.length < n + 2) return;

    const spans  = ms.children;
    const wSep   = spans[n].getBoundingClientRect().width;
    const MENU_W = 32; // ghost md iconOnly button natural width
    const gap    = 8;  // spacing-2

    let next;
    if (n > 3) {
      const wFirst  = spans[0].getBoundingClientRect().width;
      const wParent = spans[n - 1].getBoundingClientRect().width;
      // 3 units (first, menu, last) × (label + gap + sep) + 2 inter-unit gaps
      const w1 = wFirst + wParent + MENU_W + wSep * 3 + gap * 5;
      // 2 units (menu, last) + 1 inter-unit gap
      const w2 = wParent + MENU_W + wSep * 2 + gap * 3;
      next = { n, w1, w2 };
    } else {
      // n ≤ 3 — measure every label so we can compute wAll
      let sumLabels = 0;
      for (let i = 0; i < n; i++) sumLabels += spans[i].getBoundingClientRect().width;
      const wFirst  = spans[0].getBoundingClientRect().width;
      const wParent = spans[n - 1].getBoundingClientRect().width;
      // wAll: n LevelWithSep units + (n-1) inter-unit gaps
      //   unit = label + gap + sep  →  sum = sumLabels + n*(gap + wSep) + (n-1)*gap
      next = {
        n,
        wAll:       sumLabels + n * (wSep + gap) + (n - 1) * gap,
        wFirstLast: wFirst + wParent + MENU_W + wSep * 3 + gap * 5,
        wLastOnly:  wParent + MENU_W + wSep * 2 + gap * 3,
      };
    }

    const prev    = thresholds.current;
    const changed = !prev || Object.keys(next).some(k => prev[k] !== next[k]);
    if (changed) { thresholds.current = next; remeasure(); }
  }, [n, levels, needsResponsive]);

  // Mode computed synchronously during render — no extra cycle on resize.
  let mode;
  if (!needsResponsive) {
    mode = 'all'; // n ≤ 3 with no availableWidth: always show everything
  } else if (n > 3) {
    mode = 'l1-parent-current'; // default until thresholds are ready
    if (thresholds.current && availableWidth != null) {
      const { w1, w2 } = thresholds.current;
      if      (availableWidth >= w1) mode = 'l1-parent-current';
      else if (availableWidth >= w2) mode = 'parent-current';
      else                           mode = 'current-only';
    }
  } else {
    // n ≤ 3 with availableWidth
    mode = 'all'; // default until thresholds are ready
    if (thresholds.current && availableWidth != null) {
      const { wAll, wFirstLast, wLastOnly } = thresholds.current;
      if      (availableWidth >= wAll)                   mode = 'all';
      else if (n >= 4 && availableWidth >= wFirstLast)   mode = 'l1-parent-current'; // n-2 ≥ 2 items in menu
      else if (n >= 3 && availableWidth >= wLastOnly)    mode = 'parent-current';    // n-1 ≥ 2 items in menu
      else                                               mode = 'current-only';      // n ≥ 2 items in menu
    }
  }

  const first  = levels[0];
  const parent = levels[n - 1];

  const collapsed = ({
    'all':               { labels: [],                    startIdx: 0 },
    'l1-parent-current': { labels: levels.slice(1, n - 1), startIdx: 1 },
    'parent-current':    { labels: levels.slice(0, n - 1), startIdx: 0 },
    'current-only':      { labels: levels.slice(0, n),     startIdx: 0 },
  })[mode];

  const collapsedItems = collapsed.labels.map((_, i) => items[collapsed.startIdx + i]);

  // Measurement div — always n label spans + sep + menu placeholder
  const measureDiv = needsResponsive ? (
    <div
      ref={measureRef}
      aria-hidden
      style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', display: 'flex', gap: 'var(--lyra-spacing-2)', alignItems: 'center' }}
    >
      {levels.map((label, i) => (
        <span key={i} className={itemClassName} style={{ whiteSpace: 'nowrap' }}>{label}</span>
      ))}
      <span style={{ color: 'var(--lyra-color-fg-default)' }}>/</span>
      <span style={{ width: 32, display: 'inline-block' }} />
    </div>
  ) : null;

  // 'all' mode — show every level (simple path, same as original n ≤ 4 render)
  if (mode === 'all') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)', flexShrink: 0 }}>
        {measureDiv}
        {levels.map((label, i) => (
          <LevelWithSep key={i} label={label} item={items[i]} itemClassName={itemClassName} />
        ))}
      </div>
    );
  }

  // Collapsed modes
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)', flexShrink: 0 }}>
      {measureDiv}

      {mode === 'l1-parent-current' && (
        <>
          <LevelWithSep label={first} item={items[0]} itemClassName={itemClassName} />
          <CollapseMenu collapsedLevels={collapsed.labels} collapsedItems={collapsedItems} />
          <LevelWithSep label={parent} item={items[n - 1]} itemClassName={itemClassName} />
        </>
      )}

      {mode === 'parent-current' && (
        <>
          <CollapseMenu collapsedLevels={collapsed.labels} collapsedItems={collapsedItems} />
          <LevelWithSep label={parent} item={items[n - 1]} itemClassName={itemClassName} />
        </>
      )}

      {mode === 'current-only' && (
        <CollapseMenu collapsedLevels={collapsed.labels} collapsedItems={collapsedItems} />
      )}
    </div>
  );
}

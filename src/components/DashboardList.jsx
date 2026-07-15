import { useState } from 'react';
import '../styles/typography.css';
import TruncatedLabel from './TruncatedLabel';

export const DEFAULT_DASHBOARD_NAMES = [
  'Overview',
  'Queue Health',
  'Agent Performance',
  'SLA Tracker',
  'Escalations',
  'CSAT Trends',
  'Staffing Forecast',
  'Anomaly Log',
];

// Same look and interaction as a side nav page item (hover/pressed contrast bar, active
// bar + tint, radius-md) — but icon-less and set at row-height-sm, since this list lives
// inside the content sidebar rather than the main nav.
function DashboardListItem({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center',
        height: 'var(--lyra-row-height-sm)', padding: '0 10px', width: '100%', flexShrink: 0,
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
      <TruncatedLabel className={active ? 'lyra-body-md-em' : 'lyra-body-md'} style={{
        flex: '1 0 0', minWidth: 0,
        color: active ? 'var(--lyra-color-fg-active-strong, #185ba4)' : 'var(--lyra-color-fg-default, rgba(0,0,0,0.8))',
      }}>
        {label}
      </TruncatedLabel>
    </button>
  );
}

export default function DashboardList({
  items = DEFAULT_DASHBOARD_NAMES,
  defaultActiveIndex = 0,
  // Optional controlled mode — a parent (e.g. Shell, to mirror the selection into the
  // page header) can pass activeIndex to own the selection outright. Uncontrolled by
  // default so the standalone stories work without any wiring.
  activeIndex: controlledIndex,
  onSelect,
}) {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledIndex ?? internalIndex;

  const handleSelect = (i) => {
    setInternalIndex(i);
    onSelect?.(items[i], i);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexShrink: 0 }}>
      {items.map((label, i) => (
        <DashboardListItem
          key={label}
          label={label}
          active={i === activeIndex}
          onClick={() => handleSelect(i)}
        />
      ))}
    </div>
  );
}

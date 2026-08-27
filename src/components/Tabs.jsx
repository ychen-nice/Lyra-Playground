import { useState, cloneElement } from 'react';
import { AlertCircle } from 'lucide-react';
import '../styles/typography.css';
import '../styles/tabs.css';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=16950-30983
// Reserved at every state (not just selected/hover) so the label never shifts
// vertically when the border-bottom appears or disappears.
const INDICATOR_HEIGHT = 'var(--lyra-border-lg)'; // 4px

function TabItem({ item, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const { label, icon, disabled, error } = item;

  const color = disabled
    ? 'var(--lyra-color-fg-disabled)'
    : selected ? 'var(--lyra-color-fg-active-strong)' : 'var(--lyra-color-fg-default)';

  const indicatorColor = selected
    ? 'var(--lyra-color-border-active)'
    : hovered && !disabled ? 'var(--lyra-color-border-strong)' : 'transparent';

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="lyra-tab"
      style={{
        flex: 'var(--lyra-tab-flex, none)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--lyra-spacing-2)',
        height: 'var(--lyra-row-height-xl)',
        padding: '0 var(--lyra-spacing-5)',
        border: 'none',
        borderBottom: `${INDICATOR_HEIGHT} solid ${indicatorColor}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {icon && (
        <span style={{ display: 'flex', flexShrink: 0, width: 'var(--lyra-icon-size-sm)', height: 'var(--lyra-icon-size-sm)', color }}>
          {cloneElement(icon, { size: '100%' })}
        </span>
      )}
      <span className={selected ? 'lyra-body-md-em' : 'lyra-body-md'} style={{ color }}>
        {label}
      </span>
      {error && (
        <span style={{ display: 'flex', flexShrink: 0, color: 'var(--lyra-color-status-critical-strong)' }}>
          <AlertCircle size={14} />
        </span>
      )}
    </button>
  );
}

export default function Tabs({
  items = [],
  value: controlledValue,
  defaultValue,
  onChange,
  // 'left' — tabs sized to their own content, left-aligned (default).
  // 'fit'  — tabs stretch to divide the full width evenly.
  alignment = 'left',
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.id);
  const value = controlledValue ?? internalValue;

  const handleSelect = (id) => {
    setInternalValue(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        width: alignment === 'fit' ? '100%' : 'auto',
        borderBottom: '1px solid var(--lyra-color-border-subtle)',
        // Only the 'fit' tabs stretch — TabItem reads this via the
        // --lyra-tab-flex custom property rather than a prop, so the flex
        // rule lives in one place (here) instead of being threaded through
        // every item.
        '--lyra-tab-flex': alignment === 'fit' ? '1 0 0' : 'none',
      }}
    >
      {items.map((item) => (
        <TabItem key={item.id} item={item} selected={item.id === value} onSelect={handleSelect} />
      ))}
    </div>
  );
}

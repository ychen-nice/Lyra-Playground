import { cloneElement } from 'react';
import { ChevronDown, X, AlertCircle } from 'lucide-react';
import Button from './Button';
import '../styles/typography.css';
import '../styles/queryChip.css';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=17074-36807
//
// One filter condition in a query/filter bar: "Filter: Value ✕". Once a chip
// has a filter picked, the filter name itself is fixed — only the operator
// and value stay interactive dropdown triggers — except in the 'inactiveShort'
// step, which IS the filter picker itself (shown before a filter is chosen).
//
// status:
//   'inactive'     — filter chosen, operator/value not yet set ("select...")
//   'inactiveShort'— nothing chosen yet; only the filter picker + remove (marked
//                    "(planned)" in Figma — included for completeness)
//   'active'       — fully configured, highlighted (brand) styling
//   'error'        — invalid config — critical styling + a small error badge
//   'readOnly'     — fully configured but not editable, no remove button
//   'disabled'     — inert placeholder (marked "(planned)" in Figma)
//
// Figma's static "focus frame" overlays aren't reproduced as boolean props —
// the interactive segments and remove button are real <button>s, so keyboard
// focus is the genuine :focus-visible outline already used across this
// project (see queryChip.css / button.css), not a simulated prop.

function Chevron({ color }) {
  return <ChevronDown size={12} style={{ flexShrink: 0, color }} />;
}

// A clickable "text + chevron" trigger (filter/operator/value) — a real
// button so it's keyboard-focusable, styled to sit flush inside the chip.
// flavor picks the hover/pressed background (see queryChip.css) that matches
// the chip's own status — neutral (inactive), active, or error.
function Segment({ label, color, onClick, chevron = true, flavor = 'neutral' }) {
  return (
    <button
      type="button"
      className={`lyra-query-chip-segment lyra-query-chip-segment--${flavor} lyra-body-md`}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-1)',
        height: 'var(--lyra-control-height-md)',
        padding: '0 var(--lyra-spacing-2)',
        color,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {chevron && <Chevron />}
    </button>
  );
}

// Same visual shape as Segment but non-interactive (readOnly/disabled).
function StaticSegment({ label, color, chevron = false }) {
  return (
    <span
      className="lyra-body-md"
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-1)',
        height: 'var(--lyra-control-height-md)',
        padding: '0 var(--lyra-spacing-2)',
        color,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {chevron && <Chevron />}
    </span>
  );
}

const STATUS_STYLES = {
  inactive:      { background: 'var(--lyra-color-bg-control-subtle)', border: 'var(--lyra-color-border-soft)' },
  inactiveShort: { background: 'var(--lyra-color-bg-control-subtle)', border: 'var(--lyra-color-border-soft)' },
  active:        { background: 'var(--lyra-color-bg-active-subtle)', border: 'var(--lyra-color-border-active)' },
  error:         { background: 'var(--lyra-color-status-critical-subtle)', border: 'var(--lyra-color-status-critical-strong)' },
  readOnly:      { background: 'var(--lyra-color-bg-none)', border: 'var(--lyra-color-border-soft)' },
  disabled:      { background: 'var(--lyra-color-bg-disabled)', border: null },
};

export default function QueryChip({
  status = 'inactive',
  filterName = 'Filter',
  // Shows a red "*" next to the filter name — only meaningful while the
  // filter itself is still being picked (inactiveShort).
  mandatory = false,
  showIcon = false,
  icon,
  showOperator = false,
  operator = 'Equal',
  value = 'select...',
  removable = true,
  onFilterClick,
  onOperatorClick,
  onValueClick,
  onRemove,
}) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.inactive;
  const isActive = status === 'active';
  const isError = status === 'error';
  const isReadOnly = status === 'readOnly';
  const isDisabled = status === 'disabled';
  const isInactiveShort = status === 'inactiveShort';
  const isInactive = status === 'inactive';

  // Filter/operator/value text color — active & error both use their own
  // strong accent color instead of the default text color.
  const emphasisColor = isError
    ? 'var(--lyra-color-status-critical-strong)'
    : isActive
      ? 'var(--lyra-color-fg-active-strong)'
      : isDisabled
        ? 'var(--lyra-color-fg-disabled)'
        : 'var(--lyra-color-fg-default)';

  const showRemove = removable && ['inactive', 'inactiveShort', 'active', 'error'].includes(status);
  // Segment hover/pressed flavor — matches the chip's own accent so the fill
  // reads as part of the same chip rather than a generic gray highlight.
  const flavor = isError ? 'error' : isActive ? 'active' : 'neutral';

  return (
    // Outer wrapper is unclipped so the error badge (positioned outside the
    // chip's own box) isn't cut off by the chip's own overflow:hidden below,
    // which exists so each segment's hover/pressed fill respects the chip's
    // rounded corners instead of spilling past them as a hard rectangle.
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {isError && (
        <span style={{
          position: 'absolute', left: -6, top: -6, display: 'flex', zIndex: 1,
          color: 'var(--lyra-color-status-critical-strong)',
          background: 'var(--lyra-color-bg-surface-base)', borderRadius: 'var(--lyra-radius-round)',
        }}>
          <AlertCircle size={12} fill="var(--lyra-color-status-critical-strong)" stroke="var(--lyra-color-bg-surface-base)" />
        </span>
      )}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        height: 'var(--lyra-control-height-md)',
        maxWidth: 480,
        borderRadius: 'var(--lyra-radius-md)',
        background: s.background,
        border: s.border ? `1px solid ${s.border}` : 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
      {showIcon && icon && (
        <span style={{ display: 'flex', flexShrink: 0, width: 16, height: 16, marginLeft: 'var(--lyra-spacing-2)', color: emphasisColor }}>
          {cloneElement(icon, { size: '100%' })}
        </span>
      )}

      {/* Filter name — fixed/read-only once a filter is chosen; only the
          inactiveShort picker step lets you change it. */}
      {isInactiveShort ? (
        <Segment
          label={<>{filterName}{mandatory && <span style={{ color: 'var(--lyra-color-status-critical-strong)' }}> *</span>}</>}
          color="var(--lyra-color-fg-default)"
          onClick={onFilterClick}
          flavor="neutral"
        />
      ) : isDisabled ? (
        <span style={{
          display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-1)',
          padding: '0 var(--lyra-spacing-2)', whiteSpace: 'nowrap',
        }}>
          <span className="lyra-body-md-em" style={{ color: emphasisColor }}>{filterName}</span>
          <Chevron color={emphasisColor} />
        </span>
      ) : (
        <>
          <span className="lyra-body-md-em" style={{ color: emphasisColor, padding: '0 0 0 var(--lyra-spacing-2)', whiteSpace: 'nowrap' }}>
            {filterName}
          </span>
          <span className="lyra-body-md-em" style={{ color: emphasisColor, padding: '0 var(--lyra-spacing-1) 0 0' }}>:</span>
        </>
      )}

      {/* Operator — interactive for inactive/active/error, plain text for
          readOnly, never shown for disabled/inactiveShort. */}
      {showOperator && !isDisabled && !isInactiveShort && (
        isReadOnly
          ? <StaticSegment label={operator} color="var(--lyra-color-fg-default)" />
          : <Segment label={operator} color={emphasisColor} onClick={onOperatorClick} flavor={flavor} />
      )}

      {/* Value — interactive for inactive/active/error, plain (still shows a
          chevron per the design) for readOnly, never shown for disabled/inactiveShort. */}
      {!isDisabled && !isInactiveShort && (
        isReadOnly
          ? <StaticSegment label={value} color="var(--lyra-color-fg-default)" chevron />
          : <Segment label={value} color={isInactive ? 'var(--lyra-color-fg-default)' : emphasisColor} onClick={onValueClick} flavor={flavor} />
      )}

      {showRemove && (
        <span style={{ display: 'flex', alignItems: 'center', paddingRight: 'var(--lyra-spacing-1)' }}>
          <Button variant="ghost" size="sm" iconOnly aria-label={`Remove ${filterName} filter`} onClick={onRemove}>
            <X />
          </Button>
        </span>
      )}
      </div>
    </div>
  );
}

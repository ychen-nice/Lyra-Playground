import '../styles/typography.css';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=17885-54934
export default function Panel({
  title,
  actionsSlot,
  children,
  // true = bordered card with a tinted toolbar and rounded corners.
  // false = frameless — no border/radius/background, toolbar is a plain
  // bottom-bordered strip flush with its surroundings.
  showFrame = true,
  showToolbar = true,
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'stretch',
      height: '100%',
      background: showFrame ? 'var(--lyra-color-bg-surface-base)' : 'var(--lyra-color-bg-none)',
      border: showFrame ? '1px solid var(--lyra-color-border-subtle)' : 'none',
      borderRadius: showFrame ? 'var(--lyra-radius-lg)' : 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {showToolbar && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-6)',
          height: '3.5rem',
          padding: '0 var(--lyra-spacing-4)',
          background: showFrame ? 'var(--lyra-color-bg-control-subtle)' : 'var(--lyra-color-bg-none)',
          borderBottom: '1px solid var(--lyra-color-border-subtle)',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}>
          <div style={{ flex: '1 0 0', minWidth: 0 }}>
            <span className="lyra-body-md-em" style={{
              display: 'block', color: 'var(--lyra-color-fg-default)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {title}
            </span>
          </div>
          {actionsSlot && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-4)', flexShrink: 0 }}>
              {actionsSlot}
            </div>
          )}
        </div>
      )}
      <div style={{ flex: '1 0 0', minHeight: 0, position: 'relative', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

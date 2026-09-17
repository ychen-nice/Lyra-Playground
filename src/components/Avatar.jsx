import '../styles/typography.css';

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=19899-65948
// (the profile circle inside _shellbar/profile)
//
// A circular initials avatar. Only the shell-bar's 32px size exists in the
// design today — `size` is exposed as a plain px number so it can grow to
// match other avatar sizes later without a breaking change.

export default function Avatar({ initials, size = 32 }) {
  return (
    <div style={{
      width:          size,
      height:         size,
      borderRadius:   'var(--lyra-radius-round)',
      flexShrink:     0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'var(--lyra-color-accent-slate-strong-bg)',
      color:          'var(--lyra-color-accent-slate-strong-fg)',
    }}>
      <span className="lyra-body-md-em">{initials}</span>
    </div>
  );
}

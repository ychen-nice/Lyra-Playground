import "../styles/typography.css";
import { SHADOWS } from "../tokens.js";

const FF = "Inter, sans-serif";
const MONO = "'SF Mono','Fira Code','Consolas',monospace";

const PAGE_TITLE = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', marginBottom: 32 };
const SECTION_HDR = { fontSize: '0.875rem', fontWeight: 600, color: 'var(--lyra-color-fg-default)', marginBottom: 4, paddingBottom: 8, borderBottom: '2px solid rgba(0,0,0,0.08)', marginTop: 40 };
const COL_HDR = { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', fontFamily: FF };

export default {
  title: 'Foundation/Effects',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
    forceLight: true,
  },
};

export const Shadows = {
  name: 'Shadows',
  render: () => (
    <div style={{ maxWidth: 840, margin: '0 auto', fontFamily: FF }}>
      <h1 style={PAGE_TITLE}>Effects</h1>

      <h2 style={SECTION_HDR}>Shadows</h2>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 140px 1fr', gap: '0 24px', padding: '4px 0 8px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={COL_HDR}>Token</span>
        <span style={COL_HDR}>Preview</span>
        <span style={COL_HDR}>Value</span>
      </div>

      {SHADOWS.map(({ name, value, desc }) => (
        <div
          key={name}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 140px 1fr',
            gap: '0 24px',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          {/* Token name + description */}
          <div>
            <code style={{ fontSize: '0.6875rem', fontFamily: MONO, color: 'var(--lyra-color-fg-default)', background: 'rgba(0,0,0,0.04)', padding: '2px 5px', borderRadius: 3, display: 'inline-block', marginBottom: 6 }}>
              {name}
            </code>
            {desc && (
              <div style={{ fontSize: '0.6875rem', color: 'var(--lyra-color-fg-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                {desc}
              </div>
            )}
          </div>

          {/* Preview card */}
          <div style={{ padding: '16px 0' }}>
            <div style={{
              width: 100,
              height: 64,
              borderRadius: 10,
              background: '#FFFFFF',
              boxShadow: value,
              border: value === 'none' ? '1px dashed rgba(0,0,0,0.12)' : '1px solid rgba(0,0,0,0.03)',
            }} />
          </div>

          {/* CSS value */}
          <code style={{ fontSize: '0.75rem', fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', wordBreak: 'break-all', lineHeight: 1.6 }}>
            {value}
          </code>
        </div>
      ))}
    </div>
  ),
};

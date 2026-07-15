import "../styles/typography.css";
import { SEMANTIC_SECTIONS, SIZE_SECTIONS } from "../tokens.js";

const FF = "Inter, sans-serif";
const MONO = "'SF Mono','Fira Code','Consolas',monospace";

/* ─── Base palette ─────────────────────────────────────────────────────────── */
const PALETTE = {
  Gray:   [['25','#FAFAFA'],['50','#F5F5F5'],['100','#EDEDED'],['200','#D1D1D1'],['300','#B5B5B5'],['400','#828282'],['500','#5C5C5C'],['600','#454545'],['700','#2E2E2E'],['800','#262626'],['900','#1F1F1E'],['950','#141414']],
  Slate:  [['25','#FBFCFE'],['50','#F5F7F9'],['100','#ECEFF3'],['200','#D0D6DC'],['300','#ACB7C3'],['400','#7F8B9A'],['500','#5D6A79'],['600','#49515A'],['700','#363D44'],['800','#2A2D32'],['900','#1E2124'],['950','#171A1C']],
  Brand:  [['25','#F6FAFE'],['50','#F1F7FE'],['100','#E8F1FC'],['200','#D3E6FD'],['300','#A7D0FE'],['400','#4896EC'],['500','#166CCA'],['600','#185BA4'],['700','#164479'],['800','#11375F'],['900','#0C2845'],['950','#081C30']],
  Red:    [['25','#FFF0F0'],['50','#FFEBEB'],['100','#FFE0E0'],['200','#FFB8B8'],['300','#FA7F7F'],['400','#E34545'],['500','#BD2A2A'],['600','#A32424'],['700','#8A1F1F'],['800','#641616'],['900','#430F0F'],['950','#211717']],
  Orange: [['25','#FFF4EB'],['50','#FFECDB'],['100','#FFE5CC'],['200','#FFCC9E'],['300','#F89D4E'],['400','#E1710B'],['500','#A85000'],['600','#7D420C'],['700','#63360D'],['800','#4F2C0D'],['900','#3C220B'],['950','#25190E']],
  Yellow: [['25','#FFFAE0'],['50','#FFF7C7'],['100','#FFF3AD'],['200','#FFE680'],['300','#FACB33'],['400','#B58709'],['500','#8E6800'],['600','#674B13'],['700','#513D15'],['800','#3D3014'],['900','#2E2614'],['950','#221D11']],
  Lime:   [['25','#F7FEE7'],['50','#EEFBD0'],['100','#E4F6BB'],['200','#C9EA80'],['300','#9DC940'],['400','#67980B'],['500','#4E760C'],['600','#446311'],['700','#3A5413'],['800','#2E430F'],['900','#1D2E05'],['950','#172108']],
  Green:  [['25','#EBFAED'],['50','#DEF7E1'],['100','#D2F4D5'],['200','#B0E8B7'],['300','#64B96F'],['400','#288D34'],['500','#23722D'],['600','#1F5C27'],['700','#1B4C22'],['800','#153C1B'],['900','#0F2A13'],['950','#0E2010']],
  Teal:   [['25','#EBF8F9'],['50','#D8F1F3'],['100','#C8EDEF'],['200','#AAE0E5'],['300','#62C4CB'],['400','#09939E'],['500','#11737C'],['600','#1B636A'],['700','#194D52'],['800','#173B3F'],['900','#12292C'],['950','#102123']],
  Blue:   [['25','#F0F5FF'],['50','#E5EEFF'],['100','#D6E4FF'],['200','#B9CEF8'],['300','#789FED'],['400','#4977D4'],['500','#2D5BB9'],['600','#264C97'],['700','#1F3B75'],['800','#192E57'],['900','#131F3A'],['950','#121826']],
  Purple: [['25','#F7F5FF'],['50','#EFEBFF'],['100','#E6E0FF'],['200','#D1C9F2'],['300','#A998E7'],['400','#816AD7'],['500','#634DBD'],['600','#4E39A8'],['700','#42308D'],['800','#31265F'],['900','#231D3F'],['950','#1B172B']],
  Pink:   [['25','#FFF5FC'],['50','#FFEBF8'],['100','#FFE0F5'],['200','#FCCAEB'],['300','#F099D3'],['400','#D756AC'],['500','#B03887'],['600','#91296E'],['700','#702055'],['800','#4F173C'],['900','#331429'],['950','#25131F']],
};

const NEUTRALS = [['White','#FFFFFF'],['Black','#000000']];

/* ─── Helper components ────────────────────────────────────────────────────── */
function Swatch({ hex, size = 32 }) {
  const isTransparent = hex === 'rgba(0,0,0,0)' || hex === 'rgba(255,255,255,0)';
  return (
    <div style={{
      width: size, height: size, borderRadius: 5, flexShrink: 0,
      border: '1px solid rgba(0,0,0,0.1)',
      background: isTransparent
        ? 'linear-gradient(45deg,#ddd 25%,#fff 25%,#fff 75%,#ddd 75%), linear-gradient(45deg,#ddd 25%,#fff 25%,#fff 75%,#ddd 75%)'
        : hex,
      backgroundSize: isTransparent ? '8px 8px' : undefined,
      backgroundPosition: isTransparent ? '0 0, 4px 4px' : undefined,
    }} />
  );
}

const PAGE_TITLE = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', marginBottom: 32 };
const SECTION_HDR = { fontSize: '0.875rem', fontWeight: 600, color: 'var(--lyra-color-fg-default)', marginBottom: 4, paddingBottom: 8, borderBottom: '2px solid rgba(0,0,0,0.08)', marginTop: 40 };
const COL_HDR = { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', fontFamily: FF };
const GROUP_HDR = { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', marginBottom: 8 };

/* ─── Stories ──────────────────────────────────────────────────────────────── */
export default {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
    forceLight: true,
  },
};

/* Base Colors */
export const BaseColors = {
  name: 'Base Colors',
  render: () => (
    <div style={{ maxWidth: 960, margin: '0 auto', fontFamily: FF }}>
      <h1 style={PAGE_TITLE}>Base Colors</h1>

      {/* Neutrals */}
      <div style={GROUP_HDR}>Neutrals</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
        {NEUTRALS.map(([name, hex]) => (
          <div key={name} style={{ width: 72 }}>
            <div style={{ height: 56, borderRadius: 8, background: hex, border: '1px solid rgba(0,0,0,0.1)', marginBottom: 6 }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--lyra-color-fg-default)', fontFamily: FF }}>{name}</div>
            <div style={{ fontSize: 10, fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)' }}>{hex}</div>
          </div>
        ))}
      </div>

      {/* Shade headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '72px repeat(12, 1fr)', gap: '0 4px', marginBottom: 6 }}>
        <span />
        {['25','50','100','200','300','400','500','600','700','800','900','950'].map(s => (
          <span key={s} style={{ fontSize: 9, color: 'var(--lyra-color-fg-secondary)', textAlign: 'center', fontFamily: MONO, letterSpacing: '0.02em' }}>{s}</span>
        ))}
      </div>

      {/* Color families */}
      {Object.entries(PALETTE).map(([family, shades]) => (
        <div key={family} style={{ display: 'grid', gridTemplateColumns: '72px repeat(12, 1fr)', gap: '0 4px', marginBottom: 4, alignItems: 'center' }}>
          <span style={{ fontSize: '0.6875rem', color: 'var(--lyra-color-fg-secondary)', fontWeight: 500, paddingRight: 8 }}>{family}</span>
          {shades.map(([shade, hex]) => (
            <div key={shade} title={`${family} ${shade} — ${hex}`}>
              <div style={{ height: 40, borderRadius: 5, background: hex, border: '1px solid rgba(0,0,0,0.06)' }} />
              <div style={{ fontSize: 9, fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', textAlign: 'center', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hex}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* Semantic Colors */
export const SemanticColors = {
  name: 'Semantic Colors',
  render: () => (
    <div style={{ maxWidth: 960, margin: '0 auto', fontFamily: FF }}>
      <h1 style={PAGE_TITLE}>Semantic Colors</h1>

      {SEMANTIC_SECTIONS.map(({ title, prefix, tokens }) => (
        <div key={title}>
          <h2 style={SECTION_HDR}>{title}</h2>

          {/* Column headers: swatch | token | light | dark | description */}
          <div style={{ display: 'grid', gridTemplateColumns: '32px 200px 140px 140px 1fr', gap: '0 16px', padding: '4px 0 6px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <span />
            <span style={COL_HDR}>Token</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }} />
              <span style={COL_HDR}>Light</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#2A2D32', border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }} />
              <span style={COL_HDR}>Dark</span>
            </div>
            <span style={COL_HDR}>Description</span>
          </div>

          {tokens.map(({ name, light, dark, desc }) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '32px 200px 140px 140px 1fr', gap: '0 16px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              {/* Light swatch */}
              <Swatch hex={light} size={28} />
              {/* Token name */}
              <code style={{ fontSize: '0.6875rem', fontFamily: MONO, color: 'var(--lyra-color-fg-default)', background: 'rgba(0,0,0,0.04)', padding: '2px 5px', borderRadius: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {prefix}{name}
              </code>
              {/* Light value */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Swatch hex={light} size={18} />
                <span style={{ fontSize: 10, fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{light}</span>
              </div>
              {/* Dark value */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Swatch hex={dark} size={18} />
                <span style={{ fontSize: 10, fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dark}</span>
              </div>
              {/* Description */}
              <span style={{ fontSize: '0.6875rem', color: 'var(--lyra-color-fg-secondary)', lineHeight: 1.5, fontStyle: desc ? 'italic' : 'normal' }}>
                {desc || ''}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ─── Per-category size visualisations ────────────────────────────────────── */
function SizeVisual({ title, v }) {
  const active  = 'var(--lyra-color-bg-active-moderate)';
  const bActive = 'var(--lyra-color-border-active)';
  const fgAct   = 'var(--lyra-color-fg-action)';

  /* Spacing — left/right border ticks with the gap filled */
  if (title === 'Spacing') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', height: 28 }}>
        <div style={{ width: 1.5, height: 20, background: bActive, flexShrink: 0 }} />
        <div style={{ width: v, height: 20, background: active, flexShrink: 0 }} />
        <div style={{ width: 1.5, height: 20, background: bActive, flexShrink: 0 }} />
      </div>
    );
  }

  /* Border Radius — same rectangle, corner radius changes per token */
  if (title === 'Border Radius') {
    return (
      <div style={{
        width: 72, height: 32, flexShrink: 0,
        borderRadius: v >= 999 ? '999px' : `${v}px`,
        border: `1.5px solid ${bActive}`,
        background: active,
      }} />
    );
  }

  /* Border Width — box whose border thickness equals the token value */
  if (title === 'Border Width') {
    return (
      <div style={{
        width: 64, height: 28, flexShrink: 0,
        borderRadius: 4,
        border: v === 0 ? '1px dashed rgba(0,0,0,0.22)' : `${v}px solid ${bActive}`,
        background: active,
      }} />
    );
  }

  /* Control Height — a button-like pill whose height is the token value */
  if (title === 'Control Height') {
    return (
      <div style={{
        height: v, width: 96, flexShrink: 0,
        background: active,
        border: `1px solid ${bActive}`,
        borderRadius: 6,
      }} />
    );
  }

  /* Icon Size — a solid square whose width & height equal the token value */
  if (title === 'Icon Size') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: 28 }}>
        <div style={{
          width: v, height: v, flexShrink: 0,
          background: fgAct,
          borderRadius: 2,
        }} />
      </div>
    );
  }

  /* Row Height — top/bottom border lines with the space between them filled */
  if (title === 'Row Height') {
    return (
      <div style={{
        height: v,
        borderTop:    `1.5px solid ${bActive}`,
        borderBottom: `1.5px solid ${bActive}`,
        background: active,
      }} />
    );
  }

  return null;
}

/* px → rem, trimmed of trailing zeros (e.g. 8 → "0.5rem", 999 → "∞") */
function pxToRem(v) {
  if (v === 999) return '∞';
  return `${parseFloat((v / 16).toFixed(4))}rem`;
}

/* Semantic Sizes */
export const SemanticSizes = {
  name: 'Semantic Sizes',
  render: () => (
    <div style={{ maxWidth: 780, margin: '0 auto', fontFamily: FF }}>
      <h1 style={PAGE_TITLE}>Semantic Sizes</h1>

      {SIZE_SECTIONS.map(({ title, prefix, tokens }) => (
        <div key={title}>
          <h2 style={SECTION_HDR}>{title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 56px 64px', gap: '0 16px', padding: '4px 0 6px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <span style={COL_HDR}>Token</span>
            <span style={COL_HDR}>Visual</span>
            <span style={COL_HDR}>Value</span>
            <span style={COL_HDR}>Rem</span>
          </div>
          {tokens.map(({ n, v }) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 56px 64px', gap: '0 16px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <code style={{ fontSize: '0.6875rem', fontFamily: MONO, color: 'var(--lyra-color-fg-default)' }}>
                {prefix}{n}
              </code>
              <SizeVisual title={title} v={v} />
              <span style={{ fontSize: '0.75rem', fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', textAlign: 'right' }}>
                {v === 999 ? '∞' : `${v}px`}
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', textAlign: 'right' }}>
                {pxToRem(v)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

import "../styles/typography.css";
import { SEMANTIC_SECTIONS, SIZE_SECTIONS } from "../tokens.js";

const FF = "Inter, sans-serif";
const MONO = "'SF Mono','Fira Code','Consolas',monospace";

/* ─── Base palette ─────────────────────────────────────────────────────────── */
const PALETTE = {
  Gray:   [['25','#FAFAFA'],['50','#F5F5F5'],['100','#EDEDED'],['200','#D1D1D1'],['300','#B5B5B5'],['400','#828282'],['500','#5C5C5C'],['600','#454545'],['700','#2E2E2E'],['800','#262626'],['900','#1F1F1E'],['950','#141414']],
  Slate:  [['25','#FBFCFE'],['50','#F3F5F7'],['100','#E9EDF1'],['200','#D0D6DC'],['300','#ACB7C3'],['400','#7F8B9A'],['500','#66717F'],['600','#585F68'],['700','#414950'],['800','#323740'],['900','#24282C'],['950','#171A1C']],
  Brand:  [['25','#F6FAFE'],['50','#ECF4FE'],['100','#E3EEFC'],['200','#D3E6FD'],['300','#A7D0FE'],['400','#4896EC'],['500','#166CCA'],['600','#185BA4'],['700','#164479'],['800','#11375F'],['900','#0C2845'],['950','#081C30']],
  Red:    [['25','#FFF0F0'],['50','#FFEBEB'],['100','#FFE0E0'],['200','#FFB8B8'],['300','#FF7A7A'],['400','#E75555'],['500','#C93232'],['600','#A32424'],['700','#8A1F1F'],['800','#641616'],['900','#430F0F'],['950','#211717']],
  Orange: [['25','#FFF4EB'],['50','#FFECDB'],['100','#FFE5CC'],['200','#FFCC9E'],['300','#F9A45A'],['400','#E1710B'],['500','#AE5300'],['600','#7D420C'],['700','#63360D'],['800','#4F2C0D'],['900','#3C220B'],['950','#25190E']],
  Yellow: [['25','#FFFAE0'],['50','#FFF7C7'],['100','#FFF3AD'],['200','#FFE680'],['300','#F9CF46'],['400','#BD8B04'],['500','#906A00'],['600','#674B13'],['700','#513D15'],['800','#3D3014'],['900','#2E2614'],['950','#221D11']],
  Lime:   [['25','#F7FEE7'],['50','#EEFBD0'],['100','#E4F6BB'],['200','#C9EA80'],['300','#A6D349'],['400','#67980B'],['500','#507C07'],['600','#446311'],['700','#3A5413'],['800','#2E430F'],['900','#1D2E05'],['950','#172108']],
  Green:  [['25','#EBFAED'],['50','#DEF7E1'],['100','#D2F4D5'],['200','#B0E8B7'],['300','#73CD7F'],['400','#2EA53E'],['500','#197E26'],['600','#1F5C27'],['700','#1B4C22'],['800','#153C1B'],['900','#0F2A13'],['950','#0E2010']],
  Teal:   [['25','#EBF8F9'],['50','#D8F1F3'],['100','#C8EDEF'],['200','#AAE0E5'],['300','#65C5CD'],['400','#2C9FA9'],['500','#057680'],['600','#1B636A'],['700','#194D52'],['800','#173B3F'],['900','#12292C'],['950','#102123']],
  Blue:   [['25','#F0F5FF'],['50','#E5EEFF'],['100','#D6E4FF'],['200','#B9CEF8'],['300','#789FED'],['400','#4977D4'],['500','#3163C9'],['600','#264C97'],['700','#1F3B75'],['800','#192E57'],['900','#131F3A'],['950','#121826']],
  Purple: [['25','#F7F5FF'],['50','#EFEBFF'],['100','#E6E0FF'],['200','#D1C9F2'],['300','#AD9FE9'],['400','#8973DB'],['500','#6E56CC'],['600','#4E39A8'],['700','#42308D'],['800','#31265F'],['900','#231D3F'],['950','#1B172B']],
  Pink:   [['25','#FFF5FC'],['50','#FFEBF8'],['100','#FFE0F5'],['200','#FCCAEB'],['300','#EE9DD3'],['400','#DC63B4'],['500','#BF2D8D'],['600','#91296E'],['700','#702055'],['800','#4F173C'],['900','#331429'],['950','#25131F']],
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

// A full-bleed row swatch (square corners, spans the row's true height by
// bleeding past its own row's vertical padding via negative margins) — used
// in the Semantic Colors token rows instead of the inset, rounded Swatch.
function RowSwatch({ hex, rowPadding }) {
  const isTransparent = hex === 'rgba(0,0,0,0)' || hex === 'rgba(255,255,255,0)';
  return (
    <div style={{
      alignSelf: 'stretch', width: '100%', flexShrink: 0,
      marginTop: -rowPadding, marginBottom: -rowPadding,
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
// The divider now sits under the title+description pair as a group, rather
// than directly under the title, so it still lands in the right place
// whether or not a section has a description.
const SECTION_HEADER_BLOCK = { marginTop: 40, paddingBottom: 12, borderBottom: '2px solid rgba(0,0,0,0.08)' };
const SECTION_HDR = { fontSize: '0.875rem', fontWeight: 600, color: 'var(--lyra-color-fg-default)', margin: 0 };
const SECTION_DESC = { fontSize: '0.8125rem', color: 'var(--lyra-color-fg-secondary)', lineHeight: 1.6, maxWidth: 720, marginTop: 6 };
const COL_HDR = { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', fontFamily: FF };
const GROUP_HDR = { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lyra-color-fg-secondary)', marginBottom: 8 };
// Fixed token-row height for the Semantic Colors page — tall enough to fit a
// 3-line clamped description plus its vertical padding, so every row (and
// its full-bleed swatch) ends up the same height regardless of content.
const ROW_HEIGHT = 72;

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=33552-120619
// One short blurb per section, shown under its title. Keyed by the exact
// SEMANTIC_SECTIONS title — a section with no matching Figma blurb (e.g.
// Conversation, Interactive States) simply renders without one.
const SECTION_DESCRIPTIONS = {
  Surface: 'The surface layers are the visual "ground" on which UI content sits - used for page backgrounds, navigation panels, sidebars, cards and secondary panels. Brand-tintable.',
  Background: 'Role-based background tokens for UI elements that reside on surface backgrounds.',
  'Active Background': 'Background tokens for active, selected, or currently-in-effect states. Used for active filters, selected nav items, highlighted rows, and pressed toggle states. Value is brand-derived and themeable.',
  Foreground: 'Foreground tokens for text, icons, and decorative elements. Foreground stays neutral in almost all cases and color is reserved for status, links, and active states.',
  'Active Foreground': 'Foreground tokens for active or selected states on elements with with active background or no background - tabs with underlines, active navigation text, selected filter labels.',
  Border: 'A graduated border scale from near-invisible to high-contrast, plus semantic tokens for inverse, transparent, and active states. The scale is designed so adjacent steps are meaningfully different.',
  Focus: "Keyboard focus ring colors. Separated from the main border scale to ensure focus rings are always visible and distinct, regardless of the component's resting border state",
  Status: (
    <>
      Semantic status colors. Each status has a strong, moderate and subtle variants designed to work across all three property types — <strong>background, foreground, and border</strong> without duplication. Strong tokens meet 4.5:1 contrast for text use on the subtle status backgrounds. Subtle tokens are calibrated for backgrounds and decorative borders.
    </>
  ),
  Accent: (
    <>
      <p style={{ margin: '0 0 8px' }}>A set of hues with no fixed semantic meaning intended for small elements rather than large surfaces.</p>
      <p style={{ margin: '0 0 8px' }}>Used to distinguish one item, group, or value from another (<strong>e.g., tags, categories, labels, avatars)</strong>, and it's up to the consuming context to decide what each hue represents.</p>
      <p style={{ margin: '0 0 6px' }}><strong>Every hue is available in two versions, made up of a background/foreground token pair used together:</strong></p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li><strong>Subtle</strong> — a light background paired with a corresponding foreground (text/icon) token, intended for larger surface areas (chips, rows, containers) where the color needs to differentiate without competing with surrounding content.</li>
        <li><strong>Strong</strong> — an emphasized background paired with a corresponding foreground (text/icon) token, intended for smaller, higher-emphasis surfaces (badges, dots, small tags) where the category needs to stand out or be scanned quickly.</li>
      </ul>
    </>
  ),
};

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
          <div style={SECTION_HEADER_BLOCK}>
            <h2 style={SECTION_HDR}>{title}</h2>
            {SECTION_DESCRIPTIONS[title] && <div style={SECTION_DESC}>{SECTION_DESCRIPTIONS[title]}</div>}
          </div>

          {/* Column headers: swatch | token | value | description */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 240px 140px 1fr', gap: '0 16px', padding: '4px 0 6px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <span />
            <span style={COL_HDR}>Token</span>
            <span style={COL_HDR}>Value</span>
            <span style={COL_HDR}>Description</span>
          </div>

          {tokens.map(({ name, light, desc }) => (
            <div key={name} style={{
              display: 'grid', gridTemplateColumns: '100px 240px 140px 1fr', gap: '0 16px', alignItems: 'center',
              height: ROW_HEIGHT, boxSizing: 'border-box', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}>
              {/* Swatch — full-bleed to the row's own top/bottom edges */}
              <RowSwatch hex={light} rowPadding={8} />
              {/* Token name */}
              <code style={{ fontSize: '0.6875rem', fontFamily: MONO, color: 'var(--lyra-color-fg-default)', background: 'rgba(0,0,0,0.04)', padding: '2px 5px', borderRadius: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {prefix}{name}
              </code>
              {/* Value — the absolute resolved value, not the reference token name. */}
              <span style={{ fontSize: 10, fontFamily: MONO, color: 'var(--lyra-color-fg-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{light}</span>
              {/* Description — clamped to 3 lines so a long note can't grow the
                  row past the shared fixed height; full text is on hover. */}
              <span
                title={desc || undefined}
                style={{
                  fontSize: '0.6875rem', color: 'var(--lyra-color-fg-secondary)', lineHeight: 1.5, fontStyle: desc ? 'italic' : 'normal',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'pre-line',
                }}
              >
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

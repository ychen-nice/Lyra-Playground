import "../styles/typography.css";

export default {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    actions: { disable: true },
    forceLight: true,
  },
};

const SCALE = [
  { class: "lyra-heading-xl",  label: "Heading XL",          specimen: "The quick brown fox" },
  { class: "lyra-heading-lg",  label: "Heading LG",          specimen: "The quick brown fox" },
  { class: "lyra-heading-md",  label: "Heading MD",          specimen: "The quick brown fox" },
  { class: "lyra-heading-sm",  label: "Heading SM",          specimen: "The quick brown fox" },
  { class: "lyra-heading-xs",  label: "Heading XS",          specimen: "The quick brown fox" },
  { class: "lyra-body-lg",     label: "Body LG",             specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-body-lg-em",  label: "Body LG Emphasized",  specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-body-md",     label: "Body MD",             specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-body-md-em",  label: "Body MD Emphasized",  specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-body-sm",     label: "Body SM",             specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-body-sm-em",  label: "Body SM Emphasized",  specimen: "The quick brown fox jumps over the lazy dog" },
  { class: "lyra-label",       label: "Label",               specimen: "The quick brown fox jumps over the lazy dog" },
];

const DIVIDER_BEFORE = new Set(["lyra-body-lg", "lyra-label"]);

/* getComputedStyle always normalizes font-size/line-height/letter-spacing to px,
   even though the source CSS is authored in rem — convert back for display. */
function pxToRem(pxStr) {
  const n = parseFloat(pxStr);
  if (Number.isNaN(n)) return pxStr;
  return `${parseFloat((n / 16).toFixed(4))}rem`;
}

const meta = {
  fontSize: "0.6875rem",
  fontFamily: "Inter, sans-serif",
  color: "rgba(0,0,0,0.4)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontWeight: 500,
};

export const AllStyles = {
  name: "All Styles",
  render: () => (
    <div style={{ maxWidth: 800, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 32 }}>
        Lyra Type Scale
      </h1>

      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 56px 56px 80px 96px", gap: "0 16px", paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 4 }}>
        {["Style", "Specimen", "Size", "Weight", "Line Ht", "Tracking"].map(h => (
          <span key={h} style={meta}>{h}</span>
        ))}
      </div>

      {SCALE.map(({ class: cls, label, specimen }) => {
        const el = document.createElement("span");
        el.className = cls;
        document.body.appendChild(el);
        const cs = getComputedStyle(el);
        const size = pxToRem(cs.fontSize);
        const weight = cs.fontWeight;
        const lineH = pxToRem(cs.lineHeight);
        const tracking = cs.letterSpacing === "normal" ? "normal" : pxToRem(cs.letterSpacing);
        document.body.removeChild(el);

        return (
          <div key={cls}>
            {DIVIDER_BEFORE.has(cls) && (
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", margin: "4px 0" }} />
            )}
            <div style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 56px 56px 80px 96px",
              gap: "0 16px",
              alignItems: "baseline",
              padding: "10px 0",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}>
              <span style={{ ...meta, textTransform: "none", letterSpacing: 0, fontSize: "0.75rem", color: "rgba(0,0,0,0.45)" }}>
                {label}
                <br />
                <code style={{ fontSize: 10, background: "rgba(0,0,0,0.05)", padding: "1px 4px", borderRadius: 3, letterSpacing: 0 }}>.{cls}</code>
              </span>
              <span className={cls} style={{ color: "rgba(0,0,0,0.85)" }}>{specimen}</span>
              <span style={meta}>{size}</span>
              <span style={meta}>{weight}</span>
              <span style={meta}>{lineH}</span>
              <span style={meta}>{tracking}</span>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

export const Headings = {
  name: "Headings",
  render: () => (
    <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      {SCALE.filter(s => s.class.startsWith("lyra-heading")).map(({ class: cls, label }) => (
        <div key={cls}>
          <p style={meta}>{label}</p>
          <p className={cls} style={{ color: "rgba(0,0,0,0.85)", marginTop: 4 }}>AI Assistant — How can I help?</p>
        </div>
      ))}
    </div>
  ),
};

export const Body = {
  name: "Body",
  render: () => (
    <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      {SCALE.filter(s => s.class.startsWith("lyra-body") || s.class === "lyra-label").map(({ class: cls, label }) => (
        <div key={cls}>
          <p style={meta}>{label}</p>
          <p className={cls} style={{ color: "rgba(0,0,0,0.85)", marginTop: 4 }}>
            Sentiment analysis on his last 3 calls shows he's using filler phrases under pressure and pausing too long during account lookups.
          </p>
        </div>
      ))}
    </div>
  ),
};

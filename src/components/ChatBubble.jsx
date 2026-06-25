import { useState, useRef, useEffect } from "react";
import { ThumbsUp, ThumbsDown, RotateCcw, Copy } from "lucide-react";
import Button from "./Button";

// ─── Reasoning section ────────────────────────────────────────────────────────
function ReasoningSection({ reasoning, isThinking = false }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [reasoning, open]);

  const ROW_H = "var(--lyra-row-height-md, 36px)";

  // ── While thinking: animated dots + "Thinking…" + expanded content ──────────
  if (isThinking) {
    return (
      <div style={{ marginBottom: "var(--lyra-spacing-3)" }}>
        {/* Header row */}
        <div style={{
          height: "var(--lyra-control-height-sm, 24px)",
          display: "flex", alignItems: "center",
          gap: "var(--lyra-spacing-1)",
        }}>
          {[0, 140, 280].map(d => (
            <span key={d} style={{
              width: 5, height: 5,
              borderRadius: "var(--lyra-radius-round)",
              background: "var(--lyra-color-fg-secondary)",
              display: "inline-block",
              flexShrink: 0,
              animation: "blink 1s " + d + "ms ease-in-out infinite",
            }} />
          ))}
          <span className="lyra-body-sm" style={{ color: "var(--lyra-color-fg-default)", marginLeft: "var(--lyra-spacing-05)" }}>
            Thinking…
          </span>
        </div>
        {reasoning && (
          <div style={{ marginTop: "var(--lyra-spacing-1)" }}>
            <p className="lyra-body-sm" style={{ margin: 0, color: "var(--lyra-color-fg-secondary)" }}>
              {reasoning}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── After response: "Thought process ›" — collapsed by default, toggleable ──
  return (
    // When open: separator provides bottom spacing via its own padding, so no marginBottom here.
    // When closed: restore the standard spacing-3 gap below the section.
    <div style={{ marginBottom: open ? 0 : "var(--lyra-spacing-3)" }}>
      <Button variant="ghost" size="sm" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="lyra-body-sm" style={{ color: "var(--lyra-color-fg-secondary)" }}>
          Thought process
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{
            flexShrink: 0, color: "var(--lyra-color-fg-secondary)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}>
          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>

      {/* Collapsible body — separator lives inside so it's clipped and animated together */}
      <div style={{
        maxHeight: open ? height : 0,
        overflow: "hidden",
        transition: "max-height 0.25s ease",
      }}>
        <div ref={bodyRef}>
          <p className="lyra-body-sm" style={{
            margin: "var(--lyra-spacing-1) 0 0",
            color: "var(--lyra-color-fg-secondary)",
            lineHeight: "1.6",
          }}>
            {reasoning}
          </p>
          {/* Separator — inside the collapsible so it animates with the content */}
          <div style={{ padding: "var(--lyra-spacing-4) 0 0" }}>
            <hr style={{
              border: "none",
              borderTop: "var(--lyra-border-default) solid var(--lyra-color-border-subtle)",
              margin: 0,
            }} />
          </div>
          {/* Bottom padding after separator */}
          <div style={{ height: "var(--lyra-spacing-4)" }} />
        </div>
      </div>
    </div>
  );
}

// ─── AI action bar ────────────────────────────────────────────────────────────
function AIActionBar({ content }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = Array.isArray(content)
      ? content.map(b => b.type === "text" ? b.text : (b.items?.join("\n") ?? "")).join("\n")
      : content;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button variant="ghost" size="md" aria-label="Thumbs up"><ThumbsUp size={16} strokeWidth={1} /></Button>
      <Button variant="ghost" size="md" aria-label="Thumbs down"><ThumbsDown size={16} strokeWidth={1} /></Button>
      <Button variant="ghost" size="md" aria-label="Regenerate"><RotateCcw size={16} strokeWidth={1} /></Button>
      <Button variant="ghost" size="md" aria-label={copied ? "Copied" : "Copy"} onClick={handleCopy}>
        <Copy size={16} strokeWidth={1} />
      </Button>
    </div>
  );
}

// ─── ChatBubble ───────────────────────────────────────────────────────────────
/**
 * Unified chat bubble component.
 *
 * Props:
 *  variant    — "user" | "ai"
 *  content    — string (user) | string | Array<{type,text}|{type,items}> (ai)
 *  reasoning  — string (ai only) — collapsible reasoning/thinking section
 *  isLatest   — boolean (ai only) — keeps action bar always visible
 */
export default function ChatBubble({ variant = "user", content = "", reasoning = "", isLatest = false, isThinking = false }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const showActions = isLatest || hovered || focused;

  const colorStyle = { color: "var(--lyra-color-fg-default)" };
  const blockStyle = { marginBottom: "var(--lyra-spacing-2)" };

  const handleCopy = () => {
    const text = typeof content === "string" ? content : "";
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture: () => setFocused(false),
  };

  // ── User variant ────────────────────────────────────────────────────────────
  if (variant === "user") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }} {...handlers}>
        <div style={{
          maxWidth: "80%",
          background: "var(--lyra-color-bg-conversation-user)",
          borderRadius: "var(--lyra-radius-md)",
          padding: "var(--lyra-spacing-2) var(--lyra-spacing-3)",
          display: "flex", flexDirection: "column",
        }}>
          <span className="lyra-body-md" style={colorStyle}>{content}</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "flex-end",
          opacity: showActions ? 1 : 0,
          transition: "opacity 0.15s ease",
          pointerEvents: showActions ? "auto" : "none",
          marginTop: "var(--lyra-spacing-1)",
        }}>
          <Button variant="ghost" size="md" aria-label={copied ? "Copied" : "Copy"} onClick={handleCopy}>
            <Copy size={16} strokeWidth={1} />
          </Button>
        </div>
      </div>
    );
  }

  // ── AI variant ──────────────────────────────────────────────────────────────
  const renderContent = () => {
    if (typeof content === "string") {
      return <p className="lyra-body-md" style={{ margin: 0, ...colorStyle }}>{content}</p>;
    }
    return content.map((block, i) => {
      const isLast = i === content.length - 1;
      if (block.type === "text") return (
        <p key={i} className="lyra-body-md" style={{ margin: 0, ...colorStyle, ...(!isLast && blockStyle) }}>{block.text}</p>
      );
      if (block.type === "list") return (
        <ul key={i} style={{ ...(!isLast && blockStyle), margin: isLast ? 0 : undefined, paddingLeft: "var(--lyra-spacing-5)" }}>
          {block.items.map((item, j) => (
            <li key={j} className="lyra-body-md" style={{ ...colorStyle, marginBottom: "var(--lyra-spacing-05)" }}>{item}</li>
          ))}
        </ul>
      );
      return null;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }} {...handlers}>
      {(reasoning || isThinking) && <ReasoningSection reasoning={reasoning} isThinking={isThinking} />}
      <div style={{ padding: 0 }}>{renderContent()}</div>
      <div style={{
        opacity: showActions ? 1 : 0,
        transition: "opacity 0.15s ease",
        pointerEvents: showActions ? "auto" : "none",
        marginTop: "var(--lyra-spacing-1)",
      }}>
        <AIActionBar content={content} />
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ChatBubble from "./ChatBubble";
import Button from "./Button";

// ─── Static icons ─────────────────────────────────────────────────────────────
const Icon = {
  AiButton: () => (
    <div style={{
      width: "var(--lyra-icon-size-md)",
      height: "var(--lyra-icon-size-md)",
      borderRadius: "var(--lyra-radius-round)",
      background: "linear-gradient(135deg, var(--lyra-color-bg-ai-gradient-start), var(--lyra-color-bg-ai-gradient-end))",
      border: "var(--lyra-border-default) solid rgba(255,255,255,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 1L5.9 4.1L9 5L5.9 5.9L5 9L4.1 5.9L1 5L4.1 4.1Z" fill="white"/>
      </svg>
    </div>
  ),
  More: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4" r="1.25" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
      <circle cx="8" cy="12" r="1.25" fill="currentColor"/>
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 12.5V2.5M3 7L7.5 2.5L12 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ─── Suggestion button ────────────────────────────────────────────────────────
function SuggestionButton({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="lyra-body-sm suggestion-btn"
      style={{
        width: "100%",
        padding: "var(--lyra-spacing-2) var(--lyra-spacing-3)",
        background: pressed
          ? "var(--lyra-color-state-bg-pressed-opacity)"
          : hovered
            ? "var(--lyra-color-state-bg-hover-opacity)"
            : "var(--lyra-color-bg-control-subtle)",
        border: "var(--lyra-border-default) solid var(--lyra-color-border-subtle)",
        borderRadius: "var(--lyra-radius-md)",
        color: "var(--lyra-color-fg-default)",
        textAlign: "left", cursor: "pointer",
        transition: "background 0.1s",
      }}>
      {label}
    </button>
  );
}

// ─── Chat start (empty state) ─────────────────────────────────────────────────
function AiChatStart({ userName = "John", suggestions = [], onSuggestionClick }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", padding: "0 var(--lyra-spacing-6)", gap: "var(--lyra-spacing-8)",
      background: "var(--lyra-color-bg-surface-base)", flex: "1 0 0", zIndex: 1, width: "100%",
    }}>
      {/* Gradient AI orb */}
      <div style={{
        width: 64, height: 64, borderRadius: "var(--lyra-radius-round)",
        background: "conic-gradient(from 90deg, #7640ff -13%, #6d5eff -5%, #637bff 2%, #50b6ff 18%, #76c9ff 34%, #9cdcff 50%, #93b5ff 59%, #898eff 69%, #8067ff 78%, #7640ff 87%, #6d5eff 95%, #637bff 102%, #50b6ff 118%)",
        boxShadow: "0px 0px 18px rgba(25,140,255,0.41)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L18.4 13.6L28 16L18.4 18.4L16 28L13.6 18.4L4 16L13.6 13.6Z" fill="white"/>
        </svg>
      </div>

      {/* Greeting */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <span className="lyra-body-md" style={{ color: "var(--lyra-color-fg-default)" }}>Hi {userName},</span>
        <span className="lyra-body-lg-em" style={{ color: "var(--lyra-color-fg-default)" }}>How can i help?</span>
      </div>

      {/* Suggestion pills */}
      {suggestions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--lyra-spacing-2)", width: "100%", maxWidth: "30rem" }}>
          {suggestions.map((s, i) => (
            <SuggestionButton key={i} label={s} onClick={() => onSuggestionClick?.(s)} />
          ))}
        </div>
      )}
    </div>
  );
}


// ─── Sample messages ──────────────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  { id: 1, role: "user", text: "Hey — give me a quick read on where we stand right now. Queue's feeling heavy." },
  { id: 2, role: "ai",
    reasoning: "The user is asking for a real-time queue summary. I should pull the current call counts, wait times, available agents, and any SLA risk signals — then frame it concisely so they can act fast.",
    content: [
      { type: "text", text: "You're right to flag it. Here's the snapshot:" },
      { type: "list", items: ["Calls in queue: 12 (↑4 from 10 min ago)", "Longest wait: 6:48", "Agents available: 2 of 6", "SLA at risk: Billing queue – projected breach in ~8 minutes"] },
      { type: "text", text: "James R. finishes his current call in about 90 seconds. Routing him straight to Billing would close the gap before the breach." },
    ]},
  { id: 3, role: "user", text: "Diego's been struggling all afternoon. His handle time is way up and his last two CSAT scores were low. What's going on with him?" },
  { id: 4, role: "ai",
    reasoning: "Diego's metrics look unusual. High handle time combined with low CSAT often signals either a tool or process issue rather than a motivation problem. Let me check call sentiment data and see if there's a pattern in the specific call types he's been handling.",
    content: [
      { type: "text", text: "I've been watching Diego's session. Here's the pattern:" },
      { type: "list", items: ["Avg handle time today: 7:14 (team avg: 4:22)", "CSAT last 5 calls: 2.8 / 5", "Escalations today: 2"] },
      { type: "text", text: "Sentiment analysis on his last 3 calls shows he's using filler phrases under pressure and pausing too long during account lookups. This looks like a tooling familiarity issue, not attitude. A quick side-by-side or a tip about the billing tool shortcut (Ctrl+Shift+B) could turn this around fast." },
    ]},
];
const AI_REPLIES = [
  "Based on current patterns, the afternoon rush should taper off by 3:15 PM. I'd suggest holding one agent in standby until then.",
  "No critical SLA breaches in the next 15 minutes, but keep an eye on the Tech Support queue — it's running 20% above average.",
  "Sarah M. has the highest CSAT today at 4.9/5 across 14 calls. She's been on the Billing queue all day — worth a shoutout in the next standup.",
];
const AI_REASONINGS = [
  "Looking at historical patterns for this time of day and current staffing levels. The trend usually shows a drop-off after the afternoon peak.",
  "Scanning active queues and recent SLA breach history. Tech Support shows elevated volume but no imminent risk.",
  "Pulling CSAT rankings across all agents for today's shift. Sarah stands out clearly at the top of the leaderboard.",
];
let replyIdx = 0;

// ─── Main component ───────────────────────────────────────────────────────────
const DEFAULT_SUGGESTIONS = [
  "Create an AI Agent",
  "See what has changed since yesterday",
  "How can I manually configure AI Agents?",
];

// ─── Suggestions popover ──────────────────────────────────────────────────────
function SuggestionsPopover({ suggestions, onSelect, onClose, focusFirst }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "calc(100% + 0.25rem)",
      right: 0,
      zIndex: 10,
      width: "22rem",
      background: "var(--lyra-color-bg-surface-base)",
      border: "var(--lyra-border-default) solid var(--lyra-color-border-subtle)",
      borderRadius: "var(--lyra-radius-lg)",
      boxShadow: "0px 12px 24px rgba(0,0,0,0.08)",
      padding: "var(--lyra-spacing-3)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--lyra-spacing-2)",
    }}>
      {suggestions.map((s, i) => (
        <PopoverSuggestionItem
          key={i}
          label={s}
          autoFocus={i === 0 && focusFirst}
          onClick={() => { onSelect(s); onClose(); }}
        />
      ))}
    </div>
  );
}

function PopoverSuggestionItem({ label, onClick, autoFocus }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      autoFocus={autoFocus}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="lyra-body-sm suggestion-btn popover-suggestion-btn"
      style={{
        width: "100%",
        padding: "var(--lyra-spacing-2) var(--lyra-spacing-3)",
        background: pressed
          ? "var(--lyra-color-state-bg-pressed-opacity)"
          : hovered
            ? "var(--lyra-color-state-bg-hover-opacity)"
            : "var(--lyra-color-bg-control-subtle)",
        border: "var(--lyra-border-default) solid var(--lyra-color-border-subtle)",
        borderRadius: "var(--lyra-radius-md)",
        color: "var(--lyra-color-fg-default)",
        textAlign: "left",
        cursor: "pointer",
        transition: "background 0.1s",
        lineHeight: "1.4",
      }}>
      {label}
    </button>
  );
}

export default function AiAssistantPanel({ width = 400, initialMessages = INITIAL_MESSAGES, userName = "John", suggestions = DEFAULT_SUGGESTIONS, showSuggestionButton = true, maxChars, embedded = false, onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const [hasContentBelow, setHasContentBelow] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverKeyboard, setPopoverKeyboard] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const footerRef = useRef(null);
  const sparkleRef = useRef(null);
  const popoverRef = useRef(null);
  const isMouseRef = useRef(false);
  const sparkleKeyboardRef = useRef(false);
  const [promptActive,   setPromptActive]   = useState(false);
  const [promptKeyboard, setPromptKeyboard] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrolledFromTop(el.scrollTop > 0);
    setHasContentBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const ro = new ResizeObserver(checkScroll);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    setTimeout(checkScroll, 50);
  }, [messages, streaming]);

  const TEXTAREA_LINE_HEIGHT = 20; // lyra-body-md: 1.25rem at 16px base
  const TEXTAREA_MAX_HEIGHT = TEXTAREA_LINE_HEIGHT * 5;

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, TEXTAREA_MAX_HEIGHT) + "px";
    ta.style.overflowY = ta.scrollHeight > TEXTAREA_MAX_HEIGHT ? "auto" : "hidden";
  }, [input]);

  useEffect(() => {
    if (!popoverOpen) return;
    const handleClickOutside = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        sparkleRef.current && !sparkleRef.current.contains(e.target)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverOpen]);

  const sendText = (text) => {
    if (!text.trim() || streaming) return;
    setMessages(m => [...m, { id: Date.now(), role: "user", text: text.trim() }]);
    setStreaming(true);
    const idx = replyIdx++;
    const reply = AI_REPLIES[idx % AI_REPLIES.length];
    const reasoning = AI_REASONINGS[idx % AI_REASONINGS.length];
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, role: "ai", content: reply, reasoning }]);
      setStreaming(false);
    }, 2400);
  };

  const send = () => {
    if (!input.trim() || streaming) return;
    sendText(input.trim());
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const canSend = input.trim().length > 0 && !streaming;
  const isEmpty = messages.length === 0 && !streaming;
  const lastAiId = [...messages].reverse().find(m => m.role === "ai")?.id ?? null;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--lyra-color-bg-surface-base); font-family: Inter, sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .msg { animation: fadeUp 0.2s ease forwards; }
        textarea { resize: none; outline: none; border: none; background: transparent; width: 100%; color: var(--lyra-color-fg-default); }
        textarea::placeholder { color: var(--lyra-color-fg-secondary); }
        ::-webkit-scrollbar { width: 12px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--lyra-color-border-strong); border-radius: var(--lyra-radius-sm); border: 3px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-track { background: transparent; }
        .icon-btn:focus-visible { outline: 2px solid var(--lyra-color-border-focus-default); outline-offset: 0.125rem; }
        .suggestion-btn:focus-visible { outline: 2px solid var(--lyra-color-border-focus-default); outline-offset: 2px; }
        .popover-suggestion-btn:focus { outline: 2px solid var(--lyra-color-border-focus-default); outline-offset: 2px; }
      `}</style>

      {/* Standalone centering wrapper (omitted when embedded in a parent container) */}
      <div style={embedded ? {
        display: 'contents',
      } : {
        width: "100vw", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#F3F4F6",
      }}>

        {/* Panel */}
        <div style={{
          width: embedded ? '100%' : width,
          height: embedded ? '100%' : 800,
          background: "var(--lyra-color-bg-surface-base)",
          ...(embedded ? {} : {
            borderRadius: "var(--lyra-radius-lg)",
            border: "var(--lyra-border-default) solid var(--lyra-color-border-subtle)",
            boxShadow: "var(--lyra-shadow-sm)",
          }),
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}>
          {/* Header — 72px, full width, shadow md only when scrolled */}
          <div style={{
            height: 72,
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 var(--lyra-spacing-6)",
            background: "var(--lyra-color-bg-surface-base)",
            boxShadow: scrolledFromTop ? "var(--lyra-shadow-md)" : "none",
            transition: "box-shadow 0.2s ease",
            zIndex: 1,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--lyra-spacing-2)" }}>
              <Icon.AiButton />
              <span className="lyra-heading-md" style={{ color: "var(--lyra-color-fg-default)" }}>
                AI Assistant
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--lyra-spacing-1)" }}>
              <Button variant="ghost" size="md" aria-label="More options"><Icon.More /></Button>
              <Button variant="ghost" size="md" aria-label="Close" onClick={onClose}><Icon.Close /></Button>
            </div>
          </div>

        {/* Content centering: constrains body+footer to 45rem when panel is wider (overlay mode) */}
        <div style={{
          width: '100%',
          maxWidth: embedded ? '45rem' : 'none',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 0',
          overflow: 'hidden',
        }}>

          {/* Conversation area */}
          {messages.length === 0 && !streaming ? (
            <AiChatStart
              userName={userName}
              suggestions={suggestions}
              onSuggestionClick={s => { isMouseRef.current = true; setInput(s); textareaRef.current?.focus(); }}
            />
          ) : (
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

              {/* Bottom fade — excludes scrollbar column */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 12,
                height: 64,
                background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--lyra-color-bg-surface-base) 100%)",
                pointerEvents: "none",
                zIndex: 2,
                opacity: hasContentBelow ? 1 : 0,
                transition: "opacity 0.25s ease",
              }} />

              <div
                ref={scrollRef}
                onFocusCapture={e => {
                  const container = scrollRef.current;
                  if (!container) return;
                  const FADE_HEIGHT = 64;
                  const containerRect = container.getBoundingClientRect();
                  const targetRect = e.target.getBoundingClientRect();
                  const fadeTop = containerRect.bottom - FADE_HEIGHT;
                  if (targetRect.bottom > fadeTop) {
                    container.scrollBy({ top: targetRect.bottom - fadeTop + 8, behavior: "smooth" });
                  }
                }}
                style={{
                  height: "100%",
                  overflowY: "auto",
                  padding: "0 var(--lyra-spacing-6) var(--lyra-spacing-6)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--lyra-spacing-4)",
                }}>

                {messages.map(msg => (
                  <div key={msg.id} className="msg">
                    {msg.role === "user"
                      ? <ChatBubble variant="user" content={msg.text} />
                      : <ChatBubble variant="ai" content={msg.content} reasoning={msg.reasoning} isLatest={msg.id === lastAiId} />
                    }
                  </div>
                ))}

                {streaming && (
                  <div className="msg">
                    <ChatBubble
                      variant="ai"
                      content=""
                      reasoning={AI_REASONINGS[replyIdx % AI_REASONINGS.length]}
                      isThinking={true}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div ref={footerRef} style={{
            flexShrink: 0,
            padding: "var(--lyra-spacing-4) var(--lyra-spacing-6) var(--lyra-spacing-2)",
            background: "var(--lyra-color-bg-surface-base)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--lyra-spacing-2)",
            position: "relative",
          }}>
            {/* Counter + prompt field wrapper (no gap between them) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {maxChars && input.length >= maxChars - 50 && (
                <div style={{ display: "flex", justifyContent: "flex-end", height: "1.25rem" }}>
                  <span
                    className="lyra-body-sm"
                    style={{
                      color: input.length >= maxChars
                        ? "var(--lyra-color-fg-error, #C0392B)"
                        : "var(--lyra-color-fg-secondary)",
                      lineHeight: "1.25rem",
                    }}>
                    {input.length}/{maxChars}
                  </span>
                </div>
              )}

            {/* Input field */}
            <div
              className="prompt-field"
              onPointerDown={() => { isMouseRef.current = true; }}
              onFocus={(e) => {
                // Only activate when focus enters the div from outside
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setPromptActive(true);
                  setPromptKeyboard(!isMouseRef.current);
                  isMouseRef.current = false;
                }
              }}
              onBlur={(e) => {
                // Only deactivate when focus leaves the div entirely
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setPromptActive(false);
                  setPromptKeyboard(false);
                }
              }}
              onClick={() => textareaRef.current?.focus()}
              style={{
                position: "relative",
                border: `var(--lyra-border-default) solid ${promptActive ? "var(--lyra-color-border-active)" : "var(--lyra-color-border-strong)"}`,
                boxShadow: promptActive ? "0 0 1px 3px var(--lyra-color-border-focus-ring)" : "none",
                outline: promptKeyboard ? "2px solid var(--lyra-color-border-focus-default)" : "none",
                outlineOffset: "2px",
                borderRadius: "var(--lyra-radius-md)",
                background: "var(--lyra-color-bg-field)",
                padding: "var(--lyra-spacing-3)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--lyra-spacing-2)",
                transition: "border-color 0.1s, box-shadow 0.1s",
                cursor: "text",
              }}>
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything…"
                className="lyra-body-md"
                style={{ minHeight: TEXTAREA_LINE_HEIGHT, overflowY: "hidden", cursor: "text", padding: 0 }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Button variant="ghost" size="md" aria-label="Attach"><Icon.Plus /></Button>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--lyra-spacing-2)" }}>
                  {!isEmpty && showSuggestionButton && (
                    <div ref={sparkleRef}>
                      <Button
                        variant="ghost"
                        size="md"
                        aria-label="Suggestions"
                        aria-expanded={popoverOpen}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") sparkleKeyboardRef.current = true; }}
                        onClick={(e) => { e.stopPropagation(); const kb = sparkleKeyboardRef.current; sparkleKeyboardRef.current = false; setPopoverKeyboard(kb); setPopoverOpen(o => !o); }}
                      >
                        <Sparkles size={16} strokeWidth={1} color="var(--lyra-color-bg-primary)" />
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    size="md"
                    iconOnly
                    aria-label="Send"
                    onClick={send}
                    disabled={!canSend}
                  >
                    <Icon.Send />
                  </Button>
                </div>
              </div>

              {/* Suggestions popover — above the prompt field, right-aligned */}
              {popoverOpen && (
                <div ref={popoverRef} style={{ display: "contents" }}>
                  <SuggestionsPopover
                    suggestions={suggestions}
                    onSelect={s => { setInput(s); textareaRef.current?.focus(); }}
                    onClose={() => setPopoverOpen(false)}
                    focusFirst={popoverKeyboard}
                  />
                </div>
              )}
            </div>
            </div>{/* end counter+prompt wrapper */}

            {/* Disclaimer */}
            <p className="lyra-body-sm" style={{ color: "var(--lyra-color-fg-secondary)", textAlign: "center" }}>
              AI assistant can make mistakes. Double check responses.
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

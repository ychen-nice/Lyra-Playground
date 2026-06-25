# Page Shell — Functional PRD

This document describes the functional behavior of the Page Shell component: a full-width, full-height application frame that combines a **Header**, an optional **Sidebar**, and a **Content Area**. It is intended as a complete specification for rebuilding the component from scratch.

---

## 1. Overall Structure

The Page Shell is a single container that fills its parent. It stacks vertically:

```
┌────────────────────────────────────────────────┐
│  Header  (optional)                            │
├────────────────────────────────────────────────┤
│  Content Area                                  │
│  (sidebar overlaps or shifts this area)        │
└────────────────────────────────────────────────┘
```

Both the header and the sidebar are optional. The content area always fills remaining space.

---

## 2. Sidebar

The sidebar is an optional panel that can be added to the shell. If no sidebar is provided, none of the sidebar-related behavior described below applies.

### 2.1 States

The sidebar has three states:

| State | Sidebar position | Content shift | Shadow |
|---|---|---|---|
| `hidden` | Translated fully off-screen to the left | None | None |
| `overlay` | Visible, floats above content | None | Large drop shadow |
| `opened` | Visible, pinned | Content area shifts right by 256px | None |

All transitions animate at 300ms ease — both the sidebar's horizontal translation and the content area's left padding. The sidebar is **always mounted** in the DOM so animations play on every state change.

### 2.2 Sidebar Dimensions

The sidebar has a **resizable width** with the following constraints:

| Constant | Value | Meaning |
|---|---|---|
| Default width | 256px (16rem) | Initial width on first render |
| Minimum width | 192px (12rem) | Hard lower bound during drag |
| Maximum width | 400px (25rem) | Hard upper bound during drag |

The sidebar has a **header** at the top (title + pin button) and a **scrollable body** below. The body has side padding only — no top or bottom padding.

The sidebar width is stored independently of sidebar state — it persists across `hidden` ↔ `overlay` ↔ `opened` transitions. Closing and reopening the sidebar restores the last user-set width.

### 2.3 Pin Button

The sidebar header contains a pin/unpin button in the top-right corner.

- In `overlay` state: shows a Pin icon. Clicking it moves the sidebar to `opened` (pinned).
- In `opened` state: shows an Unpin icon. Clicking it moves the sidebar to `overlay`.
- **The pin button is disabled (`isPinDisabled`) when pinning at the current sidebar width would leave less than `contentBreakpoint` for the content area**, i.e. when `containerWidth < contentBreakpoint + sidebarWidth`. The disabled tooltip reads "Pinning unavailable at this width."

`isPinDisabled` is distinct from `isNarrow` (see Section 4): `isNarrow` drives hover-mode behaviour and auto-close/restore and is computed only by the ResizeObserver on window resize. `isPinDisabled` is additionally updated when the drag ends so the pin button reflects the actual post-drag width even in overlay mode (where the ResizeObserver does not fire because `paddingLeft` stays 0).

---

## 3. Sidebar Trigger

The header optionally includes a **sidebar trigger button**. When `showSideNavTrigger` is false, the button is not rendered and the sidebar has no trigger in the header. The trigger icon changes based on sidebar state: a "panel open" icon when the sidebar is hidden, and a "panel close" icon when it is visible.

### 3.1 Hover/Pin Mode

The sidebar has two internal sub-modes: **Pinned** and **Overlay**. The initial sub-mode is Pinned and the initial sidebar state is `opened`.

**The pin button toggles the sub-mode:**
- Pinned → Overlay: switches sub-mode to Overlay, sets sidebar state to `overlay`.
- Overlay → Pinned: switches sub-mode to Pinned, sets sidebar state to `opened`.

**When content area is at or above the pin threshold (`contentBreakpoint + 256px`):**

| Sub-mode | Trigger interaction | Sidebar body interaction |
|---|---|---|
| Pinned | Click toggles `opened` ↔ `hidden` | No hover behavior |
| Overlay | Hover-in opens `overlay`; hover-out schedules close | Hover-in cancels close; hover-out schedules close |

**When content area is below the pin threshold (either sub-mode):**

- The trigger switches to hover behavior, regardless of sub-mode.
- Hover-in on trigger → opens `overlay`.
- Hover-out on trigger → schedules close (80ms debounce).
- Hover-in on sidebar body → cancels the scheduled close.
- Hover-out on sidebar body → schedules close.

The 80ms debounce allows the user to move the cursor from the trigger into the sidebar without it dismissing.

There is no backdrop. The sidebar dismisses on mouse-leave.

---

## 4. Sidebar Resize

### 4.1 Drag Handle

A drag handle occupies the full height of the sidebar's right border. It is an 8px-wide invisible hit area; a 2px blue visual indicator renders inside it.

- **Visibility:** the visual indicator is transparent by default. It becomes blue when the cursor hovers over the hit area (`handleHovered`) or while a drag is in progress (`isDragging`). Transition: 120ms.
- **Cursor:** `col-resize` while hovering the hit area, and set on `document.body` for the duration of the drag so the cursor does not flicker when the pointer moves outside the sidebar.

### 4.2 Drag Interaction

Drag is initiated by `pointerdown` on the hit area. Width updates are applied via `pointermove` / `pointerup` listeners on `document` (not the element) so the drag continues even if the pointer leaves the sidebar.

**Width clamping during drag:**

The clamped width at each move step is:

```
maxW       = min(MAX_SIDEBAR_W, max(MIN_SIDEBAR_W, contentCap))
rawW       = startWidth + (currentX − startX)
newWidth   = clamp(rawW, MIN_SIDEBAR_W, maxW)
```

where `contentCap` depends on the current sidebar state:

| State | `contentCap` | Reason |
|---|---|---|
| `opened` | `containerInnerWidth − contentBreakpoint` | Content area must stay ≥ `contentBreakpoint` |
| `overlay` / `hidden` | `MAX_SIDEBAR_W` | Sidebar floats above content — any width up to max is valid |

**Reference consistency:** `containerInnerWidth` is read from `contentAreaRef.getBoundingClientRect().width` (the content panel div), **not** from the outer container. The outer container has a 1px border on each side that makes it 2px wider; using a different element for clamping vs the post-drag narrow check would allow a 2px overshoot that triggers a false narrow condition when the drag ends at the limit.

**`lastDragWidth` closure variable:** a synchronous closure variable is updated on every `pointermove` and consumed by `pointerup`. This ensures `onUp` always has the final clamped width even if the React state update from the last `setSidebarWidth` call has not yet been committed to the DOM when `pointerup` fires.

### 4.3 State and Mode Preservation

Drag resize **never changes sidebar state or V2 sub-mode**. The only things that change during or after a drag are:

- `sidebarWidth` — updated live on every `pointermove`
- `isDragging` — true during drag, false on release; suppresses the CSS `padding-left` transition on the content panel so the panel tracks the handle in real time
- `isPinDisabled` — recomputed in `onUp` (see Section 2.3)

`isNarrow`, `state`, and `v2Mode` are **never written by the drag handlers**. They are exclusively the ResizeObserver's responsibility (driven by window/container resize).

### 4.4 ResizeObserver Guard

All ResizeObserver logic (`setIsNarrow`, `setIsPinDisabled`, auto-close, auto-restore) is gated on `!isDraggingRef.current`. During a drag on a pinned sidebar, each `setSidebarWidth` call changes `paddingLeft`, which fires the ResizeObserver. These firings are suppressed entirely — including `setIsNarrow` — to prevent hover-mode handlers from being wired up mid-drag (which would cause the sidebar to flip to overlay on the next cursor movement after release).

`prevNarrowRef` **is** updated inside the ResizeObserver even when dragging (it is read before the guard). This keeps the transition-edge detection (`narrow && !prev`) correct for the first ResizeObserver fire after the drag ends.

---

## 5. Responsive Breakpoints

### 5.1 Measurement

Breakpoints are evaluated against the **main content area width**, measured with a `ResizeObserver` on the content panel div. This div has `box-sizing: border-box`, `width: 100%`, and `paddingLeft: sidebarWidth` when the sidebar is in `opened` state (0 otherwise). `ResizeObserver` reports `contentRect.width`, which is the **inner content width** — total div width minus left padding.

- When sidebar is `opened`: `contentRect.width = containerInnerWidth − sidebarWidth`
- When sidebar is `hidden` or `overlay`: `contentRect.width = containerInnerWidth`

The narrow condition (`isNarrow`) is:

```
contentRect.width < contentBreakpoint + (state === 'opened' ? 0 : sidebarWidth)
```

This simplifies to `containerInnerWidth < contentBreakpoint + sidebarWidth` in all states — i.e. *would the content area drop below `contentBreakpoint` if the sidebar were pinned at its current width?*

**Threshold consistency:** using `sidebarWidth` in both the opened and non-opened branches means the auto-close condition and the auto-restore condition are exactly the same threshold. This prevents oscillation: if the window is at `containerInnerWidth = contentBreakpoint + sidebarWidth`, closing the sidebar (paddingLeft → 0) causes `contentRect.width = containerInnerWidth`, which evaluates `narrow = false` — no immediate re-restore loop.

### 5.2 Thresholds

| Name | Formula | Meaning |
|---|---|---|
| `contentBreakpoint` | prop (default 960px) | Minimum usable content area width when the sidebar is pinned |
| Narrow threshold | `contentBreakpoint + sidebarWidth` | Below this, `isNarrow = true`; auto-close fires if sidebar is opened |
| Pin-disabled threshold | `contentBreakpoint + sidebarWidth` | Below this, `isPinDisabled = true`; pin button is disabled |

`isNarrow` and `isPinDisabled` share the same formula but are separate state variables because `isPinDisabled` is also updated by the drag's `onUp` handler (the ResizeObserver does not fire in overlay/hidden mode when only the sidebar width changes).

### 5.3 Behavior when `isNarrow` is true

- Pin button is disabled (`isPinDisabled = true`).
- V2 trigger switches to hover mode regardless of sub-mode.
- V2 sidebar body responds to hover-enter/leave regardless of sub-mode.

`isNarrow` is **only set by the ResizeObserver** (window resize). The drag handlers never write `isNarrow`, so resizing the overlay sidebar to a wider width does not activate hover mode — only the window becoming too narrow for the current sidebar width does.

### 5.4 Auto-close on resize

When `isNarrow` transitions from false → true while the sidebar is `opened`:
- The sidebar auto-closes to `hidden`.
- An internal **involuntary-close flag** (`autoClosedRef`) is set to record that the close was not user-initiated.

### 5.5 Auto-restore on resize

When `isNarrow` transitions from true → false:
- If the involuntary-close flag is set: sidebar is **automatically restored to `opened`** and the flag is cleared.
- If the flag is not set (user manually closed the sidebar): sidebar stays `hidden`.

**Any manual close clears the involuntary-close flag.** This includes: clicking the trigger to close, and clicking the pin button to unpin.

---

## 6. Page Header

The header is optional. If no header is provided, the content area fills the full height of the shell.

### 6.1 Layout

The header is a horizontal flex row that wraps. It has:

- Fixed horizontal padding (32px each side).
- Minimum height of 72px.
- A bottom border.

The header contains two zones:

```
[ Trigger (opt) ]  [ TitleBreadcrumb ]          [ Actions (opt) | AI (opt) ]
←——————————————————— Left ————————————————————→  ←————————— Right ——————————→
```

- The gap between the Left and Right zones is 40px.
- Both zones have `flex-shrink: 0` — they do not compress.
- When the header is too narrow, the Right zone wraps to a second row (see Section 6.4).

### 6.2 Left Zone

Contains two elements in a horizontal row (both optional):

1. **Sidebar Trigger Button** (`showSideNavTrigger`, default: true) — an icon-only ghost button. When `showSideNavTrigger` is false, this button is not rendered.
2. **TitleBreadcrumb** — always present. Contains the breadcrumb trail and page title (see Section 7).

### 6.3 Right Zone

Contains:

1. **Action Buttons** (`headerActionsSlot`, optional) — defaults to a Secondary button and a Primary button. If a custom `headerActionsSlot` is provided, it replaces the default buttons entirely. If neither is needed, this area can be empty.
2. **Vertical Divider** — a thin 1px line, same height as the control. Only rendered when the AI button is also shown.
3. **AI Button** (`showAiTrigger`, default: true) — a secondary button with a Sparkles icon labeled "AI". When `showAiTrigger` is false, neither the AI button nor the divider before it is rendered.

### 6.4 Button Wrap Behavior

When the header is too narrow for both zones on one row, the **Right zone wraps to a second row** spanning the full header width.

**Wrap threshold:** the Right zone wraps when the remaining horizontal space (after accounting for padding and the Right zone's natural width) is less than the minimum width required by TitleBreadcrumb. The minimum TitleBreadcrumb width is: title text width + badge width (if shown) + (if breadcrumb levels are present: gap + overflow menu button width).

Width updates are applied synchronously to the DOM (not via React state) to prevent a one-frame flicker where the browser layout engine wraps the buttons before any state change occurs.

**Wrap suppression during sidebar transitions:** wrap decisions are suppressed for 350ms while the sidebar is animating open or closed. This prevents a momentary two-row layout at intermediate widths during the animation. The wrap state is recalculated once the transition ends.

---

## 7. TitleBreadcrumb

The TitleBreadcrumb renders in a single horizontal row within the left zone:

```
Level1 / Level2 / ··· / Parent /   Page Title   [Badge]
```

### 7.1 Elements

- **Breadcrumb trail** (optional) — zero or more ancestor levels, each followed by a `/` separator. Only rendered when `levels` is non-empty. When `showBreadcrumb` is false, levels are ignored and the trail is not rendered.
- **Page title** — always shown. Non-wrapping heading text.
- **Status badge** (`showStatusBadge`, default: false) — an optional pill shown inline after the title. When `showStatusBadge` is true, a pill with `statusBadgeLabel` text (default: "Active") appears. The badge text has a maximum display width and truncates with ellipsis if it overflows.

### 7.2 Width Handoff

The TitleBreadcrumb wrapper receives an explicit pixel width from the Page Header's measurement logic. This width represents the available horizontal space for the left zone on the current row. The BreadcrumbBar component receives the portion of that width left after subtracting the title's measured width and the gap between them.

---

## 8. Breadcrumb Responsive Collapse

When breadcrumb levels are provided, the trail collapses responsively based on available width.

### 8.1 Collapse Modes

| Mode | What is displayed | Example |
|---|---|---|
| `all` | Every level | `Home / Products / Laptops /` |
| `l1-parent-current` | First level + overflow menu + second-to-last level | `Home / ··· / Laptops /` |
| `parent-current` | Overflow menu + second-to-last level | `··· / Laptops /` |
| `current-only` | Overflow menu only | `··· /` |

Every visible level is always followed by a `/` separator. The overflow menu button is also followed by a `/`.

### 8.2 When Responsive Mode Activates

- **More than 3 levels**: Always responsive. The `all` mode is never used; the minimum display is `l1-parent-current`.
- **3 or fewer levels**: Responsive only when a width constraint is provided by the parent. Without one, always shows `all`.

### 8.3 Width Thresholds

Collapse thresholds are computed by measuring all label text widths in hidden off-screen elements. Thresholds are cached and only recomputed when the level labels change — not on every resize. The collapse mode is selected on every render by comparing the current available width against the stored thresholds.

### 8.4 Overflow Menu Button

- An icon-only ghost button with an ellipsis (···) icon.
- Stays in a **visually pressed state** while the dropdown is open.
- On click: opens a dropdown menu positioned below the button, fixed to the viewport to avoid clipping by ancestor overflow containers.
- The dropdown closes when the user clicks outside the button.

### 8.5 Overflow Menu Items

Each hidden breadcrumb level appears as one menu item.

- Rendered as an interactive non-link element (not an `<a>` tag).
- If the level has an href, clicking navigates to that URL.
- Three visual states: default (transparent background), hover, pressed.
- Fixed row height, rounded corners, horizontal side margin inside the dropdown.
- Clicking any item closes the menu.

---

## 9. State Interaction Tables

### 9.1 Trigger

| `isNarrow` | Sub-mode | Interaction | Result |
|---|---|---|---|
| false | Pinned | Click trigger | Toggle `opened` ↔ `hidden` |
| false | Overlay | Hover trigger or sidebar | Open `overlay` / keep open |
| false | Overlay | Leave trigger or sidebar | Schedule close (80ms) |
| true | Either | Hover trigger or sidebar | Open `overlay` / keep open |
| true | Either | Leave trigger or sidebar | Schedule close (80ms) |

### 9.2 Pin Button

| `isPinDisabled` | Sidebar state | Pin click |
|---|---|---|
| false | `overlay` | Switch to Pinned sub-mode; move to `opened` |
| false | `opened` | Switch to Overlay sub-mode; move to `overlay` |
| true | any | Button disabled |

### 9.3 Sidebar Drag Resize

| Event | Result |
|---|---|
| Drag starts | `isDragging = true`; content panel transition suppressed; ResizeObserver writes blocked |
| Pointer moves | `sidebarWidth` updated live; clamped to `[MIN_SIDEBAR_W, maxW]` |
| Pointer up (pinned) | `isDragging = false`; width stays; `isPinDisabled` recomputed; no state or mode change |
| Pointer up (overlay) | `isDragging = false`; width stays; `isPinDisabled` recomputed; `isNarrow` unchanged |

### 9.4 Window Resize

| Event | Condition | Result |
|---|---|---|
| `isNarrow` becomes true | Sidebar is `opened` | Auto-close to `hidden`; set involuntary-close flag |
| `isNarrow` becomes false | Involuntary-close flag is set | Restore sidebar to `opened`; clear flag |
| `isNarrow` becomes false | Flag is not set | Sidebar stays `hidden` |
| User clicks trigger to close | any | Clear involuntary-close flag |
| User unpins sidebar | any | Clear involuntary-close flag |

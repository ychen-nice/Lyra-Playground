# Content Sidebar — Behavior Overview

This document describes, in plain language, how the content sidebar panel behaves: its states, how it switches between them, its sizing rules, how it responds to a narrower window, and the other rules built into it.

## States

- The sidebar can be in one of three states: hidden, floating, or pinned.
- When hidden, the sidebar is completely out of view and the content area uses the full available width.
- When floating, the sidebar appears on top of the content without pushing it over. It sits above everything else and has a shadow underneath it to show it's floating rather than part of the page.
- When pinned, the sidebar sits to the left of the content and the content area shifts over to make room for it. It has no shadow in this state, since it's part of the layout rather than floating above it.

## How the sidebar switches states

- Clicking the small trigger icon in the page header opens the sidebar as a floating panel.
- Clicking anywhere inside a floating sidebar pins it in place.
- Clicking the collapse button inside a pinned sidebar turns it back into a floating panel.
- Clicking anywhere outside a floating sidebar closes it completely.
- If a page is set up to open its sidebar automatically when it loads, but the window is too narrow to comfortably pin it, it opens as a floating panel instead of pinning itself.
- Minimizing the main navigation menu on the left while the sidebar is floating also closes the sidebar. A floating panel is meant to be a quick, in-context look, not something left open once the user has deliberately made the layout narrower.

## Sizing

- The sidebar has a default width, and the user can drag its right edge to make it wider or narrower.
- Dragging is limited to a minimum and a maximum width — it can never be resized smaller or larger than those limits.
- While the sidebar is pinned, it also can't be dragged wide enough to shrink the content area below its own minimum comfortable width.
- While the sidebar is floating, it isn't limited by the content area at all, only by its own maximum width, since it sits above the content instead of squeezing it.
- Whatever width the user last set is remembered even after the sidebar is closed, so reopening it later — floating or pinned — keeps that same width.

## Responsive behavior and priority rules

- The app keeps track of a minimum comfortable width for the content area. If there isn't enough room for everything at once, several things adjust automatically to protect that minimum.
- When the window becomes too narrow, the automatic adjustments happen in a specific order: first the main navigation menu shrinks down to icons only, then, if that still isn't enough room, the content sidebar closes, and only after both of those have happened does the assistant panel on the right close as a last resort.
- The main navigation menu won't let itself be manually expanded back to full size if doing so would leave too little room for the content — the same kind of protection the sidebar's own controls have.
- The assistant panel on the right is treated as more important than the content sidebar. Opening the assistant panel will close the content sidebar first if that frees up enough space, rather than shrinking or hiding the assistant panel itself.
- If there still isn't enough room for the assistant panel even after considering the content sidebar, the assistant panel opens as a floating panel over the content instead of squeezing everything else.
- Moving to a different page automatically closes the assistant panel, since what it's showing is tied to the page the user was previously on.

## Other rules

- All of the sidebar's appearing, disappearing, and resizing movements animate smoothly rather than snapping into place instantly.
- The sidebar stays present behind the scenes at all times, even while hidden, purely so its opening and closing can always animate smoothly instead of popping in abruptly.
- The sidebar has a header area at the top with its title and, only while it's pinned open, a button to collapse it back to floating.
- The sidebar's content area scrolls on its own if there's more content than fits in the visible space.
- A transparent layer sits behind a floating sidebar specifically to catch clicks anywhere else on the page — that's what closes the sidebar when the user clicks outside of it.

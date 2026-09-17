import { useEffect } from "react";
import { LucideProvider } from "lucide-react";
import "../src/styles/typography.css";
import "../src/styles/tokens.css";
import { SEMANTIC_SECTIONS, SHADOWS, SIZE_SECTIONS } from "../src/tokens.js";

/* ─── CSS variable name helpers ────────────────────────────────────────────── */
// Figma token path (e.g. "bg/surface/base") → "--lyra-color-bg-surface-base"
function colorVar(prefix, name) {
  return '--lyra-color-' + (prefix + name).replace(/\//g, '-');
}

// Figma token path with lyra/ prefix (e.g. "lyra/shadow/sm") → "--lyra-shadow-sm"
function lyraVar(path) {
  return '--lyra-' + path.replace('lyra/', '').replace(/\//g, '-');
}

/* ─── Build :root CSS block from token data ────────────────────────────────── */
const LIGHT_BASELINE = `:root {\n${[
  ...SEMANTIC_SECTIONS.flatMap(({ prefix, tokens }) =>
    tokens.map(({ name, light }) => `  ${colorVar(prefix, name)}: ${light};`)
  ),
  ...SHADOWS.map(({ name, value }) =>
    `  ${lyraVar(name)}: ${value};`
  ),
  ...SIZE_SECTIONS.flatMap(({ prefix, tokens }) =>
    tokens.map(({ n, v }) =>
      `  ${lyraVar(prefix + n)}: ${v === 999 ? '999px' : v + 'px'};`
    )
  ),
].join('\n')}\n}`;

/* ─── Build dark-mode overrides from token data ────────────────────────────── */
// Applied as inline styles on a display:contents wrapper — overrides :root in dark mode.
const DARK_VARS = Object.fromEntries(
  SEMANTIC_SECTIONS.flatMap(({ prefix, tokens }) =>
    tokens.map(({ name, dark }) => [colorVar(prefix, name), dark])
  )
);

/* ─── lyra/color/bg/surface/canvas token values ───────────────────────────── */
const CANVAS_BG = {
  light: "#FBFCFE",
  dark:  "#141414",
};

/* ─── Toolbar theme toggle ─────────────────────────────────────────────────── */
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Color theme",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun",  title: "Light" },
        { value: "dark",  icon: "moon", title: "Dark"  },
      ],
      dynamicTitle: true,
    },
  },
  // Most components use hardcoded inline left/right styles rather than CSS
  // logical properties, so this alone won't mirror them — it's read by
  // individual components (e.g. TreeGrid's `rtl` prop) that have their own
  // real RTL support, rather than flipping every component automatically.
  direction: {
    name: "Direction",
    description: "Text direction (components opt in individually)",
    defaultValue: "ltr",
    toolbar: {
      icon: "transfer",
      items: [
        { value: "ltr", icon: "arrowright", title: "LTR" },
        { value: "rtl", icon: "arrowleft",  title: "RTL" },
      ],
      dynamicTitle: true,
    },
  },
  // Every lucide-react icon in the library is wrapped in a single LucideProvider
  // (below) driven by these two globals — nothing in component code sets its own
  // strokeWidth, so this is the one place that controls it everywhere at once.
  iconStrokeWidth: {
    name: "Icon Stroke",
    description: "Icon stroke width in px",
    defaultValue: 1,
    toolbar: {
      icon: "ruler",
      items: [
        { value: 0.75, title: "0.75px" },
        { value: 1,    title: "1px" },
        { value: 1.25, title: "1.25px" },
        { value: 1.5,  title: "1.5px" },
        { value: 1.75, title: "1.75px" },
        { value: 2,    title: "2px (Lucide default)" },
      ],
      dynamicTitle: true,
    },
  },
  iconAbsoluteStroke: {
    name: "Absolute Stroke",
    description: "Absolute: stroke stays a fixed px width at every icon size. Relative: stroke scales with the icon (Lucide's own default).",
    defaultValue: true,
    toolbar: {
      icon: "lock",
      items: [
        { value: true,  icon: "lock",   title: "Absolute" },
        { value: false, icon: "unlock", title: "Relative" },
      ],
      dynamicTitle: true,
    },
  },
};

/* ─── Global decorator ─────────────────────────────────────────────────────── */
export const decorators = [
  (Story, context) => {
    // Foundation pages opt out of dark theming via parameters.forceLight
    const forceLight = context.parameters?.forceLight === true;
    const theme = forceLight ? "light" : (context.globals.theme || "light");
    const isDark = theme === "dark";
    const iconStrokeWidth = context.globals.iconStrokeWidth ?? 1;
    const iconAbsoluteStroke = context.globals.iconAbsoluteStroke ?? true;

    // Set the iframe canvas background to the lyra/color/bg/surface/canvas token.
    // Also target the Storybook layout wrapper div (100vw × 100vh centering shell)
    // which sits above the body and has its own hardcoded background.
    useEffect(() => {
      const bg = CANVAS_BG[theme];
      const transition = "background 0.2s";
      document.body.style.background = bg;
      document.body.style.transition = transition;
      // Find the Storybook layout shell (fullscreen / centered wrapper injected
      // inside #storybook-root — it carries its own inline background that sits
      // above the body background and must be overridden separately).
      const root = document.getElementById("storybook-root");
      const shell = root && root.querySelector("[style*='100vw']");
      if (shell) {
        shell.style.background = bg;
        shell.style.transition = transition;
      }
      return () => {
        document.body.style.background = "";
        if (shell) shell.style.background = "";
      };
    }, [theme]);

    // display:contents is layout-neutral — it propagates CSS custom props to
    // all descendants without affecting flex/grid or centering behaviour.
    // Inline styles always win over :root stylesheet rules, so dark-mode vars
    // override any light defaults injected by the component's own <style> tag.
    // --lyra-icon-stroke-width mirrors the same global into a CSS var, for the handful of
    // hand-written inline SVGs (not lucide-react icons) that LucideProvider below can't
    // reach — see their `style={{ strokeWidth: 'var(--lyra-icon-stroke-width, ...)' }}`.
    return (
      <div style={{ display: "contents", "--lyra-icon-stroke-width": iconStrokeWidth, ...(isDark ? DARK_VARS : {}) }}>
        <LucideProvider strokeWidth={iconStrokeWidth} absoluteStrokeWidth={iconAbsoluteStroke}>
          <Story />
        </LucideProvider>
      </div>
    );
  },
];

/* ─── Default parameters ───────────────────────────────────────────────────── */
export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: ['Foundation', 'Components', 'Page header & sidebar', '*'],
      },
    },
  },
};

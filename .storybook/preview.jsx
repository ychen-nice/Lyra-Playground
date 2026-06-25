import { useEffect } from "react";
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
};

/* ─── Global decorator ─────────────────────────────────────────────────────── */
export const decorators = [
  (Story, context) => {
    // Foundation pages opt out of dark theming via parameters.forceLight
    const forceLight = context.parameters?.forceLight === true;
    const theme = forceLight ? "light" : (context.globals.theme || "light");
    const isDark = theme === "dark";

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
    return (
      <div style={{ display: "contents", ...(isDark ? DARK_VARS : {}) }}>
        <Story />
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

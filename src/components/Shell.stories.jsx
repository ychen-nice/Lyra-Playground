import Shell from "./Shell";
import PageHeader from "./PageHeader";
import Tabs from "./Tabs";
import "../styles/typography.css";

const RESPONSIVE_GUIDELINES = [
  "The content panel always gets priority — every other panel gives up space before the content panel has to.",
  "As the viewport gets narrower, whether from resizing the window or zooming in, primary navigation collapses down to an icon-only rail first.",
  "If there's still not enough room, the secondary sidebar contracts next. It shrinks continuously as the viewport narrows. It only gets closed once it's hit its minimum width and space is still tight.",
  "If there's still not enough room, the AI assistant panel follows the same pattern — it contracts first, and only gets closed once it's fully collapsed.",
  "Zooming in is treated the same as narrowing the viewport — it triggers this same sequence, in the same order.",
  "Anything closed automatically stays closed — it won't reappear on its own, only when the user brings it back.",
  "If the user brings back primary navigation or the secondary sidebar and there isn't room for it, it opens as an overlay on top of the content panel instead of pushing the layout aside.",
  "If the user brings back the AI assistant panel and there isn't room for it, it takes over the content panel's space instead of sitting next to it.",
  "Getting more room back — a bigger window or less zoom — doesn't automatically restore anything that was closed; that's still on the user.",
];

const qualityTabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'evaluations', label: 'Evaluations' },
  { id: 'reports', label: 'Reports' },
];

const DEFAULT_LABELS = ['Dashboards', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming', 'Budget', 'Refurbished'];

function buildLevels(levelCount) {
  return Array.from({ length: levelCount }, (_, i) => ({
    label: DEFAULT_LABELS[i] ?? `Level ${i + 1}`,
    type: 'link',
    href: '#',
  }));
}

export default {
  title: "Shell",
  component: Shell,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showAiPanel: {
      control: 'boolean',
      description: 'Show or hide the AI Assistant panel',
      table: { category: 'Layout' },
    },
    contentBreakpoint: {
      control: 'number',
      description: 'Min content width (px) before page sidebar auto-closes [400–1600]',
      table: { category: 'Layout' },
    },
    levelCount: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'Number of breadcrumb levels (0 = title only)',
      table: { category: 'Header' },
    },
    showSideNavTrigger: {
      control: 'boolean',
      description: 'Show the sidebar toggle button in the header',
      table: { category: 'Header' },
    },
    sidenavTriggerIcon: {
      control: 'radio',
      options: ['menu', 'panel-left-open'],
      description: 'Icon for the sidebar toggle button in the header',
      table: { category: 'Header' },
    },
    aiUserName: {
      control: 'text',
      description: 'User name shown in the AI panel greeting',
      table: { category: 'AI Panel' },
    },
    navTrigger: {
      control: 'radio',
      options: ['floating', 'floating-hover', 'top'],
      description: 'Nav collapse trigger style: floating button (always), floating button (hover only), or inline at top of nav (v2)',
      table: { category: 'Layout' },
    },
  },
  args: {
    showAiPanel: true,
    contentBreakpoint: 720,
    levelCount: 1,
    showSideNavTrigger: true,
    sidenavTriggerIcon: 'panel-left-open',
    aiUserName: 'John',
    navTrigger: 'floating',
  },
};

export const Default = {
  name: "Shell — Default",
  render: (args) => (
    <Shell
      showAiPanel={args.showAiPanel}
      contentBreakpoint={args.contentBreakpoint}
      navTrigger={args.navTrigger}
      aiUserName={args.aiUserName}
      header={
        <PageHeader
          levels={buildLevels(args.levelCount)}
          showSideNavTrigger={args.showSideNavTrigger}
          sidenavTriggerIcon={args.sidenavTriggerIcon}
          showAiTrigger
          tabsSlot={<Tabs items={qualityTabItems} variant="flush" />}
        />
      }
      // No page content — confirmed no-crash baseline. Nothing renders below the
      // header on any page.
    />
  ),
};

export const NoAiPanel = {
  name: "Shell — No AI Panel",
  args: { showAiPanel: false },
  render: (args) => (
    <Shell
      showAiPanel={args.showAiPanel}
      contentBreakpoint={args.contentBreakpoint}
      navTrigger={args.navTrigger}
      header={
        <PageHeader
          levels={buildLevels(args.levelCount)}
          showSideNavTrigger={args.showSideNavTrigger}
          sidenavTriggerIcon={args.sidenavTriggerIcon}
          showAiTrigger={false}
        />
      }
    />
  ),
};

export const ResponsiveBehavior = {
  name: "Shell — Responsive Behavior",
  parameters: { layout: "padded", controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 0" }}>
      <h1 className="lyra-heading-md" style={{ color: "var(--lyra-color-fg-default)", marginBottom: 8 }}>
        Responsive Layout Guidelines
      </h1>
      <p className="lyra-body-md" style={{ color: "var(--lyra-color-fg-secondary)", marginBottom: 24 }}>
        What happens to this page when the browser window gets smaller, or the browser is zoomed in.
      </p>
      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {RESPONSIVE_GUIDELINES.map((line) => (
          <li key={line} className="lyra-body-md" style={{ color: "var(--lyra-color-fg-default)", lineHeight: 1.6 }}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  ),
};

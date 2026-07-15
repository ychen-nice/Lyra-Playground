import Shell from "./Shell";
import PageHeader from "./PageHeader";

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
          showAiTrigger
        />
      }
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
          showAiTrigger={false}
        />
      }
    />
  ),
};

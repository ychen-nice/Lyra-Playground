import Shell from "./Shell";
import PageHeader from "./PageHeader";

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
    aiUserName: {
      control: 'text',
      description: 'User name shown in the AI panel greeting',
      table: { category: 'AI Panel' },
    },
  },
  args: {
    showAiPanel: true,
    contentBreakpoint: 720,
    aiUserName: 'John',
  },
};

const header = (
  <PageHeader
    levels={[{ label: 'Dashboards', type: 'link', href: '#' }]}
    showSideNavTrigger
    showAiTrigger
  />
);

export const Default = {
  name: "Shell — Default",
  render: (args) => (
    <Shell
      showAiPanel={args.showAiPanel}
      contentBreakpoint={args.contentBreakpoint}
      aiUserName={args.aiUserName}
      header={header}
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
      header={header}
    />
  ),
};

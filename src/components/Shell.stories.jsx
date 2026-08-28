import { Download } from "lucide-react";
import Shell from "./Shell";
import PageHeader from "./PageHeader";
import Grid from "./Grid";
import Panel from "./Panel";
import Button from "./Button";
import Tabs from "./Tabs";
import { LinkCellRenderer } from "./BaseGrid";

const qualityTabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'evaluations', label: 'Evaluations' },
  { id: 'reports', label: 'Reports' },
];

const qualityColumnDefs = [
  { field: 'name', headerName: 'Name', cellRenderer: LinkCellRenderer, flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'owner', headerName: 'Owner', flex: 1 },
];

const qualityRowData = Array.from({ length: 240 }, (_, i) => ({
  name: `Item ${i + 1}`,
  status: ['Active', 'Pending', 'Closed'][i % 3],
  owner: ['Alex', 'Jordan', 'Sam'][i % 3],
}));

const searchColumnDefs = [
  { field: 'session', headerName: 'Session', cellRenderer: LinkCellRenderer, flex: 1 },
  { field: 'channel', headerName: 'Channel', flex: 1 },
  { field: 'agent', headerName: 'Agent', flex: 1 },
];

const searchRowData = Array.from({ length: 180 }, (_, i) => ({
  session: `Session ${i + 1}`,
  channel: ['Chat', 'Voice', 'Email'][i % 3],
  agent: ['Alex', 'Jordan', 'Sam'][i % 3],
}));

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
      // header on any page. Add content back in deliberately to explore what
      // triggers the Storybook/React 19 crash from here.
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

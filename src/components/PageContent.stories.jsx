import { useArgs } from 'storybook/preview-api';
import { useEffect } from 'react';
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import DashboardList from "./DashboardList";

const MAX_LEVELS = 8;
const BREAKPOINT_MIN = 400;
const BREAKPOINT_MAX = 1600;
const clampBreakpoint = (v) => Math.max(BREAKPOINT_MIN, Math.min(BREAKPOINT_MAX, v ?? 960));

function ClampBreakpointDecorator(Story) {
  const [args, updateArgs] = useArgs();
  useEffect(() => {
    const clamped = clampBreakpoint(args.contentBreakpoint);
    if (clamped !== args.contentBreakpoint) updateArgs({ contentBreakpoint: clamped });
  }, [args.contentBreakpoint]);
  return <Story />;
}
const DEFAULT_LABELS = ['Dashboards', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming', 'Budget', 'Refurbished'];

function buildLevels(levelCount) {
  return Array.from({ length: levelCount }, (_, i) => ({
    label: DEFAULT_LABELS[i] ?? `Level ${i + 1}`,
    type: 'link',
    href: '#',
  }));
}

export default {
  title: "Content Panel",
  component: PageContent,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Content shell container (Figma 2338:2667). Hosts a PageHeader at the top and optionally an InternalSidebar.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "480px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    levelCount: {
      control: { type: 'range', min: 0, max: MAX_LEVELS, step: 1 },
      description: 'Number of breadcrumb levels (0 = title only)',
      table: { category: 'Breadcrumb' },
    },
    showSideNavTrigger: {
      control: 'boolean',
      description: 'Show the sidebar toggle button in the header',
      table: { category: 'Header' },
    },
    showAiTrigger: {
      control: 'boolean',
      description: 'Show the AI button in the header',
      table: { category: 'Header' },
    },
    showStatusBadge: {
      control: 'boolean',
      description: 'Show a status badge next to the page title',
      table: { category: 'Header' },
    },
    statusBadgeLabel: {
      control: 'text',
      description: 'Label for the status badge',
      table: { category: 'Header' },
    },
    contentBreakpoint: {
      control: 'number',
      description: 'Min content area width (px) before sidebar auto-closes [400–1600]',
      table: { category: 'Sidebar' },
    },
  },
  args: {
    levelCount: 1,
    showSideNavTrigger: true,
    showAiTrigger: true,
    showStatusBadge: false,
    statusBadgeLabel: 'Active',
    contentBreakpoint: 720,
  },
};

export const WithHeader = {
  name: "Interactive V1",
  decorators: [ClampBreakpointDecorator],
  render: (args) => (
    <PageContent
      header={
        <PageHeader
          levels={buildLevels(args.levelCount)}
          showSideNavTrigger={args.showSideNavTrigger}
          showAiTrigger={args.showAiTrigger}
          showStatusBadge={args.showStatusBadge}
          statusBadgeLabel={args.statusBadgeLabel}
        />
      }
      contentBreakpoint={clampBreakpoint(args.contentBreakpoint)}
    />
  ),
};

export const HeaderAndSidebarOpened = {
  name: "Header + Sidebar Opened",
  render: (args) => (
    <PageContent
      header={<PageHeader levels={buildLevels(args.levelCount)} />}
      sidebar={<DashboardList />}
      sidebarState="opened"
    />
  ),
};

export const HeaderAndSidebarOverlay = {
  name: "Header + Sidebar Overlay",
  render: (args) => (
    <PageContent
      header={<PageHeader levels={buildLevels(args.levelCount)} />}
      sidebar={<DashboardList />}
      sidebarState="overlay"
    />
  ),
};

export const SidebarHidden = {
  name: "Sidebar — Hidden",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="hidden" />,
  argTypes: { levelCount: { table: { disable: true } } },
};

export const SidebarOpened = {
  name: "Sidebar — Opened",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="opened" />,
  argTypes: { levelCount: { table: { disable: true } } },
};

export const SidebarOverlay = {
  name: "Sidebar — Overlay",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="overlay" />,
  argTypes: { levelCount: { table: { disable: true } } },
};

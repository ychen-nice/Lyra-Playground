import PageHeader from "./PageHeader";

const MAX_LEVELS = 8;
const DEFAULT_LABELS = ['Home', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming', 'Budget', 'Refurbished'];

function buildLevels(levelCount, linksStartAt) {
  return Array.from({ length: levelCount }, (_, i) => {
    const type  = (i + 1) >= linksStartAt && linksStartAt > 0 ? 'link' : 'label';
    const label = DEFAULT_LABELS[i] ?? `Level ${i + 1}`;
    return { label, type, href: type === 'link' ? '#' : undefined };
  });
}

function HeaderStory(args) {
  const { levelCount, linksStartAt, ...rest } = args;
  return <PageHeader {...rest} levels={buildLevels(levelCount, linksStartAt)} />;
}

export default {
  title: "Content Panel/Page Header",
  component: PageHeader,
  parameters: { layout: "padded" },
  argTypes: {
    title:            { control: "text",    description: "Page title text" },
    levelCount: {
      control: { type: 'range', min: 0, max: MAX_LEVELS, step: 1 },
      description: 'Number of breadcrumb levels (0 = title only)',
      table: { category: 'Breadcrumb' },
    },
    linksStartAt: {
      control: { type: 'range', min: 1, max: MAX_LEVELS, step: 1 },
      description: 'Links start at this level (levels before it are labels, 1 = all links)',
      table: { category: 'Breadcrumb' },
    },
    showSideNavTrigger: { control: "boolean", description: "Show/hide the sidebar toggle icon" },
    showBreadcrumb:     { control: "boolean", description: "Show/hide the breadcrumb hierarchy" },
    showStatusBadge:    { control: "boolean", description: "Show/hide the status badge" },
    statusBadgeLabel:   { control: "text",    description: "Status badge label" },
    showAiTrigger:      { control: "boolean", description: "Show/hide the AI button" },
    levels:             { control: false, table: { disable: true } },
    _sidebarOpen:       { control: false, table: { disable: true } },
    headerMiddleSlot:   { control: false, table: { disable: true } },
    headerActionsSlot:  { control: false, table: { disable: true } },
    breadcrumbSlot:     { control: false, table: { disable: true } },
  },
  args: {
    title:              "Page Title",
    levelCount:         1,
    linksStartAt:       1,
    showSideNavTrigger: true,
    showBreadcrumb:     true,
    showStatusBadge:    false,
    statusBadgeLabel:   "Active",
    showAiTrigger:      true,
  },
};

export const Default = {
  name: "Default",
  render: (args) => <HeaderStory {...args} />,
};

export const WithStatusBadge = {
  name: "With Status Badge",
  render: (args) => <HeaderStory {...args} />,
  args: { showStatusBadge: true },
};

export const NoSideNav = {
  name: "No Side Nav Trigger",
  render: (args) => <HeaderStory {...args} />,
  args: { showSideNavTrigger: false, showBreadcrumb: false },
};

export const NoAiTrigger = {
  name: "No AI Trigger",
  render: (args) => <HeaderStory {...args} />,
  args: { showAiTrigger: false },
};

export const ManyLevels = {
  name: "Many Levels (≥ 4)",
  render: (args) => <HeaderStory {...args} />,
  args: { levelCount: 5, linksStartAt: 1, title: "Product Detail" },
};

export const FullFeatured = {
  name: "Full Featured",
  render: (args) => <HeaderStory {...args} />,
  args: {
    showStatusBadge:    true,
    showSideNavTrigger: true,
    showBreadcrumb:     true,
    showAiTrigger:      true,
    title:              "Case Management",
    levelCount:         1,
    linksStartAt:       1,
    statusBadgeLabel:   "Active",
  },
};

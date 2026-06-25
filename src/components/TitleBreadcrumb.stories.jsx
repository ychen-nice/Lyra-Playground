import Breadcrumb from './TitleBreadcrumb';

const MAX_LEVELS = 8;

const DEFAULT_LABELS = [
  'Home', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming', 'Budget', 'Refurbished',
];

// linksStartAt: levels < linksStartAt are labels, levels >= linksStartAt are links (1-based)
// 0 = all labels, 1 = all links
function buildLevels(levelCount, linksStartAt) {
  return Array.from({ length: levelCount }, (_, i) => {
    const type  = (i + 1) >= linksStartAt && linksStartAt > 0 ? 'link' : 'label';
    const label = DEFAULT_LABELS[i] ?? `Level ${i + 1}`;
    return { label, type, href: type === 'link' ? '#' : undefined };
  });
}

function BreadcrumbStory(args) {
  const { levelCount, linksStartAt, title, showStatusBadge, statusBadgeLabel } = args;
  const levels = buildLevels(levelCount, linksStartAt);
  return (
    <Breadcrumb
      levels={levels}
      title={title}
      showStatusBadge={showStatusBadge}
      statusBadgeLabel={statusBadgeLabel}
    />
  );
}

export default {
  title: 'Navigation/Title Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div style={{ padding: 'var(--lyra-spacing-4) var(--lyra-spacing-8)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Current page title',
      table: { category: 'Title' },
    },
    showStatusBadge: {
      control: 'boolean',
      description: 'Show the green status badge',
      table: { category: 'Title' },
    },
    statusBadgeLabel: {
      control: 'text',
      description: 'Status badge text',
      table: { category: 'Title' },
    },
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
    levels:        { control: false },
    breadcrumbSlot:{ control: false },
  },
  args: {
    title:            'Page Title',
    showStatusBadge:  false,
    statusBadgeLabel: 'Active',
    levelCount:       3,
    linksStartAt:     1,
  },
};

// ── Default — resize Storybook viewport to watch breadcrumb collapse live ─────
export const Default = {
  name: 'Default',
  render: (args) => <BreadcrumbStory {...args} />,
};

// ── With status badge ─────────────────────────────────────────────────────────
export const WithStatusBadge = {
  name: 'With Status Badge',
  render: (args) => <BreadcrumbStory {...args} />,
  args: { showStatusBadge: true },
};

// ── Title only ────────────────────────────────────────────────────────────────
export const TitleOnly = {
  name: 'Title Only',
  render: (args) => <BreadcrumbStory {...args} />,
  args: { levelCount: 0 },
};

// ── Many levels (≥ 4 always uses a menu) ─────────────────────────────────────
export const ManyLevels = {
  name: 'Many Levels (≥ 4)',
  render: (args) => <BreadcrumbStory {...args} />,
  args: {
    levelCount:   6,
    linksStartAt: 1,
    title:        'Current Page',
  },
};

// ── Width simulation — same component at several fixed widths ─────────────────
export const WidthSimulation = {
  name: 'Width Simulation',
  render: (args) => {
    const { levelCount, linksStartAt, title, showStatusBadge, statusBadgeLabel } = args;
    const levels = buildLevels(levelCount, linksStartAt);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {[700, 400, 220].map(w => (
          <div key={w}>
            <div style={{ fontSize: 11, color: 'var(--lyra-color-fg-secondary)', marginBottom: 6 }}>
              {w}px
            </div>
            <div style={{
              width:        w,
              padding:      '0 var(--lyra-spacing-8)',
              borderBottom: 'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
              height:       '4.5rem',
              display:      'flex',
              alignItems:   'center',
              boxSizing:    'border-box',
              background:   'var(--lyra-color-bg-surface-base)',
            }}>
              <Breadcrumb
                levels={levels}
                title={title}
                showStatusBadge={showStatusBadge}
                statusBadgeLabel={statusBadgeLabel}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  args: {
    levelCount:   5,
    linksStartAt: 1,
    title:        'Current Page',
  },
};

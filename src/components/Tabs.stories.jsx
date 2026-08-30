import { useState } from 'react';
import { Folder, FileText, Settings } from 'lucide-react';
import Tabs from './Tabs';
import '../styles/typography.css';

const ICON_PROPS = { size: 14 };

const BASE_ITEMS = [
  { id: 'overview', label: 'Overview', icon: <Folder {...ICON_PROPS} /> },
  { id: 'files', label: 'Files', icon: <FileText {...ICON_PROPS} /> },
  { id: 'settings', label: 'Settings', icon: <Settings {...ICON_PROPS} /> },
];

// Shared by every story below so the showIcons/showError controls — defined
// once, globally, in argTypes — actually do something no matter which story
// the Controls panel happens to be showing them on.
function buildItems({ showIcons, showError }) {
  return BASE_ITEMS.map((item) => {
    const { icon, ...rest } = item;
    return {
      ...(showIcons ? item : rest),
      ...(item.id === 'files' ? { error: showError } : {}),
    };
  });
}

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: {
    alignment: {
      control: 'radio',
      options: ['left', 'fit'],
      description: '"left" sizes tabs to their content and left-aligns them; "fit" stretches tabs to divide the full width evenly. Only valid with the "default" variant — the control is hidden for "flush".',
      // 'fit' doesn't make sense for the flush variant (see Tabs.jsx) — hide the
      // control entirely rather than let it demonstrate a combination that isn't
      // actually reachable in the component.
      if: { arg: 'variant', eq: 'default' },
    },
    showError: {
      control: 'boolean',
      name: 'Show Error (Files tab)',
      description: 'Toggles the error indicator on the "Files" tab',
    },
    variant: {
      control: 'radio',
      options: ['default', 'flush'],
      description: '"default" pads each tab horizontally; "flush" removes that padding and uses a larger gap between tabs instead',
    },
    showIcons: {
      control: 'boolean',
      description: 'Toggles the leading icon on every tab',
    },
    items: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    onChange: { control: false, table: { disable: true } },
  },
  args: {
    alignment: 'left',
    variant: 'default',
    showError: false,
  },
};

// ── Demo — every control together ────────────────────────────────────────

export const Demo = {
  name: 'Demo',
  args: {
    variant: 'default',
    showIcons: true,
  },
  render: ({ showError, showIcons, ...args }) => (
    <Tabs
      {...args}
      items={BASE_ITEMS.map((item) => {
        const { icon, ...rest } = item;
        return {
          ...(showIcons ? item : rest),
          ...(item.id === 'files' ? { error: showError } : {}),
        };
      })}
    />
  ),
};

export const Default = {
  name: 'Default',
  render: ({ showError, ...args }) => (
    <Tabs
      {...args}
      items={BASE_ITEMS.map((item) => (item.id === 'files' ? { ...item, error: showError } : item))}
    />
  ),
};

export const FlushVariant = {
  name: 'Variant — Flush',
  args: { variant: 'flush' },
  render: (args) => <Tabs {...args} items={BASE_ITEMS} />,
};

export const FitAlignment = {
  name: 'Alignment — Fit',
  args: { alignment: 'fit' },
  render: (args) => <Tabs {...args} items={BASE_ITEMS} />,
};

export const NoIcons = {
  name: 'No Icons',
  render: (args) => (
    <Tabs {...args} items={BASE_ITEMS.map(({ icon, ...item }) => item)} />
  ),
};

export const WithDisabledAndError = {
  name: 'Disabled & Error States',
  render: (args) => (
    <Tabs
      {...args}
      items={[
        { id: 'overview', label: 'Overview', icon: <Folder {...ICON_PROPS} /> },
        { id: 'files', label: 'Files', icon: <FileText {...ICON_PROPS} />, error: true },
        { id: 'settings', label: 'Settings', icon: <Settings {...ICON_PROPS} />, disabled: true },
      ]}
    />
  ),
};

function ControlledTabsDemo() {
  const [value, setValue] = useState('overview');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-4)' }}>
      <Tabs items={BASE_ITEMS} value={value} onChange={setValue} />
      <p className="lyra-body-md" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
        Active tab: <strong>{value}</strong>
      </p>
    </div>
  );
}

export const Controlled = {
  name: 'Controlled',
  parameters: { controls: { disable: true } },
  render: () => <ControlledTabsDemo />,
};

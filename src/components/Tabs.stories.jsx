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

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: {
    alignment: {
      control: 'radio',
      options: ['left', 'fit'],
      description: '"left" sizes tabs to their content and left-aligns them; "fit" stretches tabs to divide the full width evenly',
    },
    showError: {
      control: 'boolean',
      name: 'Show Error (Files tab)',
      description: 'Toggles the error indicator on the "Files" tab',
    },
    items: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    onChange: { control: false, table: { disable: true } },
  },
  args: {
    alignment: 'left',
    showError: false,
  },
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

export const FitAlignment = {
  name: 'Alignment — Fit',
  render: (args) => <Tabs {...args} items={BASE_ITEMS} alignment="fit" />,
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

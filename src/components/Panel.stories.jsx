import Panel from './Panel';
import Button from './Button';

export default {
  title: 'Components/Panel',
  component: Panel,
  parameters: { layout: 'padded' },
  argTypes: {
    showFrame: { control: 'boolean' },
    showToolbar: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    showFrame: true,
    showToolbar: true,
  },
};

const Content = () => (
  <div style={{ padding: 'var(--lyra-spacing-4)', color: 'var(--lyra-color-fg-secondary)' }}>
    Panel content
  </div>
);

export const Default = {
  render: (args) => (
    <div style={{ width: 526, height: 391 }}>
      <Panel {...args} actionsSlot={<Button variant="ghost" size="md">Action</Button>}>
        <Content />
      </Panel>
    </div>
  ),
};

export const Frameless = {
  render: (args) => (
    <div style={{ width: 526, height: 391 }}>
      <Panel {...args} showFrame={false} actionsSlot={<Button variant="ghost" size="md">Action</Button>}>
        <Content />
      </Panel>
    </div>
  ),
};

export const NoToolbar = {
  name: 'No Toolbar',
  render: (args) => (
    <div style={{ width: 526, height: 391 }}>
      <Panel {...args} showToolbar={false}>
        <Content />
      </Panel>
    </div>
  ),
};

export const NoActions = {
  name: 'No Actions',
  render: (args) => (
    <div style={{ width: 526, height: 391 }}>
      <Panel {...args}>
        <Content />
      </Panel>
    </div>
  ),
};

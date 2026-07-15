import { useState, useEffect } from 'react';
import SideNavigation from './SideNavigation';

export default {
  title: 'Shell/Side Navigation',
  component: SideNavigation,
  parameters: { layout: 'centered' },
  argTypes: {
    minimized: {
      control: 'boolean',
      description: 'Minimized mode — shows icons only',
    },
    trigger: {
      control: 'radio',
      options: ['floating', 'floating-hover', 'top'],
      description: 'floating = v1 always, floating-hover = v1 on hover, top = v2 inline',
    },
  },
  args: {
    minimized: false,
    trigger: 'floating',
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};

function InteractiveNav({ initialMinimized, trigger }) {
  const [minimized, setMinimized] = useState(initialMinimized);
  useEffect(() => { setMinimized(initialMinimized); }, [initialMinimized]);
  return (
    <SideNavigation
      minimized={minimized}
      triggerVisibility={trigger === 'floating-hover' ? 'hover' : 'always'}
      version={trigger === 'top' ? 'v2' : 'v1'}
      onToggle={() => setMinimized(m => !m)}
    />
  );
}

export const Open = {
  name: 'Open',
  render: (args) => <InteractiveNav initialMinimized={false} trigger={args.trigger} />,
  args: { minimized: false },
};

export const Minimized = {
  name: 'Minimized',
  render: (args) => <InteractiveNav initialMinimized={true} trigger={args.trigger} />,
  args: { minimized: true },
};

export const Interactive = {
  name: 'Interactive (toggle via control)',
  render: (args) => <InteractiveNav initialMinimized={args.minimized} trigger={args.trigger} />,
};

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
  },
  args: {
    minimized: false,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};

function InteractiveNav({ initialMinimized }) {
  const [minimized, setMinimized] = useState(initialMinimized);
  useEffect(() => { setMinimized(initialMinimized); }, [initialMinimized]);
  return <SideNavigation minimized={minimized} onToggle={() => setMinimized(m => !m)} />;
}

export const Open = {
  name: 'Open',
  render: (args) => <InteractiveNav initialMinimized={false} />,
  args: { minimized: false },
};

export const Minimized = {
  name: 'Minimized',
  render: (args) => <InteractiveNav initialMinimized={true} />,
  args: { minimized: true },
};

export const Interactive = {
  name: 'Interactive (toggle via control)',
  render: (args) => <InteractiveNav initialMinimized={args.minimized} />,
};

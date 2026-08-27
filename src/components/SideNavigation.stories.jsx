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

// Mirrors Shell.jsx's own floating nav overlay markup (see its `lyra-side-nav-overlay`
// div) — the fallback presentation used when there isn't room to dock the nav expanded,
// per the content area's breakpoint. Reproduced standalone here (rather than reusing the
// Shell component) since triggering it for real requires simulating a narrow content
// area; a mock content panel behind it demonstrates why the panel is inset 1px top and
// bottom — so the content panel's own border peeks out from behind it on both edges.
function OverlayDemo() {
  return (
    <div style={{
      position: 'relative', width: 700, height: 480,
      background: 'var(--lyra-color-bg-surface-shell, #f3f5f7)',
      borderRadius: 'var(--lyra-radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Mock content panel, standing in for Shell's "Content - shell" card */}
      <div style={{
        position: 'absolute', top: 0, left: 12, right: 12, bottom: 12,
        background: 'var(--lyra-color-bg-surface-base, #ffffff)',
        border: '1px solid var(--lyra-color-border-subtle, rgba(0,0,0,0.1))',
        borderRadius: 'var(--lyra-radius-lg)',
        boxShadow: 'var(--lyra-shadow-sm)',
      }} />
      {/* Clipping wrapper — wider than the panel so its shadow can bleed rightward
          without also un-cropping it top/bottom (see Shell.jsx for the full rationale). */}
      <div style={{
        position: 'absolute', top: 1, left: 0, bottom: 1 + 12, zIndex: 10,
        width: 320, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: 'fit-content',
          borderRight: '1px solid var(--lyra-color-border-subtle, rgba(0,0,0,0.1))',
          boxShadow: 'var(--lyra-shadow-xl)',
          background: 'var(--lyra-color-bg-surface-shell, #f3f5f7)',
        }}>
          <SideNavigation minimized={false} showToggle={false} />
        </div>
      </div>
    </div>
  );
}

export const OpenOverlay = {
  name: 'Open — Overlay',
  render: () => <OverlayDemo />,
};

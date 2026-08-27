import { useState } from 'react';
import { Plus, Trash2, Download, ChevronRight, Sparkles, Search, Settings, X, Bold, Italic, Underline } from 'lucide-react';
import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive', 'toggle'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    active:   { control: 'boolean', description: '`toggle` variant only — the pressed/on look' },
  },
};

// ── Interactive playground ──────────────────────────────────────────────────

export const Playground = {
  args: {
    variant:  'primary',
    size:     'md',
    children: 'Button',
    disabled: false,
  },
};

// ── All variants ────────────────────────────────────────────────────────────

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="toggle">Toggle</Button>
    </div>
  ),
};

// ── Toggle ──────────────────────────────────────────────────────────────────
// A secondary button that also recognizes a persisted on/off `active` state —
// border-active, bg-active-subtle, fg-active-strong — for things like a
// pressed formatting button or a filter chip.

export const Toggle = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="toggle">Off</Button>
      <Button variant="toggle" active>On</Button>
      <Button variant="toggle" disabled>Disabled</Button>
    </div>
  ),
};

function ToggleGroupDemo() {
  const [active, setActive] = useState({ bold: true, italic: false, underline: false });
  const toggle = (key) => setActive(a => ({ ...a, [key]: !a[key] }));
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <Button variant="toggle" size="md" iconOnly aria-label="Bold" active={active.bold} onClick={() => toggle('bold')}>
        <Bold />
      </Button>
      <Button variant="toggle" size="md" iconOnly aria-label="Italic" active={active.italic} onClick={() => toggle('italic')}>
        <Italic />
      </Button>
      <Button variant="toggle" size="md" iconOnly aria-label="Underline" active={active.underline} onClick={() => toggle('underline')}>
        <Underline />
      </Button>
    </div>
  );
}

export const ToggleGroup = {
  name: 'Toggle (interactive group)',
  parameters: { controls: { disable: true } },
  render: () => <ToggleGroupDemo />,
};

// ── All sizes ───────────────────────────────────────────────────────────────

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

// ── With icons ──────────────────────────────────────────────────────────────

export const WithLeftIcon = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary"     leftIcon={<Plus />}>Add item</Button>
      <Button variant="secondary"   leftIcon={<Download />}>Export</Button>
      <Button variant="ghost"       leftIcon={<Sparkles />}>AI</Button>
      <Button variant="destructive" leftIcon={<Trash2 />}>Delete</Button>
    </div>
  ),
};

export const WithRightIcon = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary"   rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="secondary" rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="ghost"     rightIcon={<ChevronRight />}>Next</Button>
    </div>
  ),
};

export const WithBothIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary"   leftIcon={<Sparkles />} rightIcon={<ChevronRight />}>Generate</Button>
      <Button variant="secondary" leftIcon={<Download />} rightIcon={<ChevronRight />}>Export all</Button>
    </div>
  ),
};

// ── Icon sizes by button size ───────────────────────────────────────────────

export const IconSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="secondary" size="sm" leftIcon={<Plus />}>Small (12px icon)</Button>
      <Button variant="secondary" size="md" leftIcon={<Plus />}>Medium (16px icon)</Button>
      <Button variant="secondary" size="lg" leftIcon={<Plus />}>Large (16px icon)</Button>
    </div>
  ),
};

// ── Icon-only buttons ───────────────────────────────────────────────────────

export const IconOnly = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Sizes */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="ghost" size="sm" iconOnly aria-label="Search"><Search /></Button>
        <Button variant="ghost" size="md" iconOnly aria-label="Search"><Search /></Button>
        <Button variant="ghost" size="lg" iconOnly aria-label="Search"><Search /></Button>
      </div>
      {/* Variants */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="primary"     size="md" iconOnly aria-label="Add"><Plus /></Button>
        <Button variant="secondary"   size="md" iconOnly aria-label="Settings"><Settings /></Button>
        <Button variant="ghost"       size="md" iconOnly aria-label="Close"><X /></Button>
        <Button variant="destructive" size="md" iconOnly aria-label="Delete"><Trash2 /></Button>
      </div>
      {/* Disabled */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="primary"     size="md" iconOnly disabled aria-label="Add"><Plus /></Button>
        <Button variant="secondary"   size="md" iconOnly disabled aria-label="Settings"><Settings /></Button>
        <Button variant="ghost"       size="md" iconOnly disabled aria-label="Close"><X /></Button>
        <Button variant="destructive" size="md" iconOnly disabled aria-label="Delete"><Trash2 /></Button>
      </div>
    </div>
  ),
};

// ── Disabled states ─────────────────────────────────────────────────────────

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary"     disabled>Primary</Button>
      <Button variant="secondary"   disabled>Secondary</Button>
      <Button variant="ghost"       disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
};

// ── Full matrix ─────────────────────────────────────────────────────────────

export const Matrix = {
  render: () => {
    const variants = ['primary', 'secondary', 'ghost', 'destructive'];
    const sizes    = ['sm', 'md', 'lg'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sizes.map(size => (
          <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {variants.map(variant => (
              <Button key={variant} variant={variant} size={size} leftIcon={<Plus />}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

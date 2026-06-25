import { Plus, Trash2, Download, ChevronRight, Sparkles, Search, Settings, X } from 'lucide-react';
import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
    </div>
  ),
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

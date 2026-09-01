import { useState } from "react";
import { X } from "lucide-react";
import Badge from "./Badge";

const COLORS = ['slate', 'red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple', 'pink'];

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-1)' }}>
      <span className="lyra-body-sm-em" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{label}</span>
      {children}
    </label>
  );
}

function RadioGroupField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <div style={{ display: 'flex', gap: 'var(--lyra-spacing-3)' }}>
        {options.map((opt) => (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-1)', cursor: 'pointer' }}>
            <input type="radio" checked={value === opt.value} onChange={() => onChange(opt.value)} />
            <span className="lyra-body-md">{opt.label ?? opt.value}</span>
          </label>
        ))}
      </div>
    </Field>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="lyra-body-md">{label}</span>
    </label>
  );
}

// "small" isn't a real size for type="label" (see Badge.jsx's LABEL_SIZES,
// which only has large/medium) — rather than show it as a selectable option
// that silently does nothing, the label type gets its own size control with
// just the sizes that apply to it.
function resolveSize(args) {
  return args.type === 'label' ? args.labelSize : args.size;
}

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  argTypes: {
    color: { control: "select", options: COLORS },
    colorStyle: { control: "radio", options: ["subtle", "strong"] },
    size: { control: "radio", options: ["large", "medium", "small"], if: { arg: "type", neq: "label" } },
    labelSize: {
      name: "size",
      control: "radio",
      options: ["large", "medium"],
      description: "The label type has no small size",
      if: { arg: "type", eq: "label" },
    },
    type: {
      options: ["label", "counter", "icon"],
      // Displayed as "Value" — "counter" is the internal Badge.jsx prop value.
      control: { type: "radio", labels: { label: "Label", counter: "Value", icon: "Icon" } },
    },
    children: { control: "text" },
    // Leading/trailing icons only exist on type="label" — hidden otherwise
    // rather than shown greyed-out and doing nothing.
    showLeadingIcon: {
      control: "boolean",
      name: "Leading Icon",
      description: "Adds a leading icon (label type only)",
      if: { arg: "type", eq: "label" },
    },
    showTrailingIcon: {
      control: "boolean",
      name: "Trailing Icon",
      description: "Adds a trailing icon (label type only)",
      if: { arg: "type", eq: "label" },
    },
  },
  args: {
    color: "slate",
    colorStyle: "subtle",
    size: "large",
    labelSize: "large",
    type: "label",
    children: "Label",
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

// Auto-supplies sensible content per type when the shared "children" text
// control doesn't apply — an icon for type="icon" (which has no text), and a
// number instead of the leftover default label text for type="counter".
export const Default = {
  name: "Default",
  render: ({ children, showLeadingIcon, showTrailingIcon, labelSize, ...args }) => {
    const size = resolveSize({ ...args, labelSize });
    if (args.type === 'icon') return <Badge {...args} size={size} icon={<X />} />;
    if (args.type === 'counter') {
      const content = children === 'Label' ? '9' : children;
      return <Badge {...args} size={size}>{content}</Badge>;
    }
    return (
      <Badge {...args} size={size} leadingIcon={showLeadingIcon ? <X /> : undefined} trailingIcon={showTrailingIcon ? <X /> : undefined}>
        {children}
      </Badge>
    );
  },
};

// Its own control panel, built from plain inputs rather than Storybook's
// Controls addon — usable standalone (e.g. embedded, or with the addon panel
// hidden), not just inside the Storybook UI.
function AllColorsDemo() {
  const [type, setType] = useState('label');
  const [colorStyle, setColorStyle] = useState('subtle');
  const [size, setSize] = useState('large'); // counter/icon sizes
  const [labelSize, setLabelSize] = useState('large'); // label has no "small"
  const [showLeadingIcon, setShowLeadingIcon] = useState(false);
  const [showTrailingIcon, setShowTrailingIcon] = useState(false);
  const effectiveSize = type === 'label' ? labelSize : size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-4)' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--lyra-spacing-6)',
        padding: 'var(--lyra-spacing-4)', borderRadius: 'var(--lyra-radius-md)',
        border: '1px solid var(--lyra-color-border-subtle)', background: 'var(--lyra-color-bg-surface-container-subtle)',
      }}>
        <RadioGroupField
          label="Type"
          value={type}
          onChange={setType}
          options={[{ value: 'label', label: 'Label' }, { value: 'counter', label: 'Value' }, { value: 'icon', label: 'Icon' }]}
        />
        <RadioGroupField
          label="Color Style"
          value={colorStyle}
          onChange={setColorStyle}
          options={[{ value: 'subtle' }, { value: 'strong' }]}
        />
        {type === 'label' ? (
          <RadioGroupField label="Size" value={labelSize} onChange={setLabelSize} options={[{ value: 'large' }, { value: 'medium' }]} />
        ) : (
          <RadioGroupField label="Size" value={size} onChange={setSize} options={[{ value: 'large' }, { value: 'medium' }, { value: 'small' }]} />
        )}
        {type === 'label' && (
          <Field label="Icons">
            <div style={{ display: 'flex', gap: 'var(--lyra-spacing-3)' }}>
              <CheckboxField label="Leading" checked={showLeadingIcon} onChange={setShowLeadingIcon} />
              <CheckboxField label="Trailing" checked={showTrailingIcon} onChange={setShowTrailingIcon} />
            </div>
          </Field>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--lyra-spacing-2)' }}>
        {COLORS.map((color, i) => {
          if (type === 'icon') return <Badge key={color} type="icon" colorStyle={colorStyle} size={effectiveSize} color={color} icon={<X />} />;
          if (type === 'counter') return <Badge key={color} type="counter" colorStyle={colorStyle} size={effectiveSize} color={color}>{i + 1}</Badge>;
          return (
            <Badge
              key={color}
              type="label"
              colorStyle={colorStyle}
              size={effectiveSize}
              color={color}
              leadingIcon={showLeadingIcon ? <X /> : undefined}
              trailingIcon={showTrailingIcon ? <X /> : undefined}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export const AllColors = {
  name: "All Colors",
  parameters: { controls: { disable: true } },
  render: () => <AllColorsDemo />,
};

export const SubtleVsStrong = {
  name: "Subtle vs. Strong",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-3)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--lyra-spacing-2)' }}>
        {COLORS.map((color) => (
          <Badge key={color} color={color} colorStyle="subtle">{color[0].toUpperCase() + color.slice(1)}</Badge>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--lyra-spacing-2)' }}>
        {COLORS.map((color) => (
          <Badge key={color} color={color} colorStyle="strong">{color[0].toUpperCase() + color.slice(1)}</Badge>
        ))}
      </div>
    </div>
  ),
};

export const LabelSizes = {
  name: "Label — Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-3)' }}>
      <Badge type="label" size="large">Large</Badge>
      <Badge type="label" size="medium">Medium</Badge>
    </div>
  ),
};

export const LabelWithIcons = {
  name: "Label — With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-3)' }}>
      <Badge type="label" leadingIcon={<X />}>Leading</Badge>
      <Badge type="label" trailingIcon={<X />}>Trailing</Badge>
      <Badge type="label" leadingIcon={<X />} trailingIcon={<X />}>Both</Badge>
    </div>
  ),
};

export const CounterSizes = {
  name: "Counter — Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-3)' }}>
      <Badge type="counter" size="large">9</Badge>
      <Badge type="counter" size="medium">9</Badge>
      <Badge type="counter" size="small">9</Badge>
      <Badge type="counter" size="large">99+</Badge>
    </div>
  ),
};

export const IconSizes = {
  name: "Icon — Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-3)' }}>
      <Badge type="icon" size="large" icon={<X />} />
      <Badge type="icon" size="medium" icon={<X />} />
      <Badge type="icon" size="small" icon={<X />} />
    </div>
  ),
};

export const AllTypes = {
  name: "All Types",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-3)' }}>
      <Badge type="label" color="blue">Label</Badge>
      <Badge type="counter" color="blue">9</Badge>
      <Badge type="icon" color="blue" icon={<X />} />
    </div>
  ),
};

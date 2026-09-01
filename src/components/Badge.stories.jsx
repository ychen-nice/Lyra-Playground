import { X } from "lucide-react";
import Badge from "./Badge";

const COLORS = ['slate', 'red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple', 'pink'];

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
    type: { control: "radio", options: ["label", "counter", "icon"] },
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

export const AllColors = {
  name: "All Colors",
  argTypes: {
    // Overridden per badge below — the shared color control doesn't apply here.
    color: { table: { disable: true } },
  },
  render: ({ children, showLeadingIcon, showTrailingIcon, labelSize, ...args }) => {
    const size = resolveSize({ ...args, labelSize });
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--lyra-spacing-2)' }}>
        {COLORS.map((color, i) => {
          if (args.type === 'icon') return <Badge key={color} {...args} size={size} color={color} icon={<X />} />;
          if (args.type === 'counter') return <Badge key={color} {...args} size={size} color={color}>{i + 1}</Badge>;
          return (
            <Badge
              key={color}
              {...args}
              size={size}
              color={color}
              leadingIcon={showLeadingIcon ? <X /> : undefined}
              trailingIcon={showTrailingIcon ? <X /> : undefined}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>
          );
        })}
      </div>
    );
  },
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

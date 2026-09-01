import { Folder } from "lucide-react";
import QueryChip from "./QueryChip";

export default {
  title: "Components/QueryChip",
  component: QueryChip,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["inactive", "inactiveShort", "active", "error", "readOnly", "disabled"] },
    filterName: { control: "text" },
    operator: { control: "text" },
    value: { control: "text" },
    showOperator: { control: "boolean" },
    showIcon: { control: "boolean" },
    removable: { control: "boolean" },
    mandatory: { control: "boolean", description: "Shows a red \"*\" — only visible in the inactiveShort (filter-picker) step" },
  },
  args: {
    status: "inactive",
    filterName: "Filter",
    operator: "Equal",
    value: "select...",
    showOperator: true,
    showIcon: false,
    removable: true,
    mandatory: false,
  },
};

export const Default = {
  name: "Default",
  render: (args) => <QueryChip {...args} icon={args.showIcon ? <Folder /> : undefined} />,
};

// Mirrors the Figma frame's own stack of states for this exact chip content.
export const AllStatuses = {
  name: "All Statuses",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-3)', alignItems: 'flex-start' }}>
      <QueryChip status="inactive" />
      <QueryChip status="inactiveShort" mandatory />
      <QueryChip status="active" value="Value" />
      <QueryChip status="error" value="Value" />
      <QueryChip status="readOnly" value="Value" />
      <QueryChip status="disabled" />
    </div>
  ),
};

export const WithOperator = {
  name: "With Operator",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-3)', alignItems: 'flex-start' }}>
      <QueryChip status="inactive" showOperator />
      <QueryChip status="active" showOperator value="Value" />
      <QueryChip status="error" showOperator value="Value" />
      <QueryChip status="readOnly" showOperator value="Value" />
    </div>
  ),
};

export const WithIcon = {
  name: "With Leading Icon",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-3)', alignItems: 'flex-start' }}>
      <QueryChip status="active" showIcon icon={<Folder />} showOperator value="Value" />
      <QueryChip status="inactive" showIcon icon={<Folder />} showOperator />
    </div>
  ),
};

export const NotRemovable = {
  name: "Not Removable",
  parameters: { controls: { disable: true } },
  render: () => <QueryChip status="active" showOperator value="Value" removable={false} />,
};

function FilterBarDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--lyra-spacing-2)', alignItems: 'center' }}>
      <QueryChip status="active" filterName="Status" showOperator value="Open" />
      <QueryChip status="active" filterName="Owner" showOperator operator="Is" value="Jordan" />
      <QueryChip status="error" filterName="Due date" showOperator value="Value" />
      <QueryChip status="inactiveShort" />
    </div>
  );
}

export const FilterBar = {
  name: "Filter Bar (composed)",
  parameters: { controls: { disable: true } },
  render: () => <FilterBarDemo />,
};

import { Copy, Trash2, Download, Share2 } from "lucide-react";
import Toolbar from "./Toolbar";
import Button from "./Button";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: { layout: "padded" },
  argTypes: {
    withBackground: { control: "boolean", description: "Tinted (bg-control-subtle) vs. transparent background" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    loopFocus: { control: "boolean", description: "Arrow-key focus wraps at the toolbar's boundary" },
    disabled: { control: "boolean" },
  },
  args: {
    withBackground: true,
    orientation: "horizontal",
    loopFocus: true,
    disabled: false,
  },
};

// leftSlot holds text (here, an item counter) and grows to fill remaining space;
// rightSlot holds form controls (here, Share and Export ghost buttons) and stays
// right-aligned at its natural width.
export const Default = {
  name: "Default",
  render: (args) => (
    <Toolbar
      {...args}
      leftSlot={<span className="lyra-body-md-em">240 items</span>}
      rightSlot={
        <>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Share2 size={16} />}>Share</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
        </>
      }
    />
  ),
};

export const NoBackground = {
  name: "No Background",
  args: { withBackground: false },
  render: (args) => (
    <Toolbar
      {...args}
      leftSlot={<span className="lyra-body-md-em">240 items</span>}
      rightSlot={
        <>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Share2 size={16} />}>Share</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
        </>
      }
    />
  ),
};

export const CustomActions = {
  name: "Custom Actions",
  render: (args) => (
    <Toolbar
      {...args}
      leftSlot={<span className="lyra-body-md-em">Session — 240 items</span>}
      rightSlot={
        <>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
          <Toolbar.Button variant="primary" size="md">Save</Toolbar.Button>
        </>
      }
    />
  ),
};

// Mirrors Base UI's own Toolbar demo shape: Root > Group + Separator + Group, with
// roving-tabindex arrow-key navigation across every item regardless of grouping —
// Tab into the toolbar focuses one item, then Left/Right (or Up/Down when vertical)
// move focus between items, wrapping at the ends when loopFocus is on.
export const ComposedWithGroups = {
  name: "Composed (Groups + Separator)",
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Copy"><Copy size={16} /></Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Share"><Share2 size={16} /></Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Download"><Download size={16} /></Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Delete"><Trash2 size={16} /></Toolbar.Button>
      </Toolbar.Group>
      <div style={{ flex: '1 0 0' }} />
      <Toolbar.Link href="#">Learn more</Toolbar.Link>
    </Toolbar>
  ),
};

export const Vertical = {
  name: "Vertical Orientation",
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ width: 240 }}>
      <Toolbar {...args}>
        <Toolbar.Group style={{ width: '100%' }}>
          <Toolbar.Button variant="ghost" size="md">First</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md">Second</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md">Third</Toolbar.Button>
        </Toolbar.Group>
      </Toolbar>
    </div>
  ),
};

// Note: unlike Base UI's own disabled items, this one is skipped by keyboard
// navigation entirely (see the focusableWhenDisabled comment in Toolbar.jsx) since
// it's built on this project's Button, which ties disabled styling to the native
// `disabled` attribute.
export const DisabledItem = {
  name: "Disabled Item",
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md">First</Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" disabled>Disabled</Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md">Third</Toolbar.Button>
      </Toolbar.Group>
    </Toolbar>
  ),
};

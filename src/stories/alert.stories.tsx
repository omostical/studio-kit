import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "@/components/ui";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    intent: "info",
    layout: "vertical",
    title: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    dismissible: true,
    actionLabel: "Label",
  },
  argTypes: {
    intent: { control: "select", options: ["info", "success", "warning", "error"] },
    layout: { control: "radio", options: ["vertical", "horizontal"] },
    dismissible: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-[508px]">
      <Alert intent="info" title="Heads up" description="A new version is available." dismissible />
      <Alert intent="success" title="Saved" description="Your changes have been published." dismissible />
      <Alert intent="warning" title="Approaching limit" description="You've used 80% of your monthly quota." dismissible />
      <Alert intent="error" title="Couldn't save" description="Check your connection and try again." dismissible />
    </div>
  ),
};

export const VerticalVsHorizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-neutral-400 mb-2">Vertical</p>
        <Alert
          intent="info"
          layout="vertical"
          title="Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing."
          actionLabel="Label"
          dismissible
        />
      </div>
      <div>
        <p className="text-xs text-neutral-400 mb-2">Horizontal</p>
        <Alert
          intent="info"
          layout="horizontal"
          title="Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing."
          actionLabel="Label"
          dismissible
        />
      </div>
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { description: undefined, actionLabel: undefined, dismissible: false },
};

export const WithoutAction: Story = {
  args: { actionLabel: undefined },
};

export const NotDismissible: Story = {
  args: { dismissible: false },
};

export const HorizontalAll: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-[570px]">
      {(["info", "success", "warning", "error"] as const).map((intent) => (
        <Alert
          key={intent}
          intent={intent}
          layout="horizontal"
          title="Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing."
          actionLabel="Label"
          dismissible
        />
      ))}
    </div>
  ),
};

export const CustomAction: Story = {
  args: {
    actionLabel: undefined,
    action: (
      <a href="#" className="text-sm font-medium underline text-[var(--text-primary)]">
        Learn more →
      </a>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    status: "info",
    position: "horizontal",
    title: "Your trial ends in 3 days",
    description: "Add a payment method to keep your projects and team.",
  },
  argTypes: {
    status: { control: "select", options: ["error", "warning", "success", "info"], description: "Figma: Status" },
    position: { control: "inline-radio", options: ["horizontal", "vertical"], description: "Figma: Position" },
    dismissible: { control: "boolean", description: "Figma: Dismiss" },
  },
  decorators: [(Story) => <div className="max-w-[688px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["error", "warning", "success", "info"] as const).map((status) => (
        <Alert key={status} {...args} status={status} title={`${status[0].toUpperCase()}${status.slice(1)} title`} actionLabel="Action" dismissible />
      ))}
    </div>
  ),
};

export const Vertical: Story = { args: { position: "vertical", actionLabel: "Add payment method", dismissible: true } };

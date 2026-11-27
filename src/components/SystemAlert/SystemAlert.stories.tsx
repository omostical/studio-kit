import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SystemAlert } from "./SystemAlert";

const statuses = ["danger", "warning", "success", "info", "neutral"] as const;

const meta: Meta<typeof SystemAlert> = {
  title: "Components/SystemAlert",
  component: SystemAlert,
  tags: ["autodocs"],
  args: {
    status: "info",
    emphasis: "high",
    message: "Scheduled maintenance on Sunday 02:00–04:00 UTC. Save your work before then.",
    actionLabel: "Learn more",
    dismissible: true,
  },
  argTypes: {
    status: { control: "inline-radio", options: statuses, description: "Figma: Status" },
    emphasis: { control: "inline-radio", options: ["high", "low"], description: "Figma: Emphasis" },
    dismissible: { control: "boolean", description: "Figma: Dismissible" },
  },
};
export default meta;
type Story = StoryObj<typeof SystemAlert>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-gap-5">
      {(["high", "low"] as const).flatMap((emphasis) =>
        statuses.map((status) => <SystemAlert key={emphasis + status} {...args} status={status} emphasis={emphasis} message={`${status} · ${emphasis}: Your trial ends in 3 days. Add a payment method to keep your projects.`} />)
      )}
    </div>
  ),
};

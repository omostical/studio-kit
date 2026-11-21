import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "./Badge";

const statuses = ["negative", "notice", "positive", "info", "neutral"] as const;

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Active", status: "positive", emphasis: "low", shape: "round", size: "medium" },
  argTypes: {
    status: { control: "select", options: statuses, description: "Figma: Status" },
    emphasis: { control: "inline-radio", options: ["low", "high"], description: "Figma: Emphasis" },
    shape: { control: "inline-radio", options: ["round", "square"], description: "Figma: Shape" },
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["low", "high"] as const).map((emphasis) => (
        <div key={emphasis} className="flex items-center gap-gap-5">
          {statuses.map((status) => (
            <Badge key={status} {...args} status={status} emphasis={emphasis}>
              {status}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcon: Story = { args: { icon: <CheckCircle2 />, children: "Paid" } };

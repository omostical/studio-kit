import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "success", "warning", "danger", "outline"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};

export const Brand: Story = {
  args: { children: "New", variant: "brand" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success", dot: true },
};

export const Warning: Story = {
  args: { children: "Pending", variant: "warning", dot: true },
};

export const Danger: Story = {
  args: { children: "Removed", variant: "danger" },
};

export const Outline: Story = {
  args: { children: "Draft", variant: "outline" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="brand">Small</Badge>
      <Badge size="md" variant="brand">Medium</Badge>
      <Badge size="lg" variant="brand">Large</Badge>
    </div>
  ),
};

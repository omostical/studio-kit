import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Button", variant: "primary", size: "md" },
};

export const Secondary: Story = {
  args: { children: "Button", variant: "secondary", size: "md" },
};

export const Outline: Story = {
  args: { children: "Button", variant: "outline", size: "md" },
};

export const Ghost: Story = {
  args: { children: "Button", variant: "ghost", size: "md" },
};

export const Danger: Story = {
  args: { children: "Delete", variant: "danger", size: "md" },
};

export const Link: Story = {
  args: { children: "Learn more", variant: "link", size: "md" },
};

export const Loading: Story = {
  args: { children: "Saving...", variant: "primary", size: "md", loading: true },
};

export const WithIconLeft: Story = {
  args: {
    children: "Download",
    variant: "primary",
    size: "md",
    iconLeft: <Download />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
    iconRight: <ArrowRight />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    variant: "outline",
    children: <Plus />,
    "aria-label": "Add item",
  },
};

export const Disabled: Story = {
  args: { children: "Disabled", variant: "primary", size: "md", disabled: true },
};

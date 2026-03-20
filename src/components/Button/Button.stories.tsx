import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, ArrowRight, Trash2, Check, Download } from "lucide-react";
import { Button } from "@/components/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Button", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "ghost"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">X-Small</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="danger" disabled>Danger</Button>
      <Button variant="success" disabled>Success</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" loading>Saving…</Button>
      <Button variant="secondary" loading>Loading…</Button>
      <Button variant="danger" loading>Deleting…</Button>
    </div>
  ),
};

export const WithPrefixIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" prefixIcon={<Plus />}>New Item</Button>
      <Button variant="secondary" prefixIcon={<Download />}>Export</Button>
      <Button variant="danger" prefixIcon={<Trash2 />}>Delete</Button>
      <Button variant="success" prefixIcon={<Check />}>Confirm</Button>
    </div>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" suffixIcon={<ArrowRight />}>Continue</Button>
      <Button variant="ghost" suffixIcon={<ArrowRight />}>Learn More</Button>
    </div>
  ),
};

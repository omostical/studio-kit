import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  args: { label: "Search projects", size: "medium", appearance: "border" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    appearance: { control: "inline-radio", options: ["border", "ghost"], description: "Figma: Style" },
    variant: { control: "inline-radio", options: ["primary", "danger"], description: "Figma: Variant" },
    disabled: { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-80">{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof Search>;

export const Playground: Story = {};
export const Filled: Story = { args: { defaultValue: "Billing" } };
export const WithShortcut: Story = { args: { shortcut: "⌘K" } };
export const VisibleLabel: Story = { args: { hideLabel: false } };
export const Ghost: Story = { args: { appearance: "ghost" } };
export const Small: Story = { args: { size: "small" } };
export const Disabled: Story = { args: { disabled: true } };

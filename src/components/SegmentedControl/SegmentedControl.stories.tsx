import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LayoutGrid, List } from "lucide-react";
import { SegmentedControl, SegmentedControlItem } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: { "aria-label": "Period", defaultValue: "week", size: "medium", variant: "regular" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    variant: { control: "inline-radio", options: ["regular", "full-width"], description: "Figma: Variant" },
  },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  ),
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {};
export const FullWidth: Story = { args: { variant: "full-width" } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const Icons: Story = {
  args: { "aria-label": "Layout", defaultValue: "list" },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="list" icon={<List />} aria-label="List view" />
      <SegmentedControlItem value="grid" icon={<LayoutGrid />} aria-label="Grid view" />
    </SegmentedControl>
  ),
};
export const WithDisabledItem: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="year" disabled>Year</SegmentedControlItem>
    </SegmentedControl>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: { appearance: "solid", weight: "thin", emphasis: "base" },
  argTypes: {
    appearance: { control: "inline-radio", options: ["solid", "dashed"], description: "Figma: Style" },
    weight: { control: "inline-radio", options: ["thin", "default", "bold"], description: "Figma: Weight" },
    emphasis: { control: "inline-radio", options: ["base", "strong", "subtle"], description: "Figma: Emphasis" },
    labelPosition: { control: "inline-radio", options: ["center", "left"], description: "Figma: Text" },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {};
export const WithLabel: Story = { args: { label: "March", emphasis: "subtle" } };
export const LabelLeft: Story = { args: { label: "March", labelPosition: "left" } };
export const Dashed: Story = { args: { appearance: "dashed", weight: "default" } };

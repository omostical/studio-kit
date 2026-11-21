import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Email notifications", size: "large", labelPosition: "right" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size" },
    labelPosition: { control: "inline-radio", options: ["left", "right"], description: "Figma: Label" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = { args: { description: "Get an email when someone mentions you." } };
export const Small: Story = { args: { size: "small" } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

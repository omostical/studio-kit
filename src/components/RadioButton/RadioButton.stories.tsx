import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  args: { value: "a", label: "Monthly billing", size: "large", variant: "primary" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size" },
    variant: { control: "inline-radio", options: ["primary", "danger"], description: "Figma: Variant" },
    disabled: { control: "boolean" },
  },
  decorators: [(Story) => <RadioGroupPrimitive.Root defaultValue="a" aria-label="Billing">{Story()}</RadioGroupPrimitive.Root>],
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Playground: Story = {};
export const Unselected: Story = { args: { value: "b" } };
export const WithDescription: Story = { args: { description: "Billed on the first of each month." } };
export const Small: Story = { args: { size: "small" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Disabled: Story = { args: { disabled: true } };

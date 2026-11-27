import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup } from "./RadioGroup";
import { RadioButton } from "../RadioButton";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { label: "Billing period", defaultValue: "monthly", orientation: "vertical" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"], description: "Figma: Orientation" },
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size of every option" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="monthly" label="Monthly" description="Billed on the first of each month." />
      <RadioButton value="yearly" label="Yearly" description="Two months free." />
      <RadioButton value="custom" label="Custom" />
    </RadioGroup>
  ),
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const WithHelperText: Story = { args: { helperText: "You can change this later." } };
export const WithError: Story = { args: { defaultValue: undefined, error: "Choose a billing period to continue." } };
export const Optional: Story = { args: { optional: true } };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  args: { label: "Notify me by", orientation: "vertical" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"], description: "Figma: Orientation" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="SMS" />
      <Checkbox label="Push notification" description="On the devices where you're signed in." />
    </CheckboxGroup>
  ),
};
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Playground: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const WithHelperText: Story = { args: { helperText: "Pick all that apply.", optional: true } };
export const WithError: Story = { args: { error: "Choose at least one channel." } };
export const Disabled: Story = { args: { disabled: true } };

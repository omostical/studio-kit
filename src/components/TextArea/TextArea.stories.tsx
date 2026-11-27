import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: { label: "Message", placeholder: "Tell us what happened", size: "medium" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    variant: { control: "inline-radio", options: ["primary", "danger"], description: "Figma: Variant" },
    disabled: { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-96">{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {};
export const Filled: Story = { args: { defaultValue: "The export finished, but two rows were missing their dates." } };
export const WithHelperText: Story = { args: { helperText: "Up to 500 characters.", optional: true } };
export const WithError: Story = { args: { error: "Describe the problem so we can reproduce it." } };
export const Large: Story = { args: { size: "large", rows: 4 } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Read-only note" } };

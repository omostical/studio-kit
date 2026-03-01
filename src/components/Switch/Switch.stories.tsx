import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { size: "md" },
};

export const WithLabel: Story = {
  args: { label: "Enable notifications", size: "md" },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products, features, and more.",
    size: "md",
  },
};

export const Checked: Story = {
  args: {
    label: "Dark mode",
    defaultChecked: true,
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    description: "This setting is managed by your organisation.",
    disabled: true,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

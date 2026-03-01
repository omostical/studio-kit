import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search, Mail, Eye } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text...", variant: "default", size: "md" },
};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    hint: "Must be 3–20 characters, letters and numbers only.",
  },
};

export const WithError: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    error: "This email is already taken.",
    defaultValue: "john@",
  },
};

export const WithIconLeft: Story = {
  args: {
    placeholder: "Search...",
    iconLeft: <Search />,
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    iconRight: <Eye />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Search users...",
    iconLeft: <Search />,
    iconRight: <Mail />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled input",
    placeholder: "Not editable",
    disabled: true,
    defaultValue: "Locked value",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  ),
};

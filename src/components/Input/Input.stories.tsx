import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search, Mail, Eye, AlertCircle, Info } from "lucide-react";
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
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["default", "error"] },
    optional: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Label", placeholder: "Input field", hint: "Hint Text" },
};

export const Filled: Story = {
  args: {
    label: "Label",
    placeholder: "Input field",
    defaultValue: "Filled value",
    hint: "Hint Text",
  },
};

export const Focused: Story = {
  args: {
    label: "Label",
    placeholder: "Input field",
    autoFocus: true,
    hint: "Hint Text",
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    placeholder: "Input field",
    defaultValue: "wrong@",
    error: "Please enter a valid email",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Input field",
    hint: "Hint Text",
    disabled: true,
  },
};

export const Optional: Story = {
  args: {
    label: "Label",
    optional: true,
    placeholder: "Input field",
    hint: "Hint Text",
  },
};

export const WithPrefix: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    prefix: <Search />,
    hint: "Type to filter results",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    suffix: <Eye />,
  },
};

export const WithBothAffixes: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    prefix: <Mail />,
    suffix: <AlertCircle />,
  },
};

export const CustomHintIcon: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    hint: "Must be 3–20 characters",
    hintIcon: <Info />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" label="Small" placeholder="32px height" hint="sm" />
      <Input size="md" label="Medium" placeholder="40px height" hint="md" />
      <Input size="lg" label="Large" placeholder="48px height" hint="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Default" placeholder="Input field" hint="Hint Text" />
      <Input
        label="Filled"
        placeholder="Input field"
        defaultValue="Filled value"
        hint="Hint Text"
      />
      <Input
        label="Focused"
        placeholder="Input field"
        autoFocus
        hint="Hint Text"
      />
      <Input
        label="Error"
        placeholder="Input field"
        defaultValue="wrong@"
        error="Please enter a valid email"
      />
      <Input
        label="Disabled"
        placeholder="Input field"
        hint="Hint Text"
        disabled
      />
    </div>
  ),
};

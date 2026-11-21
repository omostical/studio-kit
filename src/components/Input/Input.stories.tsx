import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search, Mail } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { label: "Email address", placeholder: "e.g. hello@example.com", size: "medium", appearance: "border" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    variant: { control: "inline-radio", options: ["primary", "danger"], description: "Figma: Variant" },
    appearance: { control: "inline-radio", options: ["border", "ghost"], description: "Figma: Style" },
    disabled: { control: "boolean" },
    optional: { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-96"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const WithHelperText: Story = { args: { helperText: "We'll only use this to send receipts.", prefix: <Mail /> } };

export const Error: Story = { args: { defaultValue: "hello@", error: "Enter an email address like name@example.com" } };

export const Optional: Story = { args: { label: "Company", placeholder: "", optional: true } };

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-gap-9">
      {(["small", "medium", "large"] as const).map((size) => (
        <Input key={size} {...args} size={size} label={size} prefix={<Search />} placeholder="Search projects" />
      ))}
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "hello@example.com" } };

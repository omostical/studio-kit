import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select, SelectItem } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select placeholder="Choose an option">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Select label="Country" placeholder="Select country">
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </Select>
  ),
};

export const WithHint: Story = {
  render: () => (
    <Select label="Role" hint="This determines what permissions the user has." placeholder="Select role">
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select label="Category" error="Please select a category to continue." placeholder="Select category">
      <SelectItem value="design">Design</SelectItem>
      <SelectItem value="engineering">Engineering</SelectItem>
      <SelectItem value="product">Product</SelectItem>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select label="Status" placeholder="Unavailable" disabled>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="inactive">Inactive</SelectItem>
    </Select>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select, SelectItem } from "./Select";

const options = (
  <>
    <SelectItem value="uk">United Kingdom</SelectItem>
    <SelectItem value="ng">Nigeria</SelectItem>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="de" disabled>Germany (unavailable)</SelectItem>
  </>
);

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: { label: "Country", placeholder: "Select a country", size: "medium", children: options },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    appearance: { control: "inline-radio", options: ["border", "ghost"], description: "Figma: Style" },
    disabled: { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};
export const WithValue: Story = { args: { defaultValue: "ng", helperText: "Used for tax and currency." } };
export const Error: Story = { args: { error: "Choose the country you pay tax in." } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "uk" } };

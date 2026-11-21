import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Email me product updates", size: "large", variant: "primary" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size" },
    variant: { control: "inline-radio", options: ["primary", "danger"], description: "Figma: Variant" },
    checked: { control: "select", options: [false, true, "indeterminate"], description: "Figma: Type" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const WithDescription: Story = { args: { description: "About once a month. Unsubscribe any time." } };

export const Matrix: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-gap-9">
      {([false, true, "indeterminate"] as const).map((checked) =>
        ([false, true] as const).map((disabled) => (
          <Checkbox key={`${checked}-${disabled}`} {...args} checked={checked} disabled={disabled} label={`${String(checked)}${disabled ? ", disabled" : ""}`} />
        ))
      )}
    </div>
  ),
};

/** A parent checkbox shows Indeterminate when only some children are selected. */
export const SelectAll: Story = {
  render: () => {
    const Demo = () => {
      const [items, setItems] = React.useState([true, false, false]);
      const all = items.every(Boolean) ? true : items.some(Boolean) ? "indeterminate" : false;
      return (
        <div className="grid gap-gap-5">
          <Checkbox label="Select all" checked={all} onCheckedChange={(v) => setItems(items.map(() => v === true))} />
          <div className="grid gap-gap-5 pl-gap-12">
            {items.map((v, i) => (
              <Checkbox key={i} label={`Row ${i + 1}`} checked={v} onCheckedChange={(n) => setItems(items.map((x, j) => (j === i ? n === true : x)))} />
            ))}
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

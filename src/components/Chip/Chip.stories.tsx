import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Globe } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { children: "Paid", appearance: "filled", size: "medium" },
  argTypes: {
    variant: { control: "inline-radio", options: ["secondary", "primary"], description: "Figma: Variant" },
    appearance: { control: "inline-radio", options: ["filled", "border"], description: "Figma: Style" },
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {};

/** Filter chips toggle with aria-pressed; pressed shows Primary and a check. */
export const Filters: Story = {
  render: function Render(args) {
    const [on, setOn] = useState<Record<string, boolean>>({ Paid: true, Pending: false, Failed: false });
    return (
      <div className="flex flex-wrap gap-gap-5" role="group" aria-label="Filter by status">
        {Object.keys(on).map((k) => (
          <Chip key={k} {...args} pressed={on[k]} onPressedChange={(p) => setOn({ ...on, [k]: p })}>{k}</Chip>
        ))}
      </div>
    );
  },
};

/** Removable chips: each remove button is named "Remove <value>". */
export const Removable: Story = {
  render: function Render(args) {
    const [items, setItems] = useState(["Design", "Research", "Billing"]);
    return (
      <div className="flex flex-wrap gap-gap-5">
        {items.map((i) => <Chip key={i} {...args} onRemove={() => setItems(items.filter((x) => x !== i))}>{i}</Chip>)}
      </div>
    );
  },
};

export const Prefixes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-gap-5">
      <Chip {...args} prefix={<Globe />}>Website</Chip>
      <Chip {...args} prefix={<Avatar size="xsmall" src="/avatars/sample-person.svg" alt="" />} onRemove={() => {}}>Ada Lovelace</Chip>
      <Chip {...args} appearance="border" size="large" prefix={<Globe />}>Website</Chip>
      <Chip {...args} size="small" disabled>Archived</Chip>
    </div>
  ),
};

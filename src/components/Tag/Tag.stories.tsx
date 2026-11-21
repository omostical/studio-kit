import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hash } from "lucide-react";
import { Tag } from "./Tag";
import { tagColors } from "./tagColors";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Design", color: "brand", emphasis: "filled", size: "medium", rounded: false },
  argTypes: {
    color: { control: "select", options: tagColors, description: "Figma: Color (categories only)" },
    emphasis: { control: "inline-radio", options: ["filled", "border"], description: "Figma: Emphasis" },
    size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" },
    rounded: { control: "boolean", description: "Figma: Rounded" },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};

export const AllColors: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["filled", "border"] as const).map((emphasis) => (
        <div key={emphasis} className="flex flex-wrap gap-gap-5">
          {tagColors.map((color) => (
            <Tag key={color} {...args} color={color} emphasis={emphasis}>
              {color}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-5">
      {(["small", "medium", "large"] as const).map((size) => (
        <Tag key={size} {...args} size={size} icon={<Hash />}>
          {size}
        </Tag>
      ))}
    </div>
  ),
};

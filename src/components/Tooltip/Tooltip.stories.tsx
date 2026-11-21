import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pencil } from "lucide-react";
import { Tooltip } from "./Tooltip";
import { IconButton } from "../IconButton/IconButton";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: { content: "Edit", variant: "default", size: "medium", side: "top", arrow: true, children: <IconButton icon={<Pencil />} aria-label="Edit" appearance="border" /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "inverse"], description: "Figma: Variant" },
    size: { control: "inline-radio", options: ["small", "medium"], description: "Figma: Size" },
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"], description: "Figma: Alignment" },
  },
  decorators: [(Story) => <div className="flex min-h-40 items-center justify-center"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {};
export const WithDescription: Story = { args: { content: "Edit", description: "Rename or change the cover" } };
export const Inverse: Story = { args: { variant: "inverse" } };

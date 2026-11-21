import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { X, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { IconButton } from "./IconButton";

const variants = ["primary", "secondary", "danger", "success", "inverse"] as const;
const appearances = ["filled", "border", "ghost"] as const;
const sizes = ["xsmall", "small", "medium", "large"] as const;

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { icon: <Pencil />, "aria-label": "Edit", variant: "secondary", appearance: "ghost", size: "medium" },
  argTypes: {
    variant: { control: "select", options: variants, description: "Figma: Variant" },
    appearance: { control: "inline-radio", options: appearances, description: "Figma: Style" },
    size: { control: "inline-radio", options: sizes, description: "Figma: Size" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {appearances.map((appearance) => (
        <div key={appearance} className="flex items-center gap-gap-7">
          <span className="w-20 type-caption-medium text-static-text-subtle">{appearance}</span>
          {variants.map((variant) => (
            <span key={variant} className={variant === "inverse" ? "rounded-control-lg bg-static-fill-inverse-background p-gap-3" : ""}>
              <IconButton {...args} variant={variant} appearance={appearance} aria-label={`${variant} ${appearance}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-gap-3">
      <IconButton icon={<Pencil />} aria-label="Edit" />
      <IconButton icon={<Trash2 />} aria-label="Delete" variant="danger" />
      <IconButton icon={<MoreHorizontal />} aria-label="More actions" />
      <IconButton icon={<X />} aria-label="Close" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography, type TypographyVariant } from "./Typography";

const all: TypographyVariant[] = [
  "title-large", "title-medium", "title-small",
  "subtitle-large", "subtitle-medium", "subtitle-small", "subtitle-xsmall",
  "label-large", "label-medium", "label-small", "label-strong-large", "label-strong-medium", "label-strong-small",
  "body-large", "body-medium", "body-small", "body-strong-large", "body-strong-medium", "body-strong-small",
  "number-large", "number-medium", "number-small", "number-xsmall",
  "caption-medium", "caption-small", "caption-strong-medium", "caption-strong-small",
];

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  args: { variant: "body-medium", tone: "base", children: "The quick brown fox jumps over the lazy dog" },
  argTypes: {
    variant: { control: "select", options: all, description: "Figma text style" },
    tone: { control: "inline-radio", options: ["strong", "base", "subtle"] },
  },
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Playground: Story = {};

/** Every Figma text style, rendered from the generated type-* utilities. */
export const TextStyles: Story = {
  render: () => (
    <div className="grid gap-gap-7">
      {all.map((v) => (
        <div key={v} className="grid grid-cols-[200px_1fr] items-baseline gap-gap-9">
          <Typography variant="caption-medium" tone="subtle">{v}</Typography>
          <Typography variant={v}>{v.startsWith("number") ? "1,234,567.89" : "Design systems at scale"}</Typography>
        </div>
      ))}
    </div>
  ),
};

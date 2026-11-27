import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Thumbnail } from "./Thumbnail";

const types = ["image", "icon", "logo", "text", "pdf", "spreadsheet", "document", "video", "picture"] as const;
const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

const meta: Meta<typeof Thumbnail> = {
  title: "Components/Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  args: { type: "pdf", size: "large", alt: "report.pdf, PDF" },
  argTypes: {
    type: { control: "select", options: types, description: "Figma: Type" },
    size: { control: "inline-radio", options: sizes, description: "Figma: Size (16 · 20 · 24 · 32 · 40px)" },
  },
};
export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Playground: Story = {};

export const Types: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-5">
      {types.map((type) => (
        <Thumbnail key={type} {...args} type={type} src="/avatars/sample-team.svg" text="W" alt={type} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["image", "pdf"] as const).map((type) => (
        <div key={type} className="flex items-end gap-gap-5">
          {sizes.map((size) => <Thumbnail key={size} {...args} type={type} size={size} src="/avatars/sample-team.svg" />)}
        </div>
      ))}
    </div>
  ),
};

/** Next to the file name the thumbnail is decorative: leave `alt` out. */
export const WithFileName: Story = {
  render: () => (
    <div className="flex items-center gap-gap-5">
      <Thumbnail type="spreadsheet" />
      <span className="type-label-strong-small text-static-text-strong">Q3 budget.xlsx</span>
    </div>
  ),
};

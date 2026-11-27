import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: { label: "Uploading report.pdf", value: 60, description: "2 of 5 files" },
  argTypes: {
    type: { control: "inline-radio", options: ["line", "circle"], description: "Figma: Type" },
    status: { control: "inline-radio", options: [undefined, "success", "danger"], description: "Figma: Progress=Success/Error" },
    value: { control: { type: "range", min: 0, max: 100, step: 10 }, description: "Figma: Progress" },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {};
export const Success: Story = { args: { status: "success", description: "All 5 files uploaded" } };
export const Danger: Story = { args: { status: "danger", value: 50, description: "Upload stopped. Check your connection, then try again." } };
export const Circle: Story = {
  render: (args) => (
    <div className="flex gap-gap-9">
      <ProgressBar {...args} type="circle" />
      <ProgressBar {...args} type="circle" status="success" />
      <ProgressBar {...args} type="circle" status="danger" />
    </div>
  ),
};

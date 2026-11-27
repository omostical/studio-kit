import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { StatusModal, StatusModalTrigger, StatusModalContent, StatusModalClose } from "./StatusModal";

const meta: Meta<typeof StatusModalContent> = {
  title: "Components/StatusModal",
  component: StatusModalContent,
  tags: ["autodocs"],
  args: {
    type: "danger",
    orientation: "vertical",
    closeButton: true,
    title: "Delete this project?",
    description: "This can't be undone. The project and its 24 files are deleted for everyone.",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["danger", "success", "info", "warning", "neutral"], description: "Figma: Type" },
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"], description: "Figma: Orientation" },
    closeButton: { control: "boolean", description: "Figma: Close Button" },
  },
  render: (args) => (
    <StatusModal>
      <StatusModalTrigger asChild><Button variant="secondary" appearance="border">Open status modal</Button></StatusModalTrigger>
      <StatusModalContent
        {...args}
        actions={
          <>
            <StatusModalClose asChild><Button size="small" variant="secondary" appearance="border">Cancel</Button></StatusModalClose>
            <Button size="small" variant={args.type === "danger" ? "danger" : "primary"}>{args.type === "danger" ? "Delete project" : "Continue"}</Button>
          </>
        }
      />
    </StatusModal>
  ),
};
export default meta;
type Story = StoryObj<typeof StatusModalContent>;

export const Vertical: Story = {};

/** Horizontal: left-aligned, actions in a footer with an optional start slot. */
export const Horizontal: Story = {
  args: { orientation: "horizontal", footerStart: <Button size="small" appearance="ghost" variant="secondary">Contact support</Button> },
};

export const Success: Story = { args: { type: "success", title: "Payment received", description: "We emailed the receipt to the billing contact." } };

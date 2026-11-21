import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast, ToastProvider, useToast } from "./Toast";
import { Button } from "../Button/Button";

const statuses = ["neutral", "info", "positive", "error"] as const;

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: { title: "Changes saved", status: "positive", emphasis: "high", dismissible: true },
  argTypes: {
    status: { control: "select", options: statuses, description: "Figma: Status" },
    emphasis: { control: "inline-radio", options: ["high", "low"], description: "Figma: Emphasis" },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {statuses.map((status) => (
        <Toast key={status} {...args} status={status} title={`${status} message`} actionLabel="Undo" />
      ))}
      {statuses.map((status) => (
        <Toast key={`low-${status}`} {...args} emphasis="low" status={status} title={`${status} message`} description="Supporting detail goes here." />
      ))}
    </div>
  ),
};

/** Real usage: wrap the app once in ToastProvider, then call show(). */
export const Live: Story = {
  render: () => {
    const Demo = () => {
      const { show } = useToast();
      return <Button onClick={() => show({ status: "positive", title: "Message sent", actionLabel: "Undo" })}>Send message</Button>;
    };
    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

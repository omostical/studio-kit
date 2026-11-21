import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Modal, ModalTrigger, ModalClose, ModalContent, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const meta: Meta<typeof ModalContent> = {
  title: "Components/Modal",
  component: ModalContent,
  tags: ["autodocs"],
  args: { size: "medium" },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"] } },
};
export default meta;
type Story = StoryObj<typeof ModalContent>;

export const Form: Story = {
  render: (args) => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Edit project</Button>
      </ModalTrigger>
      <ModalContent {...args}>
        <ModalHeader title="Edit project" description="Changes are visible to everyone on the team." />
        <ModalBody className="grid gap-gap-11">
          <Input label="Project name" defaultValue="Studio Kit 2.0" />
          <Input label="Description" optional />
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" appearance="border">Cancel</Button>
          </ModalClose>
          <Button>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

/** Name the destructive action in the button, not "OK". */
export const Confirm: Story = {
  args: { size: "small" },
  render: (args) => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Delete project</Button>
      </ModalTrigger>
      <ModalContent {...args} role="alertdialog">
        <ModalHeader title="Delete project?" description="This deletes 24 files and can't be undone." closeButton={false} />
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" appearance="border">Cancel</Button>
          </ModalClose>
          <Button variant="danger">Delete project</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

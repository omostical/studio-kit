import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";

const sizes = ["xsmall", "small", "medium", "large", "xlarge", "xxlarge"] as const;

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Ada Lovelace", type: "rounded", size: "medium", selected: false, status: false },
  argTypes: {
    variant: { control: "inline-radio", options: [undefined, "image", "initials", "icon"], description: "Figma: Variant (leave unset to pick automatically)" },
    type: { control: "inline-radio", options: ["rounded", "square"], description: "Figma: Type" },
    size: { control: "inline-radio", options: sizes, description: "Figma: Size" },
    selected: { control: "boolean", description: "Figma: Selected" },
    status: { control: "boolean", description: "Figma: Status" },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-7">
      <Avatar {...args} src="/avatars/sample-person.svg" />
      <Avatar {...args} />
      <Avatar {...args} name={undefined} alt="Unknown member" />
      <Avatar {...args} type="square" src="/avatars/sample-team.svg" name="Northwind" />
      <Avatar {...args} type="square" name="Northwind Traders" />
      <Avatar {...args} type="square" name={undefined} alt="Workspace" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-gap-9">
      {(["rounded", "square"] as const).map((type) => (
        <div key={type} className="flex items-end gap-gap-7">
          {sizes.map((size) => (
            <Avatar key={size} {...args} type={type} size={size} status />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Selected uses the Focus/Base ring. Pair it with a non-colour signal (aria-pressed, a check) when it marks a choice. */
export const Selected: Story = { args: { selected: true, src: "/avatars/sample-person.svg" } };

/** The photo fails to load, so the avatar falls back to initials. */
export const BrokenImage: Story = { args: { src: "/avatars/does-not-exist.png" } };

/** Next to a visible name the avatar is decorative (`alt=""`); the status is still read out. */
export const WithName: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-5">
      <Avatar {...args} alt="" status />
      <span className="type-label-strong-small text-static-text-strong">Ada Lovelace</span>
    </div>
  ),
};

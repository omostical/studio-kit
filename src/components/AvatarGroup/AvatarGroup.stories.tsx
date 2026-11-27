import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/Avatar";
import { AvatarGroup } from "./AvatarGroup";

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Linus Torvalds", "Margaret Hamilton"];
const avatars = people.map((n, i) => <Avatar key={n} name={n} src={i % 2 ? undefined : "/avatars/sample-person.svg"} />);

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  args: { layout: "row", size: "medium", "aria-label": "6 members", children: avatars },
  argTypes: {
    layout: { control: "inline-radio", options: ["row", "grid"], description: "Figma: Layout" },
    size: { control: "inline-radio", options: ["xsmall", "small", "medium", "large"], description: "Figma: Size" },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Playground: Story = {};
export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["xsmall", "small", "medium", "large"] as const).map((s) => <AvatarGroup key={s} {...args} size={s} />)}
    </div>
  ),
};
export const Grid: Story = { args: { layout: "grid" } };
/** The counter opens the full list: it is a named button. */
export const WithMoreButton: Story = { args: { total: 24, "aria-label": "24 members", onMoreClick: () => {}, moreLabel: "Show all 24 members" } };
export const NoCounter: Story = { args: { children: avatars.slice(0, 3), "aria-label": "3 members" } };

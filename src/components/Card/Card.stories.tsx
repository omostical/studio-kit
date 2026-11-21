import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: { container: true },
  argTypes: { container: { control: "boolean", description: "Figma: Container" } },
  decorators: [(Story) => <div className="max-w-[400px] bg-static-fill-background p-gap-12"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <div>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use your work email.</CardDescription>
        </div>
        <Badge status="info">Beta</Badge>
      </CardHeader>
      <CardContent className="grid gap-gap-11">
        <Input label="Email address" placeholder="e.g. hello@example.com" />
        <Input label="Password" type="password" placeholder="Enter your password" />
      </CardContent>
      <CardFooter>
        <Button variant="secondary" appearance="border">Cancel</Button>
        <Button>Sign in</Button>
      </CardFooter>
    </Card>
  ),
};

/** No box: for grey backgrounds or inside other containers, instead of nesting boxes. */
export const WithoutContainer: Story = { ...Playground, args: { container: false } };

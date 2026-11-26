import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Copy, Download, MoreHorizontal, Pencil, RotateCcw, Share2, Trash2 } from "lucide-react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/** Row actions behind one "More" button, destructive action last. */
export const RowActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={<MoreHorizontal />} aria-label="More actions for order 1042" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<RotateCcw />}>Reorder</DropdownMenuItem>
        <DropdownMenuItem icon={<Download />} shortcut="⌘D">Download invoice</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />} description="Copies the order number">Copy order ID</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<Share2 />}>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem icon={<Pencil />} disabled>Edit (shipped orders are locked)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" icon={<Trash2 />}>Cancel order</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function Options() {
  const [sort, setSort] = React.useState("newest");
  const [columns, setColumns] = React.useState({ date: true, amount: true, status: false });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" appearance="border">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        {(Object.keys(columns) as (keyof typeof columns)[]).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columns[key]}
            onCheckedChange={(on) => setColumns((c) => ({ ...c, [key]: on === true }))}
            onSelect={(e) => e.preventDefault()}
          >
            {key[0].toUpperCase() + key.slice(1)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Single Select (radio, check on the right) and Multi Select (checkbox on the left) groups. */
export const SelectionGroups: Story = { render: () => <Options /> };

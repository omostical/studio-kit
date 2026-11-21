import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./Table";
import { Badge } from "../Badge/Badge";
import { Checkbox } from "../Checkbox/Checkbox";

const rows = [
  { name: "Adam Smith", email: "adam@example.com", status: "Paid", amount: 990.59 },
  { name: "Bola Ade", email: "bola@example.com", status: "Pending", amount: 120 },
  { name: "Chen Li", email: "chen@example.com", status: "Overdue", amount: 4320.1 },
];
const tone = { Paid: "positive", Pending: "notice", Overdue: "negative" } as const;

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  args: { size: "medium" },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" } },
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Playground: Story = {
  render: (args) => {
    const Demo = () => {
      const [selected, setSelected] = React.useState<string[]>(["Bola Ade"]);
      const [desc, setDesc] = React.useState(true);
      const sorted = [...rows].sort((a, b) => (desc ? b.amount - a.amount : a.amount - b.amount));
      const toggle = (n: string) => setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
      return (
        <Table {...args}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"><Checkbox size="small" aria-label="Select all" checked={selected.length === rows.length ? true : selected.length ? "indeterminate" : false} onCheckedChange={(v) => setSelected(v === true ? rows.map((r) => r.name) : [])} /></TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead numeric sort={desc ? "descending" : "ascending"} onSort={() => setDesc(!desc)}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((r) => (
              <TableRow key={r.name} selected={selected.includes(r.name)}>
                <TableCell><Checkbox size="small" aria-label={`Select ${r.name}`} checked={selected.includes(r.name)} onCheckedChange={() => toggle(r.name)} /></TableCell>
                <TableCell description={r.email}>{r.name}</TableCell>
                <TableCell><Badge status={tone[r.status as keyof typeof tone]} size="small">{r.status}</Badge></TableCell>
                <TableCell numeric>${r.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };
    return <Demo />;
  },
};

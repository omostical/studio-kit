import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination, type PaginationProps } from "./Pagination";

function Stateful(props: Partial<PaginationProps>) {
  const [page, setPage] = React.useState(props.page ?? 1);
  const [rows, setRows] = React.useState(props.rowsPerPage);
  return (
    <Pagination
      pageCount={12}
      {...props}
      page={page}
      onPageChange={setPage}
      rowsPerPage={rows}
      onRowsPerPageChange={(n) => {
        setRows(n);
        setPage(1);
      }}
    />
  );
}

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { type: "less-numbers", page: 1, pageCount: 12, rowsPerPage: 10 },
  argTypes: {
    type: { control: "inline-radio", options: ["less-numbers", "more-numbers", "overflow"], description: "Figma: Type" },
    rowsPerPage: { control: "number", description: "Figma: Rows per page (unset hides the control)" },
  },
  render: (args) => <Stateful {...args} />,
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {};

/** Figma Type: Less numbers · More numbers · Overflow. */
export const Types: Story = {
  render: () => (
    <div className="grid gap-gap-9">
      <Stateful type="less-numbers" pageCount={5} rowsPerPage={10} />
      <Stateful type="more-numbers" pageCount={99} rowsPerPage={10} />
      <Stateful type="overflow" pageCount={45} rowsPerPage={10} />
    </div>
  ),
};

/** Middle of a long list: first and last pages stay, the gaps become "…". */
export const MiddlePage: Story = { args: { type: "more-numbers", page: 50, pageCount: 99 } };

/** Without the Rows per page control. */
export const WithoutRowsPerPage: Story = { args: { rowsPerPage: undefined } };

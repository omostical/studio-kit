"use client";
import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Table — Figma: StudioKIT 2.0 › Table: Column (9234:85146) + Table Cell (9233:69238).
 * Descriptions: docs/figma-descriptions/column.md, table-cell.md
 *
 * Real <table> markup. Figma property → prop:  Size → size (on Table) · Selected → TableRow selected ·
 * Type (Header / Text / Number …) → TableHead / TableCell (+ numeric) · Sorting → TableHead sort.
 * Rows: small 40 · medium 48 · large 64 (Size/16, /18, /19), 1px Static/Stroke/Base divider;
 * hover Dynamic/Fill/Secondary/Alpha/Hover; selected Dynamic/Fill/Primary/Alpha/Strong/Default.
 * Header: 2px Static/Stroke/Base divider, Label/Strong/Small. Cells: Label/Small (Label/Medium when large);
 * numbers Number/Small, right-aligned with tabular figures.
 */
type TableSize = "small" | "medium" | "large";
const TableSizeContext = React.createContext<TableSize>("medium");
const rowHeight: Record<TableSize, string> = { small: "h-size-16", medium: "h-size-18", large: "h-size-19" };

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: TableSize;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, size = "medium", ...props }, ref) => (
  <TableSizeContext.Provider value={size}>
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cn("w-full border-collapse text-left text-static-text-base", className)} {...props} />
    </div>
  </TableSizeContext.Provider>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b-2 border-static-stroke-base", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => <tbody ref={ref} {...props} />);
TableBody.displayName = "TableBody";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, selected, ...props }, ref) => (
  <tr
    ref={ref}
    aria-selected={selected || undefined}
    data-selected={selected || undefined}
    className={cn(
      "border-b border-static-stroke-base transition-colors [tbody_&]:hover:bg-dynamic-fill-secondary-alpha-hover",
      "data-[selected=true]:bg-dynamic-fill-primary-alpha-strong-default",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
  /** Current sort of this column; makes the header a sort button. */
  sort?: "ascending" | "descending" | "none";
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, numeric, sort, onSort, children, ...props }, ref) => {
  const size = React.useContext(TableSizeContext);
  const SortIcon = sort === "ascending" ? ArrowUp : sort === "descending" ? ArrowDown : ArrowUpDown;
  return (
    <th
      ref={ref}
      scope="col"
      aria-sort={sort}
      className={cn("px-gap-9 align-middle type-label-strong-small text-static-text-base", rowHeight[size], numeric && "text-right", className)}
      {...props}
    >
      {sort ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "inline-flex items-center gap-gap-3 rounded-control-sm focus-visible:outline-none focus-visible:shadow-focus-base [&_svg]:size-size-9 [&_svg]:text-static-text-subtle",
            numeric && "flex-row-reverse"
          )}
        >
          {children}
          <SortIcon aria-hidden />
        </button>
      ) : (
        children
      )}
    </th>
  );
});
TableHead.displayName = "TableHead";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
  /** Secondary line under the value (Figma "Description"). */
  description?: React.ReactNode;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, numeric, description, children, ...props }, ref) => {
  const size = React.useContext(TableSizeContext);
  return (
    <td
      ref={ref}
      className={cn(
        "px-gap-9 align-middle",
        rowHeight[size],
        numeric ? "text-right type-number-small tabular-nums" : size === "large" ? "type-label-medium" : "type-label-small",
        className
      )}
      {...props}
    >
      {children}
      {description != null && <div className="type-body-small text-static-text-subtle">{description}</div>}
    </td>
  );
});
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };

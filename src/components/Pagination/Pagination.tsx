"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Select, SelectItem } from "@/components/Select";

/**
 * Pagination — Figma: StudioKIT 2.0 › Pagination (2646:12655). Description: docs/figma-descriptions/pagination.md
 *
 * Moves through pages of a long list or table. The page controls sit in `<nav aria-label="Pagination">`; page buttons
 * are named "Page 3" and the current one has `aria-current="page"`.
 *
 * Figma property → prop:  Type → `type` (Less numbers → `less-numbers` · More numbers → `more-numbers` · Overflow →
 * `overflow`) · Rows per page (show/hide) → shown when `rowsPerPage` is set.
 * Layout: rows-per-page on the left, page controls on the right (wraps on narrow screens).
 * Rows per page: Label/Small in Static/Text/Base + Single Select (small, 72px = Size/21), gap Gap/7.
 * Numbers: previous/next are Icon Button secondary ghost small, gap Gap/7 to the pages; pages are Button secondary
 * small, min width Size/14, gap Gap/5 — Filled for the current page, Ghost for the others. Less numbers shows at most
 * 5 slots, More numbers 9 (first, last, current and its neighbours, "…" for the gaps).
 * Overflow: Prev / Next are Button secondary ghost small with arrow icons; the page is a Single Select (small, 72px)
 * followed by "of N" (Label/Small); gap Gap/9 between the three, Gap/7 inside.
 */
export type PaginationType = "less-numbers" | "more-numbers" | "overflow";

/** The page numbers to show, with `"ellipsis"` for skipped ranges. `slots` is the most items to return (5 or more). */
export function pageItems(page: number, pageCount: number, slots: number): (number | "ellipsis")[] {
  const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  if (pageCount <= slots) return range(1, pageCount);
  const siblings = Math.max(0, Math.floor((slots - 5) / 2));
  if (page - siblings <= 3) return [...range(1, slots - 2), "ellipsis", pageCount];
  if (page + siblings >= pageCount - 2) return [1, "ellipsis", ...range(pageCount - (slots - 3), pageCount)];
  return [1, "ellipsis", ...range(page - siblings, page + siblings), "ellipsis", pageCount];
}

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Figma "Type": `less-numbers` (up to 5 page buttons, default; fits small screens), `more-numbers` (up to 9) or
   * `overflow` (Prev / page picker / Next, for very many pages).
   */
  type?: PaginationType;
  /** The current page, starting at 1. */
  page: number;
  /** Total number of pages (1 or more). */
  pageCount: number;
  /** Called with the page to show. */
  onPageChange: (page: number) => void;
  /** Figma "Rows per page": the current page size. Set it to show the page-size control. */
  rowsPerPage?: number;
  /** Page sizes people can pick. Default 10, 25, 50, 100. */
  rowsPerPageOptions?: number[];
  /** Called with the new page size. Usually also go back to page 1. */
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  /** Accessible name of the page navigation. Default "Pagination"; name it after the list when a page has two. */
  navLabel?: string;
}

/** Page controls for a long list or table (Figma Pagination). Show the current page, the total, previous and next. */
const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      type = "less-numbers",
      page,
      pageCount,
      onPageChange,
      rowsPerPage,
      rowsPerPageOptions = [10, 25, 50, 100],
      onRowsPerPageChange,
      navLabel = "Pagination",
      className,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const total = Math.max(1, pageCount);
    const current = Math.min(Math.max(1, page), total);
    const go = (p: number) => {
      if (p >= 1 && p <= total && p !== current) onPageChange(p);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-gap-7",
          rowsPerPage != null ? "justify-between" : "justify-end",
          className
        )}
        {...props}
      >
        {rowsPerPage != null && (
          <div className="flex items-center gap-gap-7">
            <label htmlFor={`${id}-rows`} className="type-label-small text-static-text-base">
              Rows per page
            </label>
            <Select
              id={`${id}-rows`}
              size="small"
              value={String(rowsPerPage)}
              onValueChange={(v) => onRowsPerPageChange?.(Number(v))}
              wrapperClassName="w-size-21"
            >
              {rowsPerPageOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        <nav aria-label={navLabel}>
          {type === "overflow" ? (
            <div className="flex items-center gap-gap-9">
              <Button
                variant="secondary"
                appearance="ghost"
                size="small"
                prefixIcon={<ArrowLeft aria-hidden="true" />}
                aria-label="Previous page"
                disabled={current <= 1}
                onClick={() => go(current - 1)}
              >
                Prev
              </Button>
              <div className="flex items-center gap-gap-7">
                <label htmlFor={`${id}-page`} className="sr-only">
                  Page
                </label>
                <Select id={`${id}-page`} size="small" value={String(current)} onValueChange={(v) => go(Number(v))} wrapperClassName="w-size-21">
                  {Array.from({ length: total }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </Select>
                <span className="whitespace-nowrap type-label-small text-static-text-base">of {total}</span>
              </div>
              <Button
                variant="secondary"
                appearance="ghost"
                size="small"
                suffixIcon={<ArrowRight aria-hidden="true" />}
                aria-label="Next page"
                disabled={current >= total}
                onClick={() => go(current + 1)}
              >
                Next
              </Button>
            </div>
          ) : (
            <ul className="flex items-center gap-gap-7">
              <li>
                <IconButton size="small" icon={<ChevronLeft />} aria-label="Previous page" disabled={current <= 1} onClick={() => go(current - 1)} />
              </li>
              <li>
                <ul className="flex items-center gap-gap-5">
                  {pageItems(current, total, type === "more-numbers" ? 9 : 5).map((item, i) =>
                    item === "ellipsis" ? (
                      <li key={`e${i}`} aria-hidden="true" className="flex min-w-size-14 justify-center type-label-strong-small text-dynamic-text-secondary-default">
                        …
                      </li>
                    ) : (
                      <li key={item}>
                        <Button
                          variant="secondary"
                          appearance={item === current ? "filled" : "ghost"}
                          size="small"
                          className="min-w-size-14"
                          aria-label={`Page ${item}`}
                          aria-current={item === current ? "page" : undefined}
                          onClick={() => go(item)}
                        >
                          {item}
                        </Button>
                      </li>
                    )
                  )}
                </ul>
              </li>
              <li>
                <IconButton size="small" icon={<ChevronRight />} aria-label="Next page" disabled={current >= total} onClick={() => go(current + 1)} />
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };

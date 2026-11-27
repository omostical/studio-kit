"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AvatarProps } from "@/components/Avatar/Avatar";

/**
 * AvatarGroup — Figma: StudioKIT 2.0 › Avatar Group (7807:149985). Description: docs/figma-descriptions/avatar-group.md
 *
 * Overlapping avatars for a set of people, with a "+N" counter. Built on Avatar (rounded).
 * Figma property → prop:  Layout → layout (row · grid) · Size → size (xsmall 20 · small 24 · medium 32 · large 40) ·
 * More People → shown automatically when there are more people than `max`.
 * Row: avatars overlap by 6px (Gap/4), each with a 2px ring (3px at large; Figma Border Width/md, lg). Figma binds
 * the ring width but gives it no colour, so code draws it in Static/Fill/Container (the card surface).
 * Grid: 2 × 2, Gap/3 apart, no ring.
 * Counter: Dynamic/Fill/Secondary/Alpha/Strong/Default, Static/Text/Base, Caption/Strong/Small (xsmall, small),
 * Caption/Strong/Medium (medium), Label/Strong/Small (large).
 */
export type AvatarGroupSize = "xsmall" | "small" | "medium" | "large";
export type AvatarGroupLayout = "row" | "grid";

const circle: Record<AvatarGroupSize, string> = {
  xsmall: "size-size-11 type-caption-strong-small",
  small: "size-size-12 type-caption-strong-small",
  medium: "size-size-14 type-caption-strong-medium",
  large: "size-size-16 type-label-strong-small",
};
const ring: Record<AvatarGroupSize, string> = {
  xsmall: "border-2 border-static-fill-container",
  small: "border-2 border-static-fill-container",
  medium: "border-2 border-static-fill-container",
  large: "border-3 border-static-fill-container",
};

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `Avatar` elements, one per person. Their `size` and `type` are set by the group. */
  children: React.ReactNode;
  /** Figma "Layout": `row` (overlapping, default) or `grid` (2 × 2). */
  layout?: AvatarGroupLayout;
  /** Figma "Size": xsmall 20 · small 24 · medium 32 (default) · large 40. */
  size?: AvatarGroupSize;
  /**
   * Most circles to show, counter included (default 5 in a row, 4 in a grid). With more people, the group shows
   * `max - 1` avatars and a "+N" counter.
   */
  max?: number;
  /** Total number of people, when `children` is only the first few (e.g. 120 members, 5 avatars passed). */
  total?: number;
  /** Required: names the group with its total, e.g. "12 members". */
  "aria-label": string;
  /**
   * Opens the full list (popover or dialog). When set, the "+N" counter is a button named `moreLabel`;
   * otherwise it is text read as "N more".
   */
  onMoreClick?: () => void;
  /** Accessible name of the counter button (default "Show all <total> people"). */
  moreLabel?: string;
}

/** A set of people as overlapping avatars with a "+N" counter (Figma Avatar Group). */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, layout = "row", size = "medium", max, total, onMoreClick, moreLabel, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<AvatarProps>[];
    const count = Math.max(total ?? items.length, items.length);
    const limit = Math.max(1, max ?? (layout === "grid" ? 4 : 5));
    const shown = count > limit ? items.slice(0, limit - 1) : items.slice(0, limit);
    const more = count - shown.length;
    const isRow = layout === "row";
    const overlap = (i: number) => (isRow && i > 0 ? "-ml-gap-4" : "");

    const counterClass = cn(
      "inline-flex shrink-0 items-center justify-center rounded-control-full bg-dynamic-fill-secondary-alpha-strong-default text-static-text-base",
      circle[size],
      isRow && ring[size],
      overlap(shown.length)
    );

    return (
      <div
        ref={ref}
        role="group"
        className={cn(isRow ? "inline-flex items-center" : "inline-grid w-fit grid-cols-2 gap-gap-3", className)}
        {...props}
      >
        {shown.map((el, i) =>
          React.cloneElement(el, {
            key: el.key ?? i,
            size,
            type: "rounded",
            className: cn(isRow && ring[size], overlap(i), el.props.className),
          })
        )}
        {more > 0 &&
          (onMoreClick ? (
            <button
              type="button"
              onClick={onMoreClick}
              aria-label={moreLabel ?? `Show all ${count} people`}
              className={cn(counterClass, "cursor-pointer transition-[background-color,box-shadow] duration-150 hover:bg-dynamic-fill-secondary-alpha-strong-hover focus-visible:shadow-focus-base focus-visible:outline-none")}
            >
              +{more}
            </button>
          ) : (
            <span className={counterClass}>
              <span aria-hidden="true">+{more}</span>
              <span className="sr-only">{more} more</span>
            </span>
          ))}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };

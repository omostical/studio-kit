import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { tagColorClasses, tagColors, type TagColor } from "./tagColors";

/**
 * Tag — Figma: StudioKIT 2.0 › Tag (831:14706). Description: docs/figma-descriptions/tag.md
 *
 * A read-only label for categories and metadata. Colours are categories only — they carry no meaning like
 * success or danger (use Badge for status).
 * Figma property → prop:  Color → color · Emphasis → emphasis · Size → size · Rounded → rounded ·
 * Variant (Label / Icon / Label + Icon) → children / icon.
 * Sizes: small 20 · medium 24 · large 28; text Caption/Strong/Medium (small) or Label/Strong/Small.
 */
const tagVariants = cva("inline-flex w-fit shrink-0 items-center whitespace-nowrap border", {
  variants: {
    size: {
      small: "h-size-11 px-gap-4 gap-gap-3 type-caption-strong-medium [&_svg]:size-size-7",
      medium: "h-size-12 px-gap-5 gap-gap-3 type-label-strong-small [&_svg]:size-size-9",
      large: "h-size-13 px-gap-7 gap-gap-4 type-label-strong-small [&_svg]:size-size-9",
    },
    rounded: { true: "rounded-control-full", false: "rounded-control-md" },
  },
  defaultVariants: { size: "medium", rounded: false },
});

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Figma Color: one of 13 category colours (brand, red, pink, violet, purple, indigo, blue, cyan, teal, green, lime, yellow, orange). */
  color?: TagColor;
  /** Figma Emphasis: `filled` (tinted, default) or `border`. */
  emphasis?: "filled" | "border";
  /** Figma Size: small (20) · medium (24) · large (28). */
  size?: "small" | "medium" | "large";
  /** Figma Rounded: pill shape when true. */
  rounded?: boolean;
  /** Optional leading icon (Figma "Swap Icon"). */
  icon?: React.ReactNode;
}

/** Read-only label for categories and metadata (Figma Tag). Colours mean categories only, never status — use Badge for status. */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, color = "brand", emphasis = "filled", size, rounded, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(tagVariants({ size, rounded }), tagColorClasses[color][emphasis], className)} {...props}>
      {icon != null && <span aria-hidden="true" className="inline-flex">{icon}</span>}
      {children}
    </span>
  )
);
Tag.displayName = "Tag";

export { Tag, tagVariants, tagColors, type TagColor };

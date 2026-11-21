import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge — Figma: StudioKIT 2.0 › Status Badge (557:10806). Description: docs/figma-descriptions/status-badge.md
 *
 * Shows the status of an item. For categories use Tag; for interactive filters use a Chip.
 * Figma property → prop:  Status → status · Emphasis → emphasis · Shape → shape · Size → size ·
 * Type (Label / Icon / Label + Icon) → children / icon.
 * Low emphasis: Semantic/Fill/<Status> + Semantic/Text/OnSubtle/<Status>;
 * high emphasis: Semantic/Fill/Inverse/<Status> + Semantic/Text/OnInverse/<Status>.
 */
export type BadgeStatus = "negative" | "notice" | "positive" | "info" | "neutral";

const badgeVariants = cva("inline-flex w-fit shrink-0 items-center whitespace-nowrap", {
  variants: {
    size: {
      small: "h-control-medium px-gap-4 gap-gap-3 type-caption-strong-medium [&_svg]:size-size-7",
      medium: "h-control-large px-gap-5 gap-gap-3 type-label-strong-small [&_svg]:size-size-9",
      large: "h-size-13 px-gap-7 gap-gap-4 type-label-strong-small [&_svg]:size-size-9",
    },
    shape: { round: "rounded-control-full", square: "rounded-control-md" },
    tone: {
      "negative-low": "bg-semantic-fill-negative text-semantic-text-onsubtle-negative",
      "notice-low": "bg-semantic-fill-notice text-semantic-text-onsubtle-notice",
      "positive-low": "bg-semantic-fill-positive text-semantic-text-onsubtle-positive",
      "info-low": "bg-semantic-fill-info text-semantic-text-onsubtle-info",
      "neutral-low": "bg-semantic-fill-neutral text-semantic-text-onsubtle-neutral",
      "negative-high": "bg-semantic-fill-inverse-negative text-semantic-text-oninverse-negative",
      "notice-high": "bg-semantic-fill-inverse-notice text-semantic-text-oninverse-notice",
      "positive-high": "bg-semantic-fill-inverse-positive text-semantic-text-oninverse-positive",
      "info-high": "bg-semantic-fill-inverse-info text-semantic-text-oninverse-info",
      "neutral-high": "bg-semantic-fill-inverse-neutral text-semantic-text-oninverse-neutral",
    },
  },
  defaultVariants: { size: "medium", shape: "round", tone: "neutral-low" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma Status: negative · notice · positive · info · neutral. Use a small, consistent set across the product. */
  status?: BadgeStatus;
  /** Figma Emphasis: `low` (tinted, default) or `high` (solid fill). */
  emphasis?: "low" | "high";
  /** Figma Shape: `round` (pill, default) or `square`. */
  shape?: "round" | "square";
  /** Figma Size: small · medium · large. */
  size?: "small" | "medium" | "large";
  /** Optional leading icon. Status must still be readable as text. */
  icon?: React.ReactNode;
}

/** Small read-only label for an item's status (Figma Status Badge). Use Tag for categories. */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, status = "neutral", emphasis = "low", shape, size, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ size, shape, tone: `${status}-${emphasis}` }), className)} {...props}>
      {icon != null && <span aria-hidden="true" className="inline-flex">{icon}</span>}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

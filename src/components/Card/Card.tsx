import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — Figma: StudioKIT 2.0 › Default Card (15489:870). Description: docs/figma-descriptions/default-card.md
 *
 * Figma property → prop:  Container (True/False) → container · Header / Footer / Description → the sub-components.
 * Boxed (container): Static/Fill/Container, 1px Static/Stroke/Base, Corner Radius/Container/lg, Shadow/default.
 * Header 16 × 24 padding with a bottom divider; Content 24; Footer 16 × 24 with a top divider.
 * `container={false}` groups content without a box — use it on grey backgrounds instead of nesting boxes.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma Container: `true` draws the box (border, shadow, dividers); `false` groups content without a box — use it on grey backgrounds. */
  container?: boolean;
}

/** Groups related content and actions (Figma Default Card). Compose with CardHeader/CardTitle/CardDescription/CardContent/CardFooter. */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, container = true, ...props }, ref) => (
  <div
    ref={ref}
    data-container={container}
    className={cn(
      "group/card flex flex-col text-static-text-strong",
      container
        ? "overflow-hidden rounded-container-lg border border-static-stroke-base bg-static-fill-container shadow-default"
        : "gap-gap-9",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start justify-between gap-gap-5",
      "group-data-[container=true]/card:border-b group-data-[container=true]/card:border-static-stroke-base group-data-[container=true]/card:px-gap-12 group-data-[container=true]/card:pb-gap-8 group-data-[container=true]/card:pt-gap-9",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. Defaults to `h2` (a card directly under the page's `h1`); use `h3` for cards inside a titled section. */
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, as: Tag = "h2", ...props }, ref) => (
  <Tag ref={ref} className={cn("m-0 type-subtitle-small text-static-text-strong", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("m-0 mt-gap-5 type-body-medium text-static-text-subtle", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("group-data-[container=true]/card:p-gap-12", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-gap-5",
      "group-data-[container=true]/card:border-t group-data-[container=true]/card:border-static-stroke-base group-data-[container=true]/card:px-gap-12 group-data-[container=true]/card:py-gap-9",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

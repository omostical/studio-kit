"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Tooltip } from "../Tooltip";

/**
 * SegmentedControl — Figma: StudioKIT 2.0 › Segmented Control (557:61066), items from Assets / Segmented Item (557:61311).
 * Description: docs/figma-descriptions/segmented-control.md
 *
 * Figma property → prop:  Variant (Regular / Full Width) → variant · Size → size · Type (Label / Icon) → an item with
 * `icon` and no children is an Icon item · item State → interaction / selected / disabled.
 * Track: Static/Fill/Alpha/Base, padding Gap/2; small Forms/Small + Control/lg, medium Forms/Medium + Control/lg,
 * large Forms/Large + Control/xl (item gap Gap/3, else Gap/2). The Figma 1px inner shadow has no token (GAPS.md).
 * Item: Dynamic/Fill/Secondary/Alpha (hover, pressed); Selected → Static/Fill/Highlight/Base + Elevation/Low;
 * Focus → Focus/Base; Disabled → Dynamic/Text/Secondary/Disabled. Label/Strong/Small (Label/Strong/Medium large).
 * Built on Radix Radio Group: `role="radiogroup"`, arrow keys move and select, one item is always selected.
 * States are styled from aria-checked, not data-state: the Tooltip on Icon items sets its own data-state.
 */
type SegmentedSize = "small" | "medium" | "large";
const SizeContext = React.createContext<SegmentedSize>("medium");

const trackVariants = cva("flex items-stretch bg-static-fill-alpha-base p-gap-2", {
  variants: {
    size: {
      small: "h-forms-small rounded-control-lg gap-gap-2",
      medium: "h-forms-medium rounded-control-lg gap-gap-2",
      large: "h-forms-large rounded-control-xl gap-gap-3",
    },
    variant: { regular: "inline-flex w-max max-w-full", "full-width": "w-full" },
  },
  defaultVariants: { size: "medium", variant: "regular" },
});

const itemVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-gap-5 whitespace-nowrap transition-[background-color,box-shadow] duration-150",
    "text-dynamic-text-secondary-default [&_svg]:size-size-9 [&_svg]:shrink-0",
    "not-aria-checked:bg-dynamic-fill-secondary-alpha-default not-aria-checked:hover:bg-dynamic-fill-secondary-alpha-hover not-aria-checked:active:bg-dynamic-fill-secondary-alpha-pressed not-aria-checked:[&_svg]:text-static-text-base",
    "aria-checked:bg-static-fill-highlight-base aria-checked:shadow-elevation-low",
    "focus-visible:outline-none focus-visible:shadow-focus-base",
    "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-dynamic-text-secondary-disabled disabled:shadow-none disabled:[&_svg]:text-dynamic-text-secondary-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        small: "rounded-control-md type-label-strong-small",
        medium: "rounded-control-md type-label-strong-small",
        large: "rounded-control-lg type-label-strong-medium",
      },
      iconOnly: { true: "aspect-square", false: "" },
      fullWidth: { true: "flex-1", false: "" },
    },
    compoundVariants: [
      { size: "small", iconOnly: false, className: "px-gap-7" },
      { size: "medium", iconOnly: false, className: "px-gap-9" },
      { size: "large", iconOnly: false, className: "px-gap-11" },
    ],
    defaultVariants: { size: "medium", iconOnly: false, fullWidth: false },
  }
);

const FullWidthContext = React.createContext(false);

export interface SegmentedControlProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "orientation" | "dir"> {
  /** Figma Variant: `regular` (fits its items, default) or `full-width` (fills the row; items share it equally). */
  variant?: "regular" | "full-width";
  /** Figma Size: small (32) · medium (40, default) · large (48). */
  size?: SegmentedSize;
  /** Name of the choice ("View", "Period"). Required: the control has no visible label of its own. */
  "aria-label"?: string;
}

/** A row of 2–5 options that switches a view or mode right away (Figma Segmented Control). Use Tabs for sections, Radio Group in forms. */
const SegmentedControl = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, SegmentedControlProps>(
  ({ className, variant = "regular", size = "medium", children, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation="horizontal"
      loop
      className={cn(trackVariants({ size, variant }), className)}
      {...props}
    >
      <SizeContext.Provider value={size}>
        <FullWidthContext.Provider value={variant === "full-width"}>{children}</FullWidthContext.Provider>
      </SizeContext.Provider>
    </RadioGroupPrimitive.Root>
  )
);
SegmentedControl.displayName = "SegmentedControl";

export interface SegmentedControlItemProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  /** The value this item selects. */
  value: string;
  /** Icon before the label (Figma Prefix Icon), or the whole item when there is no label (Figma Type=Icon). */
  icon?: React.ReactNode;
  /** The label. Leave it out for an Icon item, and pass aria-label: it also becomes the item's tooltip. */
  children?: React.ReactNode;
  /** Name of an Icon item ("Grid view"). Required when there are no children. */
  "aria-label"?: string;
}

/** One option of a SegmentedControl. Keep labels short and similar in length. */
const SegmentedControlItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, SegmentedControlItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    const size = React.useContext(SizeContext);
    const fullWidth = React.useContext(FullWidthContext);
    const iconOnly = children == null;
    const item = (
      <RadioGroupPrimitive.Item ref={ref} className={cn(itemVariants({ size, iconOnly, fullWidth }), className)} {...props}>
        {icon != null && <span aria-hidden="true" className="flex items-center">{icon}</span>}
        {children != null && <span className="truncate">{children}</span>}
      </RadioGroupPrimitive.Item>
    );
    return iconOnly && props["aria-label"] ? <Tooltip content={props["aria-label"]}>{item}</Tooltip> : item;
  }
);
SegmentedControlItem.displayName = "SegmentedControlItem";

export { SegmentedControl, SegmentedControlItem };

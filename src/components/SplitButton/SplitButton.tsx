"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/DropdownMenu/DropdownMenu";
import type { ControlVariant } from "../_shared/controlColors";

/**
 * SplitButton — Figma: StudioKIT 2.0 › Split Button (4402:90631). Description: docs/figma-descriptions/split-button.md
 *
 * A Button for the main action joined to an Icon Button that opens a DropdownMenu of related alternatives.
 * Built from Button, IconButton and DropdownMenu, so colours, sizes, focus and the menu pattern are theirs.
 * Figma property → prop:  Variant → variant · Style → appearance (filled · border) · Size → size.
 * Joined edge: inner corners Corner Radius/Control/none, outer corners keep the Button radius for the size.
 * Filled: a 1px divider on the arrow's left edge — Static/Stroke/Inverse/Strong (primary, danger, success),
 * Static/Text/Inverse/Base (secondary), Static/Stroke/Strong (inverse). Border: the two borders overlap by 1px.
 * Figma names the Success variants "Variant=Danger" (component-set error); code follows the intended Success.
 */
const divider: Record<ControlVariant, string> = {
  primary: "border-l border-static-stroke-inverse-strong",
  danger: "border-l border-static-stroke-inverse-strong",
  success: "border-l border-static-stroke-inverse-strong",
  secondary: "border-l border-static-text-inverse-base",
  inverse: "border-l border-static-stroke-strong",
};

export interface SplitButtonProps extends Omit<ButtonProps, "appearance" | "asChild" | "suffixIcon"> {
  /** Figma "Style": `filled` (default) or `border`. Split Button has no ghost style. */
  appearance?: "filled" | "border";
  /** The alternatives: `DropdownMenuItem`s (2–6 related actions). */
  menu: React.ReactNode;
  /** Required: names the arrow button, e.g. "More save options". */
  menuLabel: string;
  /** Props for the menu panel (e.g. `align`, `className`). */
  menuContentProps?: React.ComponentPropsWithoutRef<typeof DropdownMenuContent>;
}

/** A main action plus a menu of related alternatives (Figma Split Button). Use Button when there is only one action. */
const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  ({ className, variant = "primary", appearance = "filled", size = "medium", menu, menuLabel, menuContentProps, disabled, loading, ...props }, ref) => (
    <div role="group" className={cn("inline-flex items-stretch", className)}>
      <Button
        ref={ref}
        variant={variant}
        appearance={appearance}
        size={size}
        disabled={disabled}
        loading={loading}
        className="relative rounded-r-none focus-visible:z-10"
        {...props}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled || loading}>
          <IconButton
            variant={variant}
            appearance={appearance}
            size={size}
            icon={<ChevronDown />}
            aria-label={menuLabel}
            disabled={disabled || loading}
            className={cn("relative rounded-l-none focus-visible:z-10", appearance === "filled" ? divider[variant] : "-ml-px")}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" {...menuContentProps}>
          {menu}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
);
SplitButton.displayName = "SplitButton";

export { SplitButton };

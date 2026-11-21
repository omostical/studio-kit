"use client";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

/**
 * Tooltip — Figma: StudioKIT 2.0 › Tooltip (557:88017). Description: docs/figma-descriptions/tooltip.md
 *
 * Figma property → prop:  Variant (Default / Inverse) → variant · Size → size · Alignment → side ·
 * Label / Description → content / description · Arrow → arrow.
 * Default: Static/Fill/Inverse/Background, label Body/Strong/Medium in Static/Text/Inverse/Strong,
 * description Static/Text/Inverse/Subtle, Controls/Tooltip shadow. Inverse: Static/Fill/Overlay + Elevation/Medium.
 * Radix shows it on hover and keyboard focus, links it with aria-describedby, and Escape dismisses it.
 * Keep it to a few words; never put essential information or interactive content in a tooltip.
 */
export interface TooltipProps {
  content: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "inverse";
  size?: "small" | "medium";
  side?: "top" | "right" | "bottom" | "left";
  arrow?: boolean;
  delayDuration?: number;
  /** The element the tooltip describes. Must be focusable (a button, link or input). */
  children: React.ReactElement;
}

const Tooltip = ({ content, description, variant = "default", size = "medium", side = "top", arrow = true, delayDuration = 300, children }: TooltipProps) => {
  const isDefault = variant === "default";
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            collisionPadding={8}
            className={cn(
              "z-50 flex max-w-64 flex-col rounded-control-md",
              size === "medium" ? "px-gap-5 py-gap-4" : "px-gap-4 py-gap-3",
              isDefault ? "bg-static-fill-inverse-background shadow-controls-tooltip" : "bg-static-fill-overlay shadow-elevation-medium"
            )}
          >
            <span className={cn(size === "medium" ? "type-body-strong-medium" : "type-body-strong-small", isDefault ? "text-static-text-inverse-strong" : "text-static-text-strong")}>
              {content}
            </span>
            {description != null && (
              <span className={cn(size === "medium" ? "type-body-medium" : "type-body-small", isDefault ? "text-static-text-inverse-subtle" : "text-static-text-subtle")}>
                {description}
              </span>
            )}
            {arrow && (
              <TooltipPrimitive.Arrow width={8} height={4} className={isDefault ? "fill-static-fill-inverse-background" : "fill-static-fill-overlay"} />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export { Tooltip };

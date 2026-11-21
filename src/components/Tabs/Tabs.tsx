"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Tabs — Figma: StudioKIT 2.0 › Tabs (2014:13749) with .Assets / Tab Items. Description: docs/figma-descriptions/tabs.md
 *
 * Figma property → prop:  Variant (Regular / Full width / Pill) → variant + fullWidth · Size → size ·
 * Show Divider → divider.
 * Regular: 40 / 48 tall, 24 between tabs, Label/Strong/Small|Medium in Static/Text/Base; the selected tab gets a
 * 2px Dynamic/Stroke/Secondary/Strong underline (neutral, as in Figma), hover a Dynamic/Stroke/Secondary/Hover one.
 * Pill: 32 / 36 tall, Corner Radius/Control/full, 1px Dynamic/Stroke/Secondary border; selected =
 * Dynamic/Fill/Primary/Alpha/Strong fill with Dynamic/Text/Primary text.
 * Radix provides the ARIA tabs pattern (tablist / tab / tabpanel, arrow-key navigation).
 */
type TabsVariant = "regular" | "pill";
type TabsSize = "small" | "large";
const TabsContext = React.createContext<{ variant: TabsVariant; size: TabsSize; fullWidth: boolean }>({ variant: "regular", size: "large", fullWidth: false });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  size?: TabsSize;
  /** Tabs share the full width (Figma "Full width"). */
  fullWidth?: boolean;
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ variant = "regular", size = "large", fullWidth = false, className, ...props }, ref) => (
    <TabsContext.Provider value={{ variant, size, fullWidth }}>
      <TabsPrimitive.Root ref={ref} className={cn("flex flex-col gap-gap-9", className)} {...props} />
    </TabsContext.Provider>
  )
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** Bottom divider under Regular tabs (Figma "Show Divider"). */
  divider?: boolean;
}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(({ className, divider = true, ...props }, ref) => {
  const { variant, fullWidth } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex items-center",
        variant === "regular" ? "gap-gap-12" : "gap-gap-5",
        variant === "regular" && divider && "border-b border-static-stroke-base",
        fullWidth && "w-full [&>*]:flex-1",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => {
    const { variant, size } = React.useContext(TabsContext);
    const large = size === "large";
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-gap-5 whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150",
          "focus-visible:outline-none focus-visible:shadow-focus-base disabled:pointer-events-none disabled:text-static-text-subtle",
          large ? "type-label-strong-medium" : "type-label-strong-small",
          variant === "regular"
            ? cn(
                "-mb-px rounded-t-control-sm border-b-2 border-transparent text-static-text-base",
                "hover:border-dynamic-stroke-secondary-hover data-[state=active]:border-dynamic-stroke-secondary-strong-default",
                large ? "h-size-18" : "h-size-16"
              )
            : cn(
                "rounded-control-full border border-dynamic-stroke-secondary-default px-gap-9 text-static-text-base",
                "hover:border-dynamic-stroke-secondary-hover",
                "data-[state=active]:border-transparent data-[state=active]:bg-dynamic-fill-primary-alpha-strong-default data-[state=active]:text-dynamic-text-primary-default",
                large ? "h-size-15" : "h-size-14"
              ),
          className
        )}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content ref={ref} className={cn("rounded-control-sm focus-visible:outline-none focus-visible:shadow-focus-base", className)} {...props} />
  )
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };

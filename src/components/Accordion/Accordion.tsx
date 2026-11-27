"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion — Figma: StudioKIT 2.0 › Accordion (557:9948) and Accordion Group (2746:2110).
 * Description: docs/figma-descriptions/accordion.md, accordion-group.md
 *
 * A heading that expands and collapses a section. Built on Radix Accordion: the heading is a `<button>` inside a
 * heading element with `aria-expanded` and `aria-controls`; Enter and Space toggle; arrow keys, Home and End move
 * between headings in a group.
 *
 * Figma property → prop:  Contained → `contained` (on AccordionGroup, or on a single Accordion) · Expanded →
 * `defaultExpanded` / the group's `value` · Entity (show/hide) → `icon` · Label → `title` · State → hover / pressed /
 * focus-visible / `disabled`. Accordion Group Contained → `contained`; several items may be open (`type="multiple"`)
 * unless you pass `type="single"`.
 *
 * Contained: Corner Radius/Container/md, 1px Static/Stroke/Strong, Dynamic/Fill/Secondary/Alpha/Default → Hover →
 * Pressed on the whole item; focus adds Dynamic/Stroke/Secondary/Default and Focus/Base; disabled stroke
 * Dynamic/Stroke/Secondary/Disabled. Header padding Gap/8 × Gap/9, panel Gap/9 at the sides and bottom.
 * Not contained: a 1px Static/Stroke/Strong bottom divider, no side padding, the title underlines on hover and press,
 * panel bottom padding Gap/7. Header: gap Gap/7, 20px (Size/11) icon and chevron, title Label/Strong/Small in
 * Static/Text/Strong (Static/Text/Subtle when disabled). Panel: Body/Medium in Static/Text/Subtle, gap Gap/9.
 * Group: Gap/5 between contained items, none between dividers.
 */
const GroupContext = React.createContext<{ contained: boolean } | null>(null);

type GroupBase = {
  /** Figma "Contained": each item in its own bordered box (default) or, when false, items separated by dividers. */
  contained?: boolean;
};
type GroupMultiple = Omit<AccordionPrimitive.AccordionMultipleProps, "type"> & {
  /** `multiple` (default): any number of items open. `single`: opening one closes the others. */
  type?: "multiple";
};
type GroupSingle = AccordionPrimitive.AccordionSingleProps;
export type AccordionGroupProps = GroupBase & (GroupMultiple | GroupSingle);

/** A stack of Accordion items with shared spacing (Figma Accordion Group). Pick single or multiple and keep it the same across the product. */
const AccordionGroup = React.forwardRef<HTMLDivElement, AccordionGroupProps>(({ contained = true, className, ...props }, ref) => {
  const rootProps = (props.type === "single" ? { collapsible: true, ...props } : { ...props, type: "multiple" }) as
    | AccordionPrimitive.AccordionSingleProps
    | AccordionPrimitive.AccordionMultipleProps;
  return (
    <GroupContext.Provider value={{ contained }}>
      <AccordionPrimitive.Root ref={ref} className={cn("flex flex-col", contained && "gap-gap-5", className)} {...rootProps} />
    </GroupContext.Provider>
  );
});
AccordionGroup.displayName = "AccordionGroup";

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Figma "Label": the heading. Say what's inside so people can choose without opening everything. */
  title: React.ReactNode;
  /** Figma "Entity": an optional 20px icon before the title. Decorative. */
  icon?: React.ReactNode;
  /** Identifies the item inside an AccordionGroup (for the group's `value` / `defaultValue`). Generated when omitted. */
  value?: string;
  /** Figma State "Disabled": the item can't be opened or closed. */
  disabled?: boolean;
  /** Figma "Contained". Inside an AccordionGroup the group decides; a standalone Accordion defaults to `false`. */
  contained?: boolean;
  /** Standalone only: start expanded. Inside a group, use the group's `defaultValue`. Start collapsed unless this section is the obvious starting point. */
  defaultExpanded?: boolean;
  /** Heading level of the title (2–6). Default 3; follow the page's heading order. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** The panel content: text, and at most a small action. */
  children?: React.ReactNode;
}

/** One expandable section (Figma Accordion). Stack several in an AccordionGroup; a single one works on its own. */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ title, icon, value, disabled = false, contained: containedProp, defaultExpanded, headingLevel = 3, className, children, ...props }, ref) => {
    const group = React.useContext(GroupContext);
    const generated = React.useId();
    const itemValue = value ?? generated;
    const contained = group ? group.contained : (containedProp ?? false);
    const Heading = `h${headingLevel}` as const;

    const item = (
      <AccordionPrimitive.Item
        ref={ref}
        value={itemValue}
        disabled={disabled}
        className={cn(
          "transition-[background-color,border-color,box-shadow] duration-150",
          "has-[.accordion-trigger:focus-visible]:shadow-focus-base",
          contained
            ? "rounded-container-md border border-static-stroke-strong bg-dynamic-fill-secondary-alpha-default has-[.accordion-trigger:enabled:hover]:bg-dynamic-fill-secondary-alpha-hover has-[.accordion-trigger:enabled:active]:bg-dynamic-fill-secondary-alpha-pressed has-[.accordion-trigger:focus-visible]:border-dynamic-stroke-secondary-default data-[disabled]:border-dynamic-stroke-secondary-disabled"
            : "border-b border-static-stroke-strong",
          className
        )}
        {...props}
      >
        <AccordionPrimitive.Header asChild>
          <Heading className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "accordion-trigger group/trigger flex w-full items-center gap-gap-7 py-gap-8 text-left outline-none disabled:cursor-not-allowed",
                contained ? "px-gap-9" : "underline-offset-4 enabled:hover:underline enabled:active:underline"
              )}
            >
              {icon && (
                <span aria-hidden="true" className="flex size-size-11 shrink-0 items-center justify-center text-static-text-strong [&_svg]:size-size-11">
                  {icon}
                </span>
              )}
              <span className={cn("flex-1 type-label-strong-small", disabled ? "text-static-text-subtle" : "text-static-text-strong")}>{title}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-size-11 shrink-0 text-static-text-strong transition-transform duration-150 group-data-[state=open]/trigger:rotate-180"
              />
            </AccordionPrimitive.Trigger>
          </Heading>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content>
          <div
            className={cn(
              "flex flex-col items-start gap-gap-9 type-body-medium text-static-text-subtle",
              contained ? "px-gap-9 pb-gap-9" : "pb-gap-7"
            )}
          >
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );

    if (group) return item;
    return (
      <AccordionPrimitive.Root type="multiple" defaultValue={defaultExpanded ? [itemValue] : undefined}>
        {item}
      </AccordionPrimitive.Root>
    );
  }
);
Accordion.displayName = "Accordion";

export { Accordion, AccordionGroup };

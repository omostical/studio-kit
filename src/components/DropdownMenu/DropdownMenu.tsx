"use client";

import * as React from "react";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkboxVariants } from "@/components/Checkbox/Checkbox";

/**
 * DropdownMenu — Figma: StudioKIT 2.0 › Dropdown Menu (1490:38985) and Dropdown Menu / Menu Item (1294:41224).
 * Description: docs/figma-descriptions/dropdown-menu.md
 *
 * A list of actions or options that opens from a button. Built on Radix Dropdown Menu, which gives the ARIA menu
 * pattern: arrow keys move, Enter/Space activate, Escape closes and returns focus to the trigger, typing jumps to
 * an item.
 *
 * Figma Menu Item "Type" → part:  Single Select → DropdownMenuItem (actions) or DropdownMenuRadioItem (one option
 * of several, check on the right) · Multi Select → DropdownMenuCheckboxItem (Checkbox on the left) ·
 * Destructive → DropdownMenuItem variant="danger" · Group → DropdownMenuLabel · Divider → DropdownMenuSeparator.
 * Show/hide Prefix → icon · Description → description · Shortcut → shortcut · Suffix → submenu chevron.
 *
 * Panel: Static/Fill/Overlay, Elevation/Medium, Corner Radius/Container/sm, padding Gap/3, min width 320 (no
 * container-width token yet, recorded exception). Item: 32px, padding Gap/3 × Gap/5, gap Gap/5, Control/md, Label/Small
 * in Dynamic/Text/Secondary; hover and keyboard focus Dynamic/Fill/Secondary/Alpha/Hover; selected
 * Dynamic/Fill/Primary/Alpha/Strong; keyboard focus adds the Focus/Base ring (Figma's item ring is bound to
 * Static/Background/* variables that aren't in the token export). The Figma Search, Select All and Create slots and the Progress item type are
 * not in code yet (GAPS.md).
 */
const DropdownMenu = MenuPrimitive.Root;
const DropdownMenuTrigger = MenuPrimitive.Trigger;
const DropdownMenuGroup = MenuPrimitive.Group;
const DropdownMenuPortal = MenuPrimitive.Portal;
const DropdownMenuSub = MenuPrimitive.Sub;
const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const panel =
  // token-lint-ignore: Figma menu width 320 (no container-width token, GAPS.md) and the Radix available-height variable
  "z-50 min-w-[320px] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-container-sm bg-static-fill-overlay p-gap-3 text-static-text-strong shadow-elevation-medium outline-none";

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, sideOffset = 4, align = "start", collisionPadding = 8, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      collisionPadding={collisionPadding}
      className={cn(panel, className)}
      {...props}
    />
  </MenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const row =
  "relative flex min-h-forms-small w-full cursor-pointer select-none items-center gap-gap-5 rounded-control-md px-gap-5 py-gap-3 text-left outline-none transition-colors duration-150 focus-visible:shadow-focus-base " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-dynamic-text-secondary-disabled [&_svg]:shrink-0";

const tone = {
  default:
    "text-dynamic-text-secondary-default data-[highlighted]:bg-dynamic-fill-secondary-alpha-hover active:bg-dynamic-fill-secondary-alpha-pressed",
  danger:
    "text-dynamic-text-danger-default data-[highlighted]:bg-dynamic-fill-danger-alpha-hover active:bg-dynamic-fill-danger-alpha-pressed",
};

interface ItemContentProps {
  /** Figma "Prefix": a 16px icon before the label. */
  icon?: React.ReactNode;
  /** Figma "Description": a second line under the label. */
  description?: React.ReactNode;
  /** Figma "Shortcut": key hint on the right, e.g. "⌘D". Show it only if the shortcut really works. */
  shortcut?: React.ReactNode;
}

function ItemContent({ icon, description, shortcut, children, iconTone }: ItemContentProps & { children: React.ReactNode; iconTone?: string }) {
  return (
    <>
      {icon && (
        <span aria-hidden="true" className={cn("flex size-size-9 items-center justify-center [&_svg]:size-size-9", iconTone ?? "text-static-text-subtle")}>
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="type-label-small">{children}</span>
        {description && <span className="type-body-small text-static-text-subtle">{description}</span>}
      </span>
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </>
  );
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item>,
    ItemContentProps {
  /** Figma Menu Item Type: `default`, or `danger` (Figma "Destructive") for destructive actions — put them last. */
  variant?: "default" | "danger";
}

/** An action. Start the label with a verb ("Duplicate", "Download invoice"). */
const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof MenuPrimitive.Item>, DropdownMenuItemProps>(
  ({ className, variant = "default", icon, description, shortcut, children, ...props }, ref) => (
    <MenuPrimitive.Item ref={ref} className={cn(row, tone[variant], className)} {...props}>
      <ItemContent icon={icon} description={description} shortcut={shortcut} iconTone={variant === "danger" ? "text-dynamic-text-danger-default" : undefined}>
        {children}
      </ItemContent>
    </MenuPrimitive.Item>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>,
    Omit<ItemContentProps, "icon"> {}

/** Figma "Multi Select": an option that toggles on and off; several can be on. Pass `checked` and `onCheckedChange`. */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, checked, description, shortcut, children, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(row, tone.default, className)}
    {...props}
  >
    <span
      aria-hidden="true"
      data-state={checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked"}
      className={checkboxVariants({ size: "large" })}
    >
      <MenuPrimitive.ItemIndicator>
        <Check />
      </MenuPrimitive.ItemIndicator>
    </span>
    <ItemContent description={description} shortcut={shortcut}>
      {children}
    </ItemContent>
  </MenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>,
    ItemContentProps {}

/** Figma "Single Select" with Selected: one option of several, inside a DropdownMenuRadioGroup. */
const DropdownMenuRadioItem = React.forwardRef<React.ElementRef<typeof MenuPrimitive.RadioItem>, DropdownMenuRadioItemProps>(
  ({ className, icon, description, shortcut, children, ...props }, ref) => (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn(row, tone.default, "data-[state=checked]:bg-dynamic-fill-primary-alpha-strong-default", className)}
      {...props}
    >
      <ItemContent icon={icon} description={description} shortcut={shortcut}>
        {children}
      </ItemContent>
      <MenuPrimitive.ItemIndicator>
        <Check aria-hidden="true" className="size-size-11 text-dynamic-text-primary-default" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  )
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

/** Figma "Group": a short heading above a group of items. */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Label
    ref={ref}
    className={cn("px-gap-5 pb-gap-5 pt-gap-7 type-caption-strong-medium text-static-text-subtle", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/** Figma "Divider": separates groups of items. */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-gap-3 my-gap-4 h-px bg-static-stroke-base", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/** Figma "Shortcut": the key hint box on the right of an item. */
function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <kbd
      className={cn(
        "ml-auto inline-flex h-size-12 shrink-0 items-center rounded-control-md border border-static-stroke-base px-gap-4 font-sans type-caption-medium text-static-text-subtle",
        className
      )}
      {...props}
    />
  );
}

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>,
    Omit<ItemContentProps, "shortcut"> {}

/** Opens a submenu (Figma "Suffix" chevron). Keep to one level of submenu. */
const DropdownMenuSubTrigger = React.forwardRef<React.ElementRef<typeof MenuPrimitive.SubTrigger>, DropdownMenuSubTriggerProps>(
  ({ className, icon, description, children, ...props }, ref) => (
    <MenuPrimitive.SubTrigger
      ref={ref}
      className={cn(row, tone.default, "data-[state=open]:bg-dynamic-fill-secondary-alpha-hover", className)}
      {...props}
    >
      <ItemContent icon={icon} description={description}>
        {children}
      </ItemContent>
      <ChevronRight aria-hidden="true" className="ml-auto size-size-9" />
    </MenuPrimitive.SubTrigger>
  )
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(({ className, sideOffset = 8, collisionPadding = 8, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.SubContent ref={ref} sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn(panel, className)} {...props} />
  </MenuPrimitive.Portal>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

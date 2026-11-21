import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldShell, fieldAriaProps, fieldBoxVariants, type FieldAppearance, type FieldSize, type FieldVariant } from "../_shared/field";

/**
 * Select — Figma: StudioKIT 2.0 › Single Select (1862:10385); list = Dropdown Menu (1490:38985) with
 * Dropdown Menu / Menu Item rows. Description: docs/figma-descriptions/single-select.md
 *
 * Same field model as Input (size · variant · appearance · label · helperText · error).
 * Menu: Static/Fill/Overlay, Corner Radius/Container/md, Elevation/Medium; items 32px, Label/Small,
 * hover Dynamic/Fill/Secondary/Alpha/Hover, selected Dynamic/Fill/Primary/Alpha/Hover.
 */
export interface SelectProps {
  size?: FieldSize;
  variant?: FieldVariant;
  appearance?: FieldAppearance;
  label?: React.ReactNode;
  optional?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-forms-small w-full cursor-pointer select-none items-center gap-gap-5 rounded-control-md pl-gap-5 pr-gap-12",
      "type-label-small text-static-text-strong outline-none",
      "data-[highlighted]:bg-dynamic-fill-secondary-alpha-hover data-[state=checked]:bg-dynamic-fill-primary-alpha-hover",
      "data-[disabled]:pointer-events-none data-[disabled]:text-dynamic-text-secondary-disabled",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-gap-5 flex items-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-size-9 text-dynamic-text-primary-default" aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      size = "medium",
      variant,
      appearance = "border",
      label,
      optional,
      helperText,
      error,
      placeholder = "Select an option",
      value,
      defaultValue,
      onValueChange,
      disabled,
      name,
      id,
      children,
      className,
      wrapperClassName,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const resolvedVariant = error != null ? "danger" : (variant ?? "primary");
    return (
      <FieldShell
        id={triggerId}
        label={label}
        optional={optional}
        helperText={helperText}
        error={error}
        disabled={disabled}
        className={wrapperClassName}
      >
        <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
          <SelectPrimitive.Trigger
            ref={ref}
            id={triggerId}
            {...fieldAriaProps(triggerId, { error, helperText })}
            className={cn(
              fieldBoxVariants({ size, appearance, variant: resolvedVariant, disabled: !!disabled }),
              "justify-between text-left outline-none focus-visible:border-dynamic-stroke-primary-strong-default focus-visible:shadow-forms-active",
              "data-[placeholder]:text-static-text-subtle [&>span]:truncate",
              className
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="shrink-0 text-static-text-subtle" aria-hidden />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={4}
              className="relative z-50 max-h-80 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-container-md bg-static-fill-overlay shadow-elevation-medium"
            >
              <SelectPrimitive.Viewport className="p-gap-3">{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </FieldShell>
    );
  }
);
Select.displayName = "Select";

export { Select, SelectItem };

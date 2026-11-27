"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * RadioButton — Figma: StudioKIT 2.0 › Radio Button (557:58107). Description: docs/figma-descriptions/radio-button.md
 *
 * Figma property → prop:  Variant → variant · Type (Unselected/Selected) → the group's value · Size → size ·
 * State → interaction / disabled · Label / Description → label / description.
 * Control: Components/Control/Medium (20, large) or Small (16), Corner Radius/Control/full, Controls/Control shadow.
 * Unselected: Static/Fill/Highlight/Base + 1px Dynamic/Stroke/Secondary. Selected: Dynamic/Fill/Secondary/Alpha +
 * 2px Dynamic/Stroke/Primary/Strong, dot Dynamic/Fill/Primary (Size/6 = 10 large, Size/5 = 8 small).
 * Danger swaps in the Danger strokes and fills. Focused → Focus/Base (Focus/Danger). Gap/5 between control and text.
 * Built on Radix Radio Group: always render it inside a `RadioGroup` (or a Radix Radio Group root).
 */
const controlVariants = cva(
  [
    "group relative inline-flex shrink-0 items-center justify-center rounded-control-full border transition-colors duration-150",
    "shadow-controls-control focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none",
    "data-[state=unchecked]:bg-static-fill-highlight-base data-[state=checked]:border-2",
    "disabled:border-dynamic-stroke-secondary-disabled disabled:data-[state=unchecked]:bg-dynamic-fill-secondary-alpha-default disabled:data-[state=checked]:bg-dynamic-fill-secondary-alpha-default",
  ].join(" "),
  {
    variants: {
      size: {
        small: "size-control-small",
        large: "size-control-medium",
      },
      variant: {
        primary: [
          "focus-visible:shadow-focus-base",
          "data-[state=unchecked]:border-dynamic-stroke-secondary-default hover:data-[state=unchecked]:border-dynamic-stroke-secondary-hover active:data-[state=unchecked]:border-dynamic-stroke-secondary-pressed",
          "data-[state=checked]:bg-dynamic-fill-secondary-alpha-default data-[state=checked]:border-dynamic-stroke-primary-strong-default",
          "hover:data-[state=checked]:bg-dynamic-fill-primary-alpha-hover hover:data-[state=checked]:border-dynamic-stroke-primary-strong-hover",
          "active:data-[state=checked]:bg-dynamic-fill-primary-alpha-pressed active:data-[state=checked]:border-dynamic-stroke-primary-strong-pressed",
        ].join(" "),
        danger: [
          "focus-visible:shadow-focus-danger",
          "data-[state=unchecked]:border-dynamic-stroke-danger-strong-default hover:data-[state=unchecked]:border-dynamic-stroke-danger-strong-hover",
          "data-[state=checked]:bg-dynamic-fill-danger-alpha-default data-[state=checked]:border-dynamic-stroke-danger-strong-default",
          "hover:data-[state=checked]:bg-dynamic-fill-danger-alpha-hover",
        ].join(" "),
      },
    },
    defaultVariants: { size: "large", variant: "primary" },
  }
);

const dotVariants = cva("block rounded-control-full group-disabled:bg-dynamic-fill-primary-disabled", {
  variants: {
    size: { small: "size-size-5", large: "size-size-6" },
    variant: {
      primary: "bg-dynamic-fill-primary-default group-hover:bg-dynamic-fill-primary-hover group-active:bg-dynamic-fill-primary-pressed",
      danger: "bg-dynamic-fill-danger-default group-hover:bg-dynamic-fill-danger-hover",
    },
  },
  defaultVariants: { size: "large", variant: "primary" },
});

export interface RadioButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  /** The value this option sets on its group. */
  value: string;
  /** Figma Size: `large` (20px control, default) or `small` (16px). `RadioGroup size` sets it for every option. */
  size?: "small" | "large";
  /** Figma Variant: `danger` marks an invalid choice; `RadioGroup error` sets it for every option. */
  variant?: "primary" | "danger";
  /** Label next to the control; clicking it selects the option. Without one, pass aria-label. */
  label?: React.ReactNode;
  /** Helper text under the label (Figma Description). */
  description?: React.ReactNode;
}

interface RadioDefaults {
  size?: "small" | "large";
  variant?: "primary" | "danger";
}
/** Lets RadioGroup pass size and variant to its options. */
export const RadioDefaultsContext = React.createContext<RadioDefaults>({});

/** One option of a set where exactly one can be chosen (Figma Radio Button). Use inside `RadioGroup`. */
const RadioButton = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioButtonProps>(
  ({ className, size: sizeProp, variant: variantProp, label, description, disabled, id, ...props }, ref) => {
    const defaults = React.useContext(RadioDefaultsContext);
    const size = sizeProp ?? defaults.size ?? "large";
    const variant = variantProp ?? defaults.variant ?? "primary";
    const generatedId = React.useId();
    const itemId = id ?? generatedId;

    return (
      <div className={cn("inline-flex items-start gap-gap-5", disabled && "cursor-not-allowed")}>
        <span className={cn("flex shrink-0 items-center", size === "small" ? "h-control-medium" : undefined)}>
          <RadioGroupPrimitive.Item
            ref={ref}
            id={itemId}
            disabled={disabled}
            aria-describedby={description != null ? `${itemId}-description` : undefined}
            className={cn(controlVariants({ size, variant }), className)}
            {...props}
          >
            <RadioGroupPrimitive.Indicator className={dotVariants({ size, variant })} />
          </RadioGroupPrimitive.Item>
        </span>
        {(label != null || description != null) && (
          <div className="flex flex-col gap-gap-3">
            {label != null && (
              <label
                htmlFor={itemId}
                className={cn(
                  "type-label-small",
                  disabled ? "cursor-not-allowed text-static-text-subtle" : "cursor-pointer text-static-text-base"
                )}
              >
                {label}
              </label>
            )}
            {description != null && (
              <span id={`${itemId}-description`} className="type-body-small text-static-text-subtle">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
RadioButton.displayName = "RadioButton";

export { RadioButton };

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * Switch — Figma: StudioKIT 2.0 › Switch (557:75442). Description: docs/figma-descriptions/switch.md
 *
 * Figma property → prop:  Size → size · Selected → checked · Label (None/Left/Right) → labelPosition ·
 * State → interaction / disabled · Description → description.
 * Track: large 32×20 (Control/XXLarge × Control/Medium), small 28×16 (Control/XLarge × Control/Small);
 * off Dynamic/Fill/Secondary/Alpha/Strong/Default, on Dynamic/Fill/Primary/Default.
 * Thumb: 16 / 12, Dynamic/Text/OnPrimary/Default with the Elevation/Medium shadow.
 */
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: "small" | "large";
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Where the label sits. Label the setting, not the state ("Email notifications", not "On"). */
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size = "large", label, description, labelPosition = "right", id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;
    const large = size === "large";

    const control = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        disabled={disabled}
        aria-describedby={description != null ? `${switchId}-description` : undefined}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-control-full p-[2px] transition-colors duration-150",
          "focus-visible:outline-none focus-visible:shadow-focus-base",
          "data-[state=unchecked]:bg-dynamic-fill-secondary-alpha-strong-default data-[state=unchecked]:hover:bg-dynamic-fill-secondary-alpha-strong-hover",
          "data-[state=checked]:bg-dynamic-fill-primary-default data-[state=checked]:hover:bg-dynamic-fill-primary-hover",
          "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-dynamic-fill-primary-disabled disabled:data-[state=unchecked]:bg-static-fill-alpha-subtle",
          large ? "h-control-medium w-control-xxlarge" : "h-control-small w-control-xlarge",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-control-full bg-dynamic-text-onprimary-default shadow-elevation-medium transition-transform duration-150",
            "data-[state=unchecked]:translate-x-0",
            large ? "size-control-small data-[state=checked]:translate-x-3" : "size-control-xsmall data-[state=checked]:translate-x-3"
          )}
        />
      </SwitchPrimitive.Root>
    );

    if (label == null && description == null) return control;

    const text = (
      <div className="flex flex-col gap-gap-3">
        {label != null && (
          <label
            htmlFor={switchId}
            className={cn("type-label-small", disabled ? "cursor-not-allowed text-dynamic-text-secondary-disabled" : "cursor-pointer text-dynamic-text-secondary-default")}
          >
            {label}
          </label>
        )}
        {description != null && (
          <p id={`${switchId}-description`} className="type-body-small text-static-text-subtle">
            {description}
          </p>
        )}
      </div>
    );
    return (
      <div className="inline-flex items-start gap-gap-7">
        {labelPosition === "left" ? <>{text}{control}</> : <>{control}{text}</>}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };

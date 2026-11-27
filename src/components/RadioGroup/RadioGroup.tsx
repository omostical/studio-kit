"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { FieldGroupShell } from "../_shared/field";
import { RadioDefaultsContext } from "../RadioButton/RadioButton";

/**
 * RadioGroup — Figma: StudioKIT 2.0 › Radio Group (1584:59135) inside Form Field (557:51656).
 * Description: docs/figma-descriptions/radio-group.md
 *
 * Figma property → prop:  Orientation (Vertical / Horizontal) → orientation. Children are `RadioButton`s.
 * Spacing: vertical Gap/7 (12), horizontal Gap/11 (20); horizontal rows wrap at narrow widths.
 * Group label, Optional marker, helper text and error come from the shared Form Field pieces (`_shared/field.tsx`).
 * Built on Radix Radio Group: `role="radiogroup"` named by the label, arrow keys move and select, Tab leaves the group.
 */
export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "orientation" | "dir"> {
  /** Visible group label (the question). Without one, pass aria-label. */
  label?: React.ReactNode;
  /** Show the "Optional" marker. Mark optional groups, not required ones. */
  optional?: boolean;
  /** Text of the optional marker (default "Optional"). */
  optionalLabel?: string;
  /** Hint under the options. Replaced by `error` when that is set. */
  helperText?: React.ReactNode;
  /** Error message under the options; also turns every option Danger. Say how to fix it ("Choose a billing period."). */
  error?: React.ReactNode;
  /** Figma Orientation: `vertical` (default) or `horizontal`. */
  orientation?: "vertical" | "horizontal";
  /** Figma Size of every option: `large` (default) or `small`. */
  size?: "small" | "large";
  /** Class for the outer Form Field wrapper. `className` styles the row/column of options. */
  wrapperClassName?: string;
}

/** A labelled set of Radio Buttons where exactly one can be chosen (Figma Radio Group). Use Select for more than about 5 options. */
const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  (
    { className, wrapperClassName, label, optional, optionalLabel, helperText, error, orientation = "vertical", size, disabled, id, children, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const groupId = id ?? generatedId;
    const defaults = React.useMemo(() => ({ size, variant: error != null ? ("danger" as const) : undefined }), [size, error]);
    return (
      <FieldGroupShell
        as="div"
        id={groupId}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
        helperText={helperText}
        error={error}
        disabled={disabled}
        className={wrapperClassName}
      >
        {({ labelId, messageId }) => (
          <RadioGroupPrimitive.Root
            ref={ref}
            id={groupId}
            orientation={orientation}
            disabled={disabled}
            aria-labelledby={label != null ? labelId : undefined}
            aria-describedby={messageId}
            aria-invalid={error != null ? true : undefined}
            className={cn("flex", orientation === "vertical" ? "flex-col gap-gap-7" : "flex-row flex-wrap gap-x-gap-11 gap-y-gap-7", className)}
            {...props}
          >
            <RadioDefaultsContext.Provider value={defaults}>{children}</RadioDefaultsContext.Provider>
          </RadioGroupPrimitive.Root>
        )}
      </FieldGroupShell>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };

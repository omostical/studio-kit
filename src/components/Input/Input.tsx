import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

const inputWrapperVariants = cva(
  "flex w-full items-center rounded-lg border bg-white text-text-primary transition-colors focus-within:ring-2 focus-within:ring-border-brand-subtle focus-within:border-border-brand has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-surface-disabled has-[:disabled]:border-border-disabled has-[:disabled]:text-text-disabled",
  {
    variants: {
      size: {
        sm: "h-8 px-3 gap-2 text-xs",
        md: "h-10 px-3 gap-2 text-sm",
        lg: "h-12 px-4 gap-2 text-base",
      },
      state: {
        default: "border-border hover:border-border-strong hover:bg-surface-secondary",
        error: "border-border-danger focus-within:border-border-danger focus-within:ring-border-danger-subtle",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputWrapperVariants> {
  label?: string;
  optional?: boolean;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hintIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state,
      label,
      optional = false,
      optionalLabel = "Optional",
      hint,
      error,
      prefix,
      suffix,
      hintIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const resolvedState = error ? "error" : state;
    const message = error ?? hint;
    const showHint = Boolean(message);

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <div className="flex items-center gap-2">
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-medium",
                disabled ? "text-text-disabled" : "text-text-primary"
              )}
            >
              {label}
            </label>
            {optional && (
              <span className="text-xs text-text-subtle">{optionalLabel}</span>
            )}
          </div>
        )}
        <div
          className={cn(
            inputWrapperVariants({ size, state: resolvedState }),
            className
          )}
        >
          {prefix && (
            <span className="flex shrink-0 items-center text-text-tertiary [&_svg]:size-4">
              {prefix}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-text-subtle disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled"
            {...props}
          />
          {suffix && (
            <span className="flex shrink-0 items-center text-text-tertiary [&_svg]:size-4">
              {suffix}
            </span>
          )}
        </div>
        {showHint && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              error
                ? "text-text-danger"
                : disabled
                ? "text-text-disabled"
                : "text-text-tertiary"
            )}
          >
            <span className="flex shrink-0 items-center [&_svg]:size-4">
              {hintIcon ?? <Ban />}
            </span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputWrapperVariants };

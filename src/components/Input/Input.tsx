import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white text-neutral-900 text-sm transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 focus-visible:border-indigo-500 focus-visible:ring-indigo-200",
        error:
          "border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-200",
        success:
          "border-green-400 focus-visible:border-green-500 focus-visible:ring-green-200",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-xs",
        md: "h-9 px-3 py-2 text-sm",
        lg: "h-10 px-4 py-2.5 text-sm",
        xl: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      hint,
      error,
      iconLeft,
      iconRight,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const resolvedVariant = error ? "error" : variant;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <span className="absolute left-3 flex items-center text-neutral-400 [&_svg]:size-4">
              {iconLeft}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              inputVariants({ variant: resolvedVariant, size, className }),
              iconLeft && "pl-9",
              iconRight && "pr-9"
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 flex items-center text-neutral-400 [&_svg]:size-4">
              {iconRight}
            </span>
          )}
        </div>
        {(hint || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-rose-600" : "text-neutral-500"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };

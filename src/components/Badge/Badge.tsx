import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-text-secondary",
        brand: "bg-fill-brand-subtle text-text-brand",
        success: "bg-fill-success-subtle text-text-success",
        warning: "bg-fill-warning-subtle text-text-warning",
        danger: "bg-fill-error-subtle text-text-error",
        outline: "border border-border-strong text-text-secondary bg-transparent",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    const dotColors: Record<string, string> = {
      default: "bg-icon-tertiary",
      brand: "bg-icon-brand",
      success: "bg-icon-success",
      warning: "bg-icon-warning",
      danger: "bg-icon-error",
      outline: "bg-icon-tertiary",
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "size-1.5 rounded-full",
              dotColors[variant ?? "default"]
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };

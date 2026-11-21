import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { controlColors, controlFocus, type ControlAppearance, type ControlVariant } from "../_shared/controlColors";

/**
 * IconButton — Figma: StudioKIT 2.0 › Icon Button (557:13737). Description: docs/figma-descriptions/icon-button.md
 *
 * Same Variant × Style × Size model and colours as Button, square: width = height = Components/Forms/<Size>.
 * Icons are 16px (xsmall, small) and 20px (medium, large).
 */
const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition-[background-color,border-color,color,box-shadow] duration-150 focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      size: {
        xsmall: "size-forms-xsmall rounded-control-md [&_svg]:size-size-9",
        small: "size-forms-small rounded-control-lg [&_svg]:size-size-9",
        medium: "size-forms-medium rounded-control-lg [&_svg]:size-size-11",
        large: "size-forms-large rounded-control-xl [&_svg]:size-size-11",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Figma Variant — intent. */
  variant?: ControlVariant;
  /** Figma Style — filled · border · ghost. Toolbars usually use secondary + ghost. */
  appearance?: ControlAppearance;
  /** The icon (Figma "Icon" swap). */
  icon: React.ReactNode;
  /** Required: names the action for screen readers ("Close dialog"). */
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "secondary", appearance = "ghost", size, icon, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(iconButtonVariants({ size }), controlColors[variant][appearance], controlFocus[variant], className)}
      {...props}
    >
      {icon}
    </button>
  )
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };

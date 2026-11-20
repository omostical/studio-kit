import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-5xl font-bold tracking-tight text-text-primary leading-tight",
      h2: "text-4xl font-bold tracking-tight text-text-primary leading-tight",
      h3: "text-3xl font-semibold tracking-tight text-text-primary leading-snug",
      h4: "text-2xl font-semibold text-text-primary leading-snug",
      h5: "text-xl font-semibold text-text-primary",
      h6: "text-lg font-semibold text-text-primary",
      lead: "text-xl text-text-secondary leading-relaxed",
      body: "text-base text-text-secondary leading-relaxed",
      small: "text-sm text-text-secondary leading-relaxed",
      xs: "text-xs text-text-tertiary",
      label: "text-sm font-medium text-text-secondary",
      code: "font-mono text-sm bg-surface-muted text-text-primary rounded px-1.5 py-0.5",
      muted: "text-sm text-text-subtle",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLElement;

export interface TypographyProps
  extends React.HTMLAttributes<TextElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const variantTagMap: Record<string, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  small: "p",
  xs: "span",
  label: "span",
  code: "code",
  muted: "p",
};

const Typography = React.forwardRef<TextElement, TypographyProps>(
  ({ className, variant = "body", align, as, children, ...props }, ref) => {
    const Tag = as ?? variantTagMap[variant ?? "body"] ?? "p";

    return (
      <Tag
        ref={ref}
        className={cn(textVariants({ variant, align, className }))}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = "Typography";

export { Typography, textVariants };

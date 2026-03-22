import * as React from "react";
import { cn } from "@/lib/utils";

export type TagType = "Primary" | "Danger" | "Success" | "Warning" | "Subtle";
export type TagStyle = "Solid" | "Outline";
export type TagSize = "lg" | "md" | "sm";
export type TagShape = "Pill" | "Default";

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "style"> {
  type?: TagType;
  style?: TagStyle;
  size?: TagSize;
  shape?: TagShape;
  children: string;
  icon?: React.ReactNode;
}

function buildClassName(
  type: TagType,
  style: TagStyle,
  size: TagSize,
  shape: TagShape,
  className?: string
) {
  return cn(
    "tag",
    `tag--${type.toLowerCase()}`,
    `tag--${style.toLowerCase()}`,
    `tag--${size}`,
    `tag--${shape.toLowerCase()}`,
    className
  );
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      type = "Primary",
      style = "Solid",
      size = "md",
      shape = "Pill",
      children,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={buildClassName(type, style, size, shape, className)}
        {...props}
      >
        {icon ? (
          <span className="tag__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="tag__label">{children}</span>
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };

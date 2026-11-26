"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Avatar — Figma: StudioKIT 2.0 › Avatar (7807:149649). Description: docs/figma-descriptions/avatar.md
 *
 * A picture, initials or icon that represents a person or organisation.
 * Figma property → prop:  Variant → variant · Type → type · Size → size · Selected → selected ·
 * Status (show/hide) → status · Initials (text) → initials.
 * Sizes: xsmall 20 · small 24 · medium 32 · large 40 · xlarge 48 · xxlarge 80 (Size/11…22).
 * Rounded: Corner Radius/Control/full. Square: Control/sm (xsmall), md (small), lg (medium and up).
 * Initials: Non-Semantic/Fill/Brand/Subtle + Non-Semantic/Text/Brand/OnSubtle. Icon: Static/Fill/Alpha/Base +
 * Static/Text/Base. Selected: the Focus/Base effect. Status dot: Semantic/Fill/Inverse/Positive, ringed in
 * Static/Fill/Overlay. The Figma `Orb` variant is not in code yet (GAPS.md).
 */
export type AvatarVariant = "image" | "initials" | "icon";
export type AvatarType = "rounded" | "square";
export type AvatarSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center select-none [&>svg]:shrink-0",
  {
    variants: {
      size: {
        xsmall: "size-size-11 type-caption-strong-small [&>svg]:size-size-7",
        small: "size-size-12 type-caption-strong-medium [&>svg]:size-size-8",
        medium: "size-size-14 type-label-strong-small [&>svg]:size-size-9",
        large: "size-size-16 type-label-strong-medium [&>svg]:size-size-11",
        xlarge: "size-size-18 type-label-strong-large [&>svg]:size-size-12",
        xxlarge: "size-size-22 type-subtitle-large [&>svg]:size-size-16",
      },
      type: { rounded: "", square: "" },
      variant: {
        image: "bg-static-fill-alpha-base",
        initials: "bg-non-semantic-fill-brand-subtle text-non-semantic-text-brand-onsubtle",
        icon: "bg-static-fill-alpha-base text-static-text-base",
      },
      selected: { true: "shadow-focus-base", false: "" },
    },
    defaultVariants: { size: "medium", type: "rounded", variant: "icon", selected: false },
  }
);

/** The avatar's corner radius; the photo repeats it so it clips to the same shape. */
function radius(type: AvatarType, size: AvatarSize) {
  if (type === "rounded") return "rounded-control-full";
  return size === "xsmall" ? "rounded-control-sm" : size === "small" ? "rounded-control-md" : "rounded-control-lg";
}

// Outer box = dot + ring on both sides (Figma dot sizes: 6 · 6 · 8 · 10 · 12 · 16px, Size/4…9).
const statusDot: Record<AvatarSize, string> = {
  xsmall: "size-size-5 border",
  small: "size-size-5 border",
  medium: "size-size-6 border",
  large: "size-size-7 border",
  xlarge: "size-size-9 border-2",
  xxlarge: "size-size-11 border-2 bottom-gap-2 right-gap-2",
};

/** First letter of the first and last word: "Ada Lovelace" → "AL", "ada" → "A". */
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * What the avatar shows (Figma "Variant"). Leave it out to pick automatically: the photo when `src` is set
   * (falling back if it fails to load), initials when `name` or `initials` is set, the icon otherwise.
   */
  variant?: AvatarVariant;
  /** Figma "Type": `rounded` (circle) for people, `square` for organisations, teams and workspaces. */
  type?: AvatarType;
  /** Figma "Size": xsmall 20 · small 24 · medium 32 (default) · large 40 · xlarge 48 · xxlarge 80. */
  size?: AvatarSize;
  /** Figma "Selected": draws the selection ring (the Focus/Base effect). */
  selected?: boolean;
  /** Photo URL. */
  src?: string;
  /** The person's or organisation's name. Used for the initials and as the accessible name. */
  name?: string;
  /** Figma "Initials": overrides the initials taken from `name` (one or two characters). */
  initials?: string;
  /**
   * Accessible name. Defaults to `name`. Pass `alt=""` when the name is shown next to the avatar: it is then
   * decorative and hidden from screen readers.
   */
  alt?: string;
  /** Figma "Status": shows the presence dot. The dot is never the only signal: `statusLabel` is read out too. */
  status?: boolean;
  /** Text for the presence dot, read by screen readers (default "Online"). Also show it in text or a tooltip. */
  statusLabel?: string;
  /** Icon for the `icon` variant. Defaults to a person (rounded) or a building (square). */
  icon?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      variant,
      type = "rounded",
      size = "medium",
      selected = false,
      src,
      name,
      initials,
      alt,
      status = false,
      statusLabel = "Online",
      icon,
      ...props
    },
    ref
  ) => {
    const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
    const text = (initials ?? (name ? initialsOf(name) : "")).slice(0, 2);
    const imageOk = Boolean(src) && failedSrc !== src;
    const shown: AvatarVariant =
      variant === "image" && !imageOk
        ? text
          ? "initials"
          : "icon"
        : variant ?? (imageOk ? "image" : text ? "initials" : "icon");

    const label = alt ?? name;
    const decorative = alt === "" || !label;

    return (
      <span
        ref={ref}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : status ? `${label}, ${statusLabel}` : label}
        aria-hidden={decorative && !status ? true : undefined}
        className={cn(avatarVariants({ size, type, variant: shown, selected }), radius(type, size), className)}
        {...props}
      >
        {shown === "image" && (
          // eslint-disable-next-line @next/next/no-img-element -- avatars are small external photos; next/image needs configured domains
          <img
            src={src}
            alt=""
            onError={() => setFailedSrc(src ?? null)}
            className={cn("size-full object-cover", radius(type, size))}
          />
        )}
        {shown === "initials" && <span aria-hidden="true">{text}</span>}
        {shown === "icon" && (icon ?? (type === "square" ? <Building2 aria-hidden="true" /> : <User aria-hidden="true" />))}
        {status && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "absolute bottom-0 right-0 rounded-control-full border-static-fill-overlay bg-semantic-fill-inverse-positive",
                statusDot[size]
              )}
            />
            {decorative && <span className="sr-only">{statusLabel}</span>}
          </>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };

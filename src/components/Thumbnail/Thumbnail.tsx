"use client";

import * as React from "react";
import { BarChart3, FileSpreadsheet, FileText, FileType, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail — Figma: StudioKIT 2.0 › Thumbnail (938:36926). Description: docs/figma-descriptions/thumbnail.md
 *
 * A small preview of a file or media item. Figma property → prop:  Type → type · Size (16·20·24·32·40px) → size
 * (xsmall · small · medium · large · xlarge) · Swap Icon → icon.
 * Radius (the answer to "which radius frames an image thumbnail"): Corner Radius/Control/sm at 16px,
 * Control/md at 20 and 24px, Control/lg at 32 and 40px — the same steps as a square Avatar.
 * File types: Non-Semantic/Fill/<Colour>/Strong with the icon in Non-Semantic/Text/<Colour>/OnStrong — icon and
 * text purple, PDF red, spreadsheet green, document cyan, video indigo, picture yellow. (Figma binds every icon to
 * Purple/OnStrong; code uses each colour's own OnStrong.) Logo: Static/Fill/Highlight/Base, 1px Static/Stroke/Subtle.
 * Icons 12 · 12 · 16 · 20 · 24px. Text letter: Caption/Strong/Small up to 24px, Caption/Strong/Medium at 32,
 * Label/Strong/Small at 40.
 */
export type ThumbnailType = "image" | "icon" | "logo" | "text" | "pdf" | "spreadsheet" | "document" | "video" | "picture";
export type ThumbnailSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

const sizeClass: Record<ThumbnailSize, string> = {
  xsmall: "size-size-9 rounded-control-sm [&>svg]:size-size-7 type-caption-strong-small",
  small: "size-size-11 rounded-control-md [&>svg]:size-size-7 type-caption-strong-small",
  medium: "size-size-12 rounded-control-md [&>svg]:size-size-9 type-caption-strong-small",
  large: "size-size-14 rounded-control-lg [&>svg]:size-size-11 type-caption-strong-medium",
  xlarge: "size-size-16 rounded-control-lg [&>svg]:size-size-12 type-label-strong-small",
};

const imgRadius: Record<ThumbnailSize, string> = {
  xsmall: "rounded-control-sm",
  small: "rounded-control-md",
  medium: "rounded-control-md",
  large: "rounded-control-lg",
  xlarge: "rounded-control-lg",
};

const typeClass: Record<Exclude<ThumbnailType, "image">, string> = {
  icon: "bg-non-semantic-fill-purple-strong text-non-semantic-text-purple-onstrong",
  text: "bg-non-semantic-fill-purple-strong text-non-semantic-text-purple-onstrong",
  pdf: "bg-non-semantic-fill-red-strong text-non-semantic-text-red-onstrong",
  spreadsheet: "bg-non-semantic-fill-green-strong text-non-semantic-text-green-onstrong",
  document: "bg-non-semantic-fill-cyan-strong text-non-semantic-text-cyan-onstrong",
  video: "bg-non-semantic-fill-indigo-strong text-non-semantic-text-indigo-onstrong",
  picture: "bg-non-semantic-fill-yellow-strong text-non-semantic-text-yellow-onstrong",
  logo: "border border-static-stroke-subtle bg-static-fill-highlight-base",
};

const typeIcon: Partial<Record<ThumbnailType, React.ReactNode>> = {
  icon: <BarChart3 aria-hidden="true" />,
  pdf: <FileType aria-hidden="true" />,
  spreadsheet: <FileSpreadsheet aria-hidden="true" />,
  document: <FileText aria-hidden="true" />,
  video: <Video aria-hidden="true" />,
  picture: <ImageIcon aria-hidden="true" />,
};

export interface ThumbnailProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Figma "Type". `image` shows `src`; the file types (`pdf`, `spreadsheet`, `document`, `video`, `picture`) show
   * their icon on their colour; `icon` shows `icon`; `logo` shows `icon` (a brand mark) on a light tile; `text`
   * shows `text`. Defaults to `image` when `src` is set, otherwise `document`.
   */
  type?: ThumbnailType;
  /** Figma "Size": xsmall 16 · small 20 · medium 24 · large 32 (default) · xlarge 40px. */
  size?: ThumbnailSize;
  /** Image URL for `type="image"`. Use the real preview when there is one. */
  src?: string;
  /** Figma "Swap Icon": the icon for `icon` and `logo`, or to override a file type's icon. */
  icon?: React.ReactNode;
  /** One or two characters for `type="text"` (e.g. "W"). */
  text?: string;
  /**
   * Accessible name ("report.pdf, PDF"). Leave it out when the file name is shown next to the thumbnail: it is
   * then decorative and hidden from screen readers.
   */
  alt?: string;
}

/** A small preview of a file or media item by type (Figma Thumbnail). Decorative when the file name is shown next to it. */
const Thumbnail = React.forwardRef<HTMLSpanElement, ThumbnailProps>(
  ({ className, type, size = "large", src, icon, text, alt, ...props }, ref) => {
    const [failed, setFailed] = React.useState<string | null>(null);
    const wanted: ThumbnailType = type ?? (src ? "image" : "document");
    const shown: ThumbnailType = wanted === "image" && (!src || failed === src) ? "picture" : wanted;
    const a11y = alt ? { role: "img" as const, "aria-label": alt } : { "aria-hidden": true as const };
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex shrink-0 select-none items-center justify-center overflow-hidden [&>svg]:shrink-0",
          sizeClass[size],
          shown === "image" ? "bg-static-fill-alpha-base" : typeClass[shown],
          className
        )}
        {...a11y}
        {...props}
      >
        {shown === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element -- small previews from any source; next/image needs configured domains
          <img src={src} alt="" onError={() => setFailed(src ?? null)} className={cn("size-full object-cover", imgRadius[size])} />
        ) : shown === "text" ? (
          <span aria-hidden="true">{(text ?? "").slice(0, 2)}</span>
        ) : (
          icon ?? typeIcon[shown] ?? typeIcon.document
        )}
      </span>
    );
  }
);
Thumbnail.displayName = "Thumbnail";

export { Thumbnail };

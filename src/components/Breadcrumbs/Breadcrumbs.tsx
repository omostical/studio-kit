"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumbs — Figma: StudioKIT 2.0 › Breadcrumbs (9728:22669) and Breadcrumb Item (9728:18794).
 * Description: docs/figma-descriptions/breadcrumbs.md, breadcrumb-item.md
 *
 * Where the current page sits in the site hierarchy. Renders `<nav aria-label="Breadcrumb">` with an ordered list;
 * the last item is the current page (`aria-current="page"`, not a link). Separators are decorative (aria-hidden).
 *
 * Figma property → prop:  Breadcrumbs Separator → `separator` · Level → the number of BreadcrumbItem children ·
 * Breadcrumb Item Current Page → `currentPage` (the last item by default) · Prefix Icon / Swap Icon → `icon` ·
 * Type Icon → an item with `icon` and no label (give it `aria-label`) · Show Separator → automatic (every item but
 * the first) · State → hover / pressed / focus-visible.
 *
 * Item: li with gap Gap/3 and right padding Gap/3. Content: Components/Forms/Small (32) high, padding Gap/5, gap
 * Gap/3, Corner Radius/Control/lg, Dynamic/Fill/Secondary/Alpha/Default → Hover → Pressed, Focus/Base ring. Label
 * Caption/Medium (inset Gap/2) in Static/Text/Subtle; current page Static/Text/Base. Icon 16px (Size/9) in
 * Dynamic/Text/Secondary/Disabled; current page Dynamic/Text/Secondary/Default. Slash separator: "/" in
 * Label/Strong/Small, Static/Stroke/Strong. Arrow separator: 12px chevron (Size/7) in Static/Text/Subtle.
 */
export type BreadcrumbsSeparator = "arrow" | "slash";

interface ItemContextValue {
  separator: BreadcrumbsSeparator;
  showSeparator: boolean;
  isLast: boolean;
}
const ItemContext = React.createContext<ItemContextValue>({ separator: "arrow", showSeparator: false, isLast: false });

function Separator({ separator }: { separator: BreadcrumbsSeparator }) {
  return separator === "slash" ? (
    <span aria-hidden="true" className="type-label-strong-small text-static-stroke-strong">
      /
    </span>
  ) : (
    <ChevronRight aria-hidden="true" className="size-size-7 shrink-0 text-static-text-subtle" />
  );
}

const content =
  "inline-flex h-forms-small min-w-0 items-center gap-gap-3 rounded-control-lg px-gap-5 outline-none transition-[background-color,box-shadow] duration-150 [&_svg]:size-size-9 [&_svg]:shrink-0";

export interface BreadcrumbItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Where the link goes. Leave it out on the current page. */
  href?: string;
  /** Figma "Prefix Icon" (Swap Icon): a 16px icon before the label, usually only on the first (root) item. */
  icon?: React.ReactNode;
  /**
   * Figma "Current Page": the page people are on. Not a link; gets `aria-current="page"`. Defaults to `true` on the
   * last item of Breadcrumbs, so you rarely set it.
   */
  currentPage?: boolean;
  /** Render your own link element (e.g. Next.js `Link`) as the item, with the item styles: pass the link, with the label inside, as the only child. */
  asChild?: boolean;
  /** The page title, the same words as the heading of the page it links to. Leave it out for Figma Type "Icon" and set `aria-label`. */
  children?: React.ReactNode;
}

/** One level of Breadcrumbs (Figma Breadcrumb Item). Use it only inside Breadcrumbs. */
const BreadcrumbItem = React.forwardRef<HTMLElement, BreadcrumbItemProps>(
  ({ href, icon, currentPage, asChild = false, className, children, ...props }, ref) => {
    const ctx = React.useContext(ItemContext);
    const current = currentPage ?? ctx.isLast;
    const inner = (
      <>
        {icon && (
          <span
            aria-hidden="true"
            className={cn("flex", current ? "text-dynamic-text-secondary-default" : "text-dynamic-text-secondary-disabled")}
          >
            {icon}
          </span>
        )}
        {children != null && <span className="truncate px-gap-2 type-caption-medium">{children}</span>}
      </>
    );

    let node: React.ReactNode;
    if (current) {
      node = (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-current="page"
          className={cn(content, "text-static-text-base", className)}
          {...props}
        >
          {inner}
        </span>
      );
    } else {
      const linkClasses = cn(
        content,
        "text-static-text-subtle bg-dynamic-fill-secondary-alpha-default hover:bg-dynamic-fill-secondary-alpha-hover active:bg-dynamic-fill-secondary-alpha-pressed focus-visible:shadow-focus-base",
        className
      );
      node = asChild ? (
        <Slot ref={ref} className={linkClasses} {...props}>
          {icon && (
            <span aria-hidden="true" className="flex text-dynamic-text-secondary-disabled">
              {icon}
            </span>
          )}
          <Slottable>{children}</Slottable>
        </Slot>
      ) : (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={linkClasses} {...props}>
          {inner}
        </a>
      );
    }

    return (
      <li className="flex min-w-0 items-center gap-gap-3 pr-gap-3">
        {ctx.showSeparator && <Separator separator={ctx.separator} />}
        {node}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Figma "Separator": `arrow` (chevron, default) or `slash`. */
  separator?: BreadcrumbsSeparator;
  /**
   * Show at most this many levels. Longer trails keep the first and the last `maxItems - 1` levels and collapse the
   * middle into a "…" button that shows them all. Default 4 (Figma's deepest Level). Must be 2 or more.
   */
  maxItems?: number;
  /** Accessible name of the navigation landmark. Default "Breadcrumb". */
  "aria-label"?: string;
  /** BreadcrumbItem elements, from the top level down to the current page. */
  children?: React.ReactNode;
}

/** The trail of links from the top level to the current page (Figma Breadcrumbs). Use on pages two or more levels deep. */
const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ separator = "arrow", maxItems = 4, className, children, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(false);
    const items = React.Children.toArray(children).filter(React.isValidElement);
    const max = Math.max(2, maxItems);
    const collapse = !expanded && items.length > max;
    const hiddenCount = collapse ? items.length - max : 0;
    const shown = collapse ? [items[0], null, ...items.slice(items.length - (max - 1))] : items;

    return (
      <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
        <ol className="flex flex-wrap items-center">
          {shown.map((item, i) => {
            const value = { separator, showSeparator: i > 0, isLast: i === shown.length - 1 };
            if (item === null) {
              return (
                <li key="collapsed" className="flex items-center gap-gap-3 pr-gap-3">
                  <Separator separator={separator} />
                  <button
                    type="button"
                    aria-label={`Show ${hiddenCount} more ${hiddenCount === 1 ? "level" : "levels"}`}
                    onClick={() => setExpanded(true)}
                    className={cn(
                      content,
                      "type-caption-medium text-static-text-subtle bg-dynamic-fill-secondary-alpha-default hover:bg-dynamic-fill-secondary-alpha-hover active:bg-dynamic-fill-secondary-alpha-pressed focus-visible:shadow-focus-base"
                    )}
                  >
                    …
                  </button>
                </li>
              );
            }
            return (
              <ItemContext.Provider key={item.key ?? i} value={value}>
                {item}
              </ItemContext.Provider>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs, BreadcrumbItem };

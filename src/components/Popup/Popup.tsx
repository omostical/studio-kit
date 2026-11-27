"use client";
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "../IconButton/IconButton";

/**
 * Popup — Figma: StudioKIT 2.0 › Pop-up (10852:61592). Description: docs/figma-descriptions/pop-up.md
 *
 * A small floating panel anchored to a trigger, for extra details or a quick action that doesn't need a Modal
 * (a new-shift form, a cookie notice). Non-modal, built on Radix Popover: the trigger gets aria-expanded and
 * aria-controls, focus moves into the panel on open and back to the trigger on close, Escape and a click outside
 * close it. The header title is wired to the panel's aria-labelledby.
 *
 * Figma property → prop:  Type (Action / Information) → PopupContent `type` · Header → render a PopupHeader or
 * not · Close Button → PopupHeader `closeButton` · Footer → render a PopupFooter or not.
 * Panel: Static/Fill/Overlay, Corner Radius/Container/lg, Elevation/High, width 492 (no container-width token,
 * recorded exception). Header: padding Gap/9 × Gap/11, gap Gap/5, title Subtitle/Small in Static/Text/Strong,
 * Secondary Border Small close button; Information adds a bottom divider Static/Stroke/Base. Body: Action
 * Gap/5 top + Gap/11 sides and bottom; Information Gap/11 all round, Body/Medium in Static/Text/Subtle.
 * Footer: padding Gap/9 × Gap/11, Static/Fill/Alpha/Subtle, top divider Static/Stroke/Base, a start slot
 * (Switch, help link) and the actions on the end, gap Gap/5.
 *
 *   <Popup>
 *     <PopupTrigger asChild><Button>New shift</Button></PopupTrigger>
 *     <PopupContent type="action">
 *       <PopupHeader title="New shift" />
 *       <PopupBody>…fields…</PopupBody>
 *       <PopupFooter><PopupClose asChild><Button variant="secondary" appearance="border" size="small">Cancel</Button></PopupClose><Button size="small">Create</Button></PopupFooter>
 *     </PopupContent>
 *   </Popup>
 */
const Popup = PopoverPrimitive.Root;
const PopupTrigger = PopoverPrimitive.Trigger;
const PopupAnchor = PopoverPrimitive.Anchor;
const PopupClose = PopoverPrimitive.Close;

export type PopupType = "action" | "information";

const PopupContext = React.createContext<{ type: PopupType; titleId: string }>({ type: "action", titleId: "" });

export interface PopupContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Figma Type: `action` (a short form or choice, default) or `information` (a message, header divider, text body). */
  type?: PopupType;
}

/** The floating panel (Figma Pop-up), anchored to its PopupTrigger. Non-modal: Escape or a click outside closes it. */
const PopupContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopupContentProps>(
  ({ className, type = "action", sideOffset = 8, collisionPadding = 8, align = "start", children, ...props }, ref) => {
    const titleId = React.useId();
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          align={align}
          aria-labelledby={titleId}
          className={cn(
            // token-lint-ignore: Figma Pop-up width 492 (no container-width token), capped to the screen minus 8px each side
            "z-50 flex w-[492px] max-w-[calc(100vw-16px)] flex-col overflow-hidden",
            "rounded-container-lg bg-static-fill-overlay text-static-text-strong shadow-elevation-high outline-none",
            className
          )}
          {...props}
        >
          <PopupContext.Provider value={{ type, titleId }}>{children}</PopupContext.Provider>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
PopupContent.displayName = "PopupContent";

export interface PopupHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The pop-up title (Subtitle/Small). Names the panel for screen readers. */
  title: React.ReactNode;
  /** Show the close button (Figma "Close Button", default true). */
  closeButton?: boolean;
  /** Accessible name of the close button (default "Close"). */
  closeLabel?: string;
}

/** Title row of a Pop-up (Figma Header). */
const PopupHeader = ({ className, title, closeButton = true, closeLabel = "Close", ...props }: PopupHeaderProps) => {
  const { type, titleId } = React.useContext(PopupContext);
  return (
    <div
      className={cn(
        "flex items-center gap-gap-5 px-gap-11 py-gap-9",
        type === "information" && "border-b border-static-stroke-base",
        className
      )}
      {...props}
    >
      <p id={titleId} className="m-0 min-w-0 flex-1 type-subtitle-small text-static-text-strong">
        {title}
      </p>
      {closeButton && (
        <PopoverPrimitive.Close asChild>
          <IconButton size="small" variant="secondary" appearance="border" icon={<X />} aria-label={closeLabel} />
        </PopoverPrimitive.Close>
      )}
    </div>
  );
};

/** Content of a Pop-up: fields for the action type, a short message for the information type. */
const PopupBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { type } = React.useContext(PopupContext);
  return (
    <div
      className={cn(
        "flex flex-col gap-gap-9",
        type === "action" ? "px-gap-11 pb-gap-11 pt-gap-5 text-static-text-base" : "p-gap-11 text-static-text-subtle",
        "type-body-medium",
        className
      )}
      {...props}
    />
  );
};

export interface PopupFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional content on the start side, e.g. a Switch ("Repeat weekly") or a help link. */
  start?: React.ReactNode;
}

/** Action row of a Pop-up (Figma Footer): optional start content, actions (children) on the end. */
const PopupFooter = ({ className, start, children, ...props }: PopupFooterProps) => (
  <div
    className={cn(
      "flex flex-wrap items-center gap-gap-5 border-t border-static-stroke-base bg-static-fill-alpha-subtle px-gap-11 py-gap-9",
      className
    )}
    {...props}
  >
    {start != null && <div className="flex min-w-0 items-center gap-gap-5">{start}</div>}
    <div className="ml-auto flex items-center gap-gap-5">{children}</div>
  </div>
);

export { Popup, PopupTrigger, PopupAnchor, PopupClose, PopupContent, PopupHeader, PopupBody, PopupFooter };

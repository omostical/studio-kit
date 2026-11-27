"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "../IconButton/IconButton";

/**
 * SidePanel — Figma: StudioKIT 2.0 › Side Panel (557:76753) with Assets / Side Panel Header.
 * Description: docs/figma-descriptions/side-panel.md
 *
 * A drawer that slides in from the right for item details, filters or secondary editing. Built on Radix Dialog,
 * like Modal: it is modal (focus moves in and is trapped, Escape and the close button close it, focus returns to
 * the trigger, the title is wired to aria-labelledby).
 *
 * Figma property → prop:  Size → SidePanelContent `size` · Type (Details / Form / Task) → SidePanelBody `type` ·
 * Footer → render a SidePanelFooter or not.
 * Scrim Static/Scrim/Base with an 8px inset (Space/200 → gap-5); panel Static/Fill/Container,
 * Corner Radius/Container/lg, Elevation/High; widths Small 560 / Medium 704 / Large 960 (no container-width token,
 * recorded exception).
 * Header: padding Space/600 (gap-12), avatar → text gap Gap/9, title Subtitle/Medium in Static/Text/Strong,
 * description Body/Large in Static/Text/Subtle, header actions Secondary Border Small icon buttons, bottom divider
 * Static/Stroke/Base. Body: padding Space/600, gap Gap/7; Details Static/Fill/Alpha/Subtle, Form Static/Fill/Container,
 * Task Static/Fill/Foreground. Footer (Form): padding Space/600, Static/Fill/Container, top divider Static/Stroke/Base,
 * buttons gap Gap/5, start-aligned as in Figma.
 * Not in code yet (GAPS.md): the Details keyboard-hint footer ("Navigate", "Return to parent") and the Task header
 * action bar.
 *
 *   <SidePanel>
 *     <SidePanelTrigger asChild><Button>View details</Button></SidePanelTrigger>
 *     <SidePanelContent size="small">
 *       <SidePanelHeader title="Adam Smith" description="adam.smith@example.com" />
 *       <SidePanelBody type="details">…</SidePanelBody>
 *     </SidePanelContent>
 *   </SidePanel>
 */
const SidePanel = DialogPrimitive.Root;
const SidePanelTrigger = DialogPrimitive.Trigger;
const SidePanelClose = DialogPrimitive.Close;

// token-lint-ignore: Figma Side Panel widths Small 560 / Medium 704 / Large 960; no container-width token exists
const widths = { small: "max-w-[560px]", medium: "max-w-[704px]", large: "max-w-[960px]" } as const;

export type SidePanelSize = keyof typeof widths;

export interface SidePanelContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Figma Size: small (560, default) · medium (704) · large (960). Narrower screens get the full width minus 8px each side. */
  size?: SidePanelSize;
}

/** The panel itself (Figma Side Panel): opens over a scrim on the right; focus is trapped, Escape closes, focus returns to the trigger. Wrap in <SidePanel> with a <SidePanelTrigger>. */
const SidePanelContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, SidePanelContentProps>(
  ({ className, size = "small", children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-static-scrim-base" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // token-lint-ignore: viewport-relative width, the panel keeps the 8px Figma inset on each side of small screens
          "fixed bottom-gap-5 right-gap-5 top-gap-5 z-50 flex w-[calc(100%-16px)] flex-col overflow-hidden",
          "rounded-container-lg bg-static-fill-container text-static-text-strong shadow-elevation-high focus:outline-none",
          widths[size],
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
SidePanelContent.displayName = "SidePanelContent";

export interface SidePanelHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The panel title (Subtitle/Medium). Wired to the dialog's aria-labelledby. */
  title: React.ReactNode;
  /** Supporting line under the title (Body/Large), e.g. an email or "Step 1 of 4". Wired to aria-describedby. */
  description?: React.ReactNode;
  /** Optional leading visual, e.g. an `<Avatar size="xlarge" alt="" />` in the Details type. */
  avatar?: React.ReactNode;
  /** Extra header icon buttons shown before the close button, e.g. a DropdownMenu behind a "More" IconButton. */
  actions?: React.ReactNode;
  /** Optional TabsList (wrap the SidePanelContent's children in <Tabs>); sits flush on the header's bottom divider. */
  tabs?: React.ReactNode;
  /** Show the close button (default true). */
  closeButton?: boolean;
  /** Accessible name of the close button (default "Close"). */
  closeLabel?: string;
}

/** Title row of a Side Panel (Figma Assets / Side Panel Header). Children (a button row, a progress bar) render under the title with the same padding. */
const SidePanelHeader = ({
  className,
  title,
  description,
  avatar,
  actions,
  tabs,
  closeButton = true,
  closeLabel = "Close",
  children,
  ...props
}: SidePanelHeaderProps) => (
  <div className={cn("flex shrink-0 flex-col border-b border-static-stroke-base", className)} {...props}>
    <div className="flex items-start gap-gap-9 p-gap-12">
      {avatar != null && <div className="shrink-0">{avatar}</div>}
      <div className="flex min-w-0 flex-1 flex-col gap-gap-3">
        <div className="flex items-start gap-gap-5">
          <DialogPrimitive.Title className="m-0 min-w-0 flex-1 type-subtitle-medium text-static-text-strong">{title}</DialogPrimitive.Title>
          {actions}
          {closeButton && (
            <DialogPrimitive.Close asChild>
              <IconButton size="small" variant="secondary" appearance="border" icon={<X />} aria-label={closeLabel} />
            </DialogPrimitive.Close>
          )}
        </div>
        {description != null && (
          <DialogPrimitive.Description className="m-0 type-body-large text-static-text-subtle">{description}</DialogPrimitive.Description>
        )}
      </div>
    </div>
    {children != null && <div className="flex flex-col gap-gap-5 px-gap-12 pb-gap-12">{children}</div>}
    {tabs != null && <div className="px-gap-12">{tabs}</div>}
  </div>
);

const bodyType = {
  details: "bg-static-fill-alpha-subtle",
  form: "bg-static-fill-container",
  task: "bg-static-fill-foreground",
} as const;

export interface SidePanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma Type: `details` (read-only info in Cards on a subtle background, default) · `form` (fields on the panel colour) · `task` (task content on the foreground colour). */
  type?: keyof typeof bodyType;
}

/** Scrolling content area of a Side Panel. In the details type put each group in a <Card>. */
const SidePanelBody = ({ className, type = "details", ...props }: SidePanelBodyProps) => (
  <div
    className={cn("flex min-h-0 flex-1 flex-col gap-gap-7 overflow-y-auto p-gap-12 type-body-medium text-static-text-base", bodyType[type], className)}
    {...props}
  />
);

/** Action row at the bottom of a Side Panel (Figma Footer, Form type): primary action first, then Cancel. */
const SidePanelFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex shrink-0 flex-wrap items-center gap-gap-5 border-t border-static-stroke-base bg-static-fill-container p-gap-12", className)}
    {...props}
  />
);

export { SidePanel, SidePanelTrigger, SidePanelClose, SidePanelContent, SidePanelHeader, SidePanelBody, SidePanelFooter };

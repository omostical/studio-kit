"use client";
import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "../Input";
import { IconButton } from "../IconButton";

/**
 * Search — Figma: StudioKIT 2.0 › Search (9986:109308). Description: docs/figma-descriptions/search.md
 *
 * Built on Input: Figma Search has the same structure and tokens as Input (Variant, Style, Size, State, Filled,
 * Prefix and Suffix slots), so it reuses Input's field box and only fixes the slots.
 * Figma property → prop:  Variant → variant (or `error`) · Style → appearance · Size → size · Filled → value ·
 * Prefix 1 (search-line icon, Static/Text/Subtle) → always on · Suffix 1 → the clear button (`onClear`) ·
 * Suffix 2 (text) → shortcut hint (`shortcut`).
 * Renders `role="search"` around an `<input type="search">`. The label is visually hidden by default ("Search"),
 * the clear button is labelled "Clear search", and Escape clears the field.
 */
export interface SearchProps extends Omit<InputProps, "prefix" | "suffix" | "label" | "type"> {
  /** Accessible name of the field (default "Search"). Say what's searchable: "Search projects". */
  label?: string;
  /** Hide the label visually (default true); it stays available to screen readers. */
  hideLabel?: boolean;
  /** Called after the field is cleared with the clear button or Escape. The clear button shows while there is text. */
  onClear?: () => void;
  /** Keyboard shortcut hint at the end (Figma Suffix 2), e.g. "⌘K". Only show shortcuts that really work. */
  shortcut?: React.ReactNode;
  /** Class for the `role="search"` landmark wrapper. */
  searchClassName?: string;
}

/** A field for searching content with a search icon, clear button and optional shortcut hint (Figma Search). */
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    { label = "Search", hideLabel = true, onClear, shortcut, value: valueProp, defaultValue, onChange, onKeyDown, className, searchClassName, size = "medium", placeholder, disabled, ...props },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
    const [internal, setInternal] = React.useState(String(defaultValue ?? ""));
    const value = valueProp !== undefined ? String(valueProp) : internal;

    const setValue = (next: string) => {
      if (valueProp === undefined) setInternal(next);
    };
    const clear = () => {
      const input = innerRef.current;
      if (input) {
        // Fire a real input event so controlled parents receive onChange("").
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
        setter?.call(input, "");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }
      setValue("");
      onClear?.();
    };

    const suffix =
      value !== "" && !disabled ? (
        <IconButton size="xsmall" icon={<X />} aria-label="Clear search" onClick={clear} />
      ) : shortcut != null ? (
        <kbd className="type-label-small text-static-text-subtle">{shortcut}</kbd>
      ) : undefined;

    return (
      <div role="search" className={cn("w-full", searchClassName)}>
        <Input
          ref={innerRef}
          type="search"
          size={size}
          label={hideLabel ? undefined : label}
          aria-label={hideLabel ? label : undefined}
          placeholder={placeholder ?? label}
          prefix={<SearchIcon aria-hidden="true" />}
          suffix={suffix}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.key === "Escape" && value !== "" && !e.defaultPrevented) {
              e.preventDefault();
              clear();
            }
          }}
          className={cn("[&_input::-webkit-search-cancel-button]:appearance-none", className)}
          {...props}
        />
      </div>
    );
  }
);
Search.displayName = "Search";

export { Search };

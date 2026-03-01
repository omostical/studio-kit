import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: {
    root: "h-4 w-7",
    thumb: "size-3 data-[state=checked]:translate-x-3",
  },
  md: {
    root: "h-5 w-9",
    thumb: "size-4 data-[state=checked]:translate-x-4",
  },
  lg: {
    root: "h-6 w-11",
    thumb: "size-5 data-[state=checked]:translate-x-5",
  },
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, size = "md", id, ...props }, ref) => {
  const switchId = id ?? React.useId();
  const s = sizeMap[size];

  return (
    <div className="flex items-start gap-3">
      <SwitchPrimitive.Root
        id={switchId}
        ref={ref}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-neutral-200",
          s.root,
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0",
            s.thumb
          )}
        />
      </SwitchPrimitive.Root>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium text-neutral-700 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-neutral-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});

Switch.displayName = "Switch";

export { Switch };

import * as SwitchPrimitive from "@radix-ui/react-switch";
import clsx from "clsx";
import { forwardRef } from "react";

export const Switch = forwardRef<
  HTMLButtonElement,
  SwitchPrimitive.SwitchProps
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={clsx(
        "rounded-full w-10 h-6 transition-colors",
        "bg-bg-subtle-300 data-[state=checked]:bg-primary-base-1000",
        "hover:bg-bg-soft-200 hover:data-[state=checked]:bg-primary-darker-800",
        "active:bg-bg-subtle-300 active:data-[state=checked]:bg-primary-dark-700",
        "disabled:bg-bg-soft-200",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={clsx(
          "block rounded-full pointer-events-none",
          "w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px]",
          "bg-icon-on-accent data-[state=checked]:bg-bg-base",
          "disabled:bg-bg-subtle-300"
        )}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = "Switch";

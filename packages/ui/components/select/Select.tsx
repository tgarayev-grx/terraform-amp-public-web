"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, ReactNode, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

export type SingleSelectOption = { value: string; label: string };

const SingleSelectRoot = SelectPrimitive.Root;

export type SingleSelectTriggerProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  start?: ReactNode;

  hasError?: boolean;
  placeholder?: string;
};

const SingleSelectTrigger = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SingleSelectTriggerProps
>(
  (
    { className, placeholder = "Select…", onBlur, hasError, start, ...props },
    ref
  ) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        onBlur={onBlur}
        className={clsx(
          "p-[11px] rounded-[10px] text-sm",
          "group",

          "flex w-full items-center justify-between gap-2 border border-stroke-base-300 text-left outline-none [&>span]:line-clamp-1 rounded-[10px]",

          "[&>[data-value]]:flex-grow data-[placeholder]:text-text-soft-500 text-text-strong-1000 text-body-md-regular",

          "hover:border-stroke-strong-500 hover:bg-bg-weak-100 focus-visible:border-stroke-strong-500 focus-visible:bg-bg-weak-100",

          hasError && "border-error-base-600",
          className
        )}
        {...props}
      >
        {start && (
          <SelectPrimitive.Icon asChild>
            <span className="text-icon-base-500 shrink-0">{start}</span>
          </SelectPrimitive.Icon>
        )}

        <SelectPrimitive.Value data-value placeholder={placeholder} />

        <SelectPrimitive.Icon asChild>
          <span className="text-icon-base-500 group-data-[state=open]:rotate-180 transition-transform">
            <ChevronDownIcon />
          </span>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SingleSelectTrigger.displayName = "SingleSelect.Trigger";

export type SingleSelectContentProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;

const SingleSelectContent = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SingleSelectContentProps
>(
  (
    { className, children, position = "popper", sideOffset = 4, ...rest },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={clsx(
          "z-[200] bg-surface-floating shadow-sm p-2 rounded-xl overflow-hidden max-h-[var(--radix-select-content-available-height)] [transform-origin:var(--radix-select-content-transform-origin)] data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in min-w-[var(--radix-select-trigger-width)]",
          className
        )}
        position={position}
        sideOffset={sideOffset}
        {...rest}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SingleSelectContent.displayName = "SingleSelect.Content";

export type SingleSelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

const SingleSelectItem = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SingleSelectItemProps
>(({ className, children, ...rest }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      "relative flex items-center data-[highlighted]:bg-bg-weak-100 hover:bg-bg-weak-100 px-3 py-2.5 rounded-lg outline-none text-text-strong-1000 text-base cursor-pointer select-none",
      className
    )}
    {...rest}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SingleSelectItem.displayName = "SingleSelect.Item";

export const SingleSelect = Object.assign(SingleSelectRoot, {
  Root: SingleSelectRoot,
  Trigger: SingleSelectTrigger,
  Content: SingleSelectContent,
  Item: SingleSelectItem,
});

function ChevronDownIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-neutral-500 shrink-0"
      {...props}
    >
      <path
        d="M19 9l-7 7-7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

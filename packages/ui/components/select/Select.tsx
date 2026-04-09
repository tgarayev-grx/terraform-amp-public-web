"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  type ComponentPropsWithoutRef,
} from "react";
import { clsx } from "clsx";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";

export type SingleSelectOption = {
  value: string;
  label: string;
  start?: ReactNode;
};

type SingleSelectSize = "sm" | "md";

const SingleSelectContext = createContext<{ size: SingleSelectSize }>({
  size: "md",
});

export type SingleSelectRootProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> & {
  size?: SingleSelectSize;
};

function SingleSelectRoot({ size = "md", ...props }: SingleSelectRootProps) {
  return (
    <SingleSelectContext.Provider value={{ size }}>
      <SelectPrimitive.Root {...props} />
    </SingleSelectContext.Provider>
  );
}

export type SingleSelectTriggerProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  start?: ReactNode;

  hasError?: boolean;
  placeholder?: string;
  variant?: "default" | "inline";
  size?: SingleSelectSize;
};

const SingleSelectTrigger = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SingleSelectTriggerProps
>(
  (
    { className, placeholder = "Select…", onBlur, hasError, start, ...props },
    ref
  ) => {
    const ctx = useContext(SingleSelectContext);
    const variant = props.variant ?? "default";
    const size = props.size ?? ctx.size ?? "md";

    // Remove custom props before passing to Radix Trigger
    const { variant: _variant, size: _size, ...radixProps } = props;

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        onBlur={onBlur}
        className={clsx(
          "group",
          "flex w-full items-center justify-between gap-2 text-left outline-none [&>span]:line-clamp-1 rounded-[10px]",

          "[&>[data-value]]:flex-grow data-[placeholder]:text-text-soft-500 text-text-strong-1000 text-body-md-regular",

          variant === "default" &&
            "border border-stroke-base-300 hover:border-stroke-strong-500 hover:bg-bg-weak-100 focus-visible:border-stroke-strong-500 focus-visible:bg-bg-weak-100",
          variant === "inline" &&
            "border border-transparent bg-transparent hover:bg-bg-weak-100 focus-visible:bg-bg-weak-100",

          size === "md" && "p-[11px] text-body-md-regular",
          size === "sm" && "px-2 py-1.5 text-xs rounded-lg",

          hasError && "border-error-base-600",
          className
        )}
        {...radixProps}
      >
        {start && (
          <SelectPrimitive.Icon asChild>
            <span className="text-icon-base-500 shrink-0">{start}</span>
          </SelectPrimitive.Icon>
        )}

        <SelectPrimitive.Value data-value placeholder={placeholder} />

        <SelectPrimitive.Icon asChild>
          <span className="text-icon-base-500 group-hover:text-icon-subtle-700 group-data-[state=open]:rotate-180 transition-transform">
            <ChevronDownIcon
              className={clsx(
                "shrink-0",
                size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
              )}
            />
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
  ) => {
    const ctx = useContext(SingleSelectContext);
    const size = ctx.size ?? "md";

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={clsx(
            "z-[200] bg-surface-floating shadow-sm overflow-hidden max-h-[var(--radix-select-content-available-height)] [transform-origin:var(--radix-select-content-transform-origin)] data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in min-w-[var(--radix-select-trigger-width)]",
            size === "md" && "p-2 rounded-xl",
            size === "sm" && "p-1.5 rounded-lg",
            className
          )}
          position={position}
          sideOffset={sideOffset}
          {...rest}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SingleSelectContent.displayName = "SingleSelect.Content";

export type SingleSelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> & {
  /** Rendered before the label in the list; not shown in the trigger (use option.start in FormSingleSelect so trigger start shows the icon) */
  start?: ReactNode;
};

const SingleSelectItem = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SingleSelectItemProps
>(({ className, children, start, ...rest }, ref) => {
  const ctx = useContext(SingleSelectContext);
  const size = ctx.size ?? "md";

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={clsx(
        "relative flex items-center gap-2 data-[highlighted]:bg-bg-weak-100 hover:bg-bg-weak-100 outline-none text-text-strong-1000 cursor-pointer select-none",
        size === "md" && "px-3 py-2.5 rounded-lg text-base",
        size === "sm" && "px-2.5 py-2 rounded-md text-sm",
        className
      )}
      {...rest}
    >
      {!!start && <span className="flex items-center shrink-0">{start}</span>}

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SingleSelectItem.displayName = "SingleSelect.Item";

export const SingleSelect = Object.assign(SingleSelectRoot, {
  Root: SingleSelectRoot,
  Trigger: SingleSelectTrigger,
  Content: SingleSelectContent,
  Item: SingleSelectItem,
});

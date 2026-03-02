"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { clsx } from "clsx";
import * as Slot from "@radix-ui/react-slot";
import { useFieldId } from "../field";

// --- Control ---

export type TextFieldControlProps = ComponentPropsWithoutRef<"div"> & {
  hasError?: boolean;
  hasDisabled?: boolean;

  variant: "input" | "textarea";

  asChild?: boolean;
};

const TextFieldControl = forwardRef<HTMLDivElement, TextFieldControlProps>(
  (
    {
      className,
      hasError,
      hasDisabled,
      children,
      asChild = false,
      variant,
      ...rest
    },
    ref
  ) => {
    const Root = asChild ? Slot.Root : "div";
    return (
      <Root
        ref={ref}
        className={clsx(
          className,
          "rounded-[10px] border border-stroke-base-300 text-body-md-regular text-text-strong-1000",
          variant === "input" && "p-[11px]",
          variant === "textarea" && "p-[11px] pb-[9px]",
          "hover:border-stroke-strong-500 hover:bg-bg-weak-100",
          "focus-within:border-stroke-stronger-900",
          hasError && "border-error-base-600",
          hasDisabled &&
            "bg-bg-weak-100 border-stroke-disabled text-text-disabled"
        )}
        {...rest}
      >
        {children}
      </Root>
    );
  }
);
TextFieldControl.displayName = "TextField.Control";

// --- Input ---

export type TextFieldInputProps = InputHTMLAttributes<HTMLInputElement>;

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ className, id: idProp, ...rest }, ref) => {
    const id = useFieldId();
    const inputId = idProp ?? id;
    return (
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "flex-1 bg-transparent border-0 outline-none w-full min-w-0 min-h-0 text-inherit placeholder:text-text-soft-500",
          className
        )}
        {...rest}
      />
    );
  }
);
TextFieldInput.displayName = "TextField.Input";

// --- TextArea ---

export type TextFieldTextAreaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextFieldTextArea = forwardRef<
  HTMLTextAreaElement,
  TextFieldTextAreaProps
>(({ className, id: idProp, ...props }, ref) => {
  const id = useFieldId();
  const textareaId = idProp ?? id;
  return (
    <>
      <textarea
        ref={ref}
        id={textareaId}
        className={clsx(
          "flex-1 bg-transparent pb-6 border-0 outline-none w-full min-w-0 min-h-[80px] text-inherit placeholder:text-text-soft-500 resize-y",
          className
        )}
        {...props}
      />
    </>
  );
});
TextFieldTextArea.displayName = "TextField.TextArea";

// --- Compound export ---

export const TextField = {
  Control: TextFieldControl,
  Input: TextFieldInput,
  TextArea: TextFieldTextArea,
};

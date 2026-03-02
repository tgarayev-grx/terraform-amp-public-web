"use client";

import {
  createContext,
  forwardRef,
  useId,
  useContext,
  type ComponentPropsWithoutRef,
} from "react";
import * as Slot from "@radix-ui/react-slot";
import { clsx } from "clsx";

type FieldContextValue = {
  id: string;
};

const FieldContext = createContext<FieldContextValue | null>(null);

function useField() {
  const ctx = useContext(FieldContext);
  if (!ctx)
    throw new Error("Field subcomponents must be used within FieldRoot");
  return ctx;
}

export function useFieldId() {
  const ctx = useContext(FieldContext);

  return ctx?.id;
}

export type FieldRootProps = ComponentPropsWithoutRef<"div"> & {
  id?: string;
  asChild?: boolean;
};

const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(
  ({ id: idProp, className, children, asChild = false, ...rest }, ref) => {
    const generatedId = useId();

    const Root = asChild ? Slot.Root : "div";
    return (
      <FieldContext.Provider value={{ id: idProp ?? generatedId }}>
        <Root
          ref={ref}
          className={clsx("flex flex-col gap-1", className)}
          {...rest}
        >
          {children}
        </Root>
      </FieldContext.Provider>
    );
  }
);
FieldRoot.displayName = "FieldRoot";

export type FieldLabelProps = ComponentPropsWithoutRef<"label"> & {
  noId?: boolean;
  asChild?: boolean;
};

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, children, asChild = false, noId = false, ...rest }, ref) => {
    const { id } = useField();
    const Root = asChild ? Slot.Root : "label";
    return (
      <Root
        ref={ref}
        className={clsx(
          //TODO: Different styles for default/focus states
          "min-h-[20px] font-medium text-text-strong-1000 text-sm",
          className
        )}
        {...rest}
        htmlFor={noId ? undefined : id}
      >
        {children}
      </Root>
    );
  }
);
FieldLabel.displayName = "FieldLabel";

export type FieldHelperTextProps = ComponentPropsWithoutRef<"p"> & {
  isError?: boolean;
  asChild?: boolean;
};

const FieldHelperText = forwardRef<HTMLParagraphElement, FieldHelperTextProps>(
  ({ className, isError, children, asChild = false, ...rest }, ref) => {
    const Root = asChild ? Slot.Root : "p";
    return (
      <Root
        ref={ref}
        className={clsx(
          "inline-flex justify-start items-center gap-1.5 text-sm",
          isError ? "text-red-500" : "text-neutral-600 dark:text-neutral-500",
          className
        )}
        role={isError ? "alert" : undefined}
        {...rest}
      >
        {isError && <AlertIcon />}

        <Slot.Slottable>{children}</Slot.Slottable>
      </Root>
    );
  }
);
FieldHelperText.displayName = "FieldHelperText";

function AlertIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.21094 2.52977C6.99318 1.15674 9.00683 1.15674 9.78907 2.52977L14.9037 11.507C15.6781 12.8664 14.6579 14.4998 13.1146 14.4998H2.88542C1.3421 14.4998 0.321861 12.8664 1.09636 11.507L6.21094 2.52977ZM7.5 5.99982C7.5 5.72368 7.72386 5.49982 8 5.49982C8.27613 5.49985 8.5 5.72369 8.5 5.99982V9.33316C8.49999 9.60928 8.27612 9.83313 8 9.83316C7.72387 9.83316 7.50001 9.60929 7.5 9.33316V5.99982ZM7.99996 11.9998C8.36815 11.9998 8.66663 11.7013 8.66663 11.3331C8.66663 10.9649 8.36815 10.6665 7.99996 10.6665C7.63177 10.6665 7.3333 10.9649 7.3333 11.3331C7.3333 11.7013 7.63177 11.9998 7.99996 11.9998Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  HelperText: FieldHelperText,
});

export { FieldRoot, FieldLabel, FieldHelperText };

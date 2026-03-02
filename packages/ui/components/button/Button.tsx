"use client";

import {
  createContext,
  ForwardedRef,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import * as Slot from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { cva, VariantProps } from "class-variance-authority";

type ButtonVariants = Required<VariantProps<typeof button>>;
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;

const ButtonContext = createContext<{
  size: ButtonSize;
}>({
  size: "sm",
});

export type ButtonRootProps = ComponentPropsWithoutRef<"button"> & {
  variant: ButtonVariant;
  size: ButtonSize;
  asChild?: boolean;
};

export const ButtonRoot = forwardRef(
  (
    {
      variant,
      size,
      asChild = false,
      className,
      children,
      ...props
    }: ButtonRootProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const Root = asChild ? Slot.Root : "button";
    return (
      <ButtonContext.Provider value={{ size }}>
        <Root
          ref={ref}
          className={clsx(button({ size, variant }), className)}
          {...props}
        >
          {children}
        </Root>
      </ButtonContext.Provider>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

export type ButtonTextProps = {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
};

export const ButtonText = forwardRef(
  (
    { children, asChild = false, className, ...props }: ButtonTextProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const { size } = useContext(ButtonContext);
    const Text = asChild ? Slot.Root : "span";

    return (
      <Text
        ref={ref}
        className={clsx(buttonText({ size }), className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

ButtonText.displayName = "ButtonText";

export type ButtonProps = Omit<ButtonRootProps, "asChild"> & {
  start?: ReactNode;
  end?: ReactNode;
};

export const Button = forwardRef(
  (
    { children, start, end, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <ButtonRoot ref={ref} {...props}>
      {start}
      <ButtonText>{children}</ButtonText>
      {end}
    </ButtonRoot>
  )
);

Button.displayName = "Button";

const button = cva(
  clsx(
    "flex justify-center items-center gap-2",
    "outline-none focus-visible:ring-4 focus-visible:ring-neutral-200 focus-visible:ring-offset-[2px]",
    "transition-colors",
    "disabled:cursor-not-allowed"
  ),
  {
    variants: {
      size: {
        xs: "px-2 py-1 rounded-md",
        sm: "px-3 py-1.5 rounded-lg",
        md: "px-4 py-2.5 rounded-[10px]",
        lg: "px-4 py-2.5 rounded-[10px]",
        xl: "px-6 py-4 rounded-xl",
      },
      variant: {
        primary:
          "bg-primary-base-1000 text-text-inverce hover:bg-primary-darker-800 active:not(:disabled):bg-primary-dark-700 disabled:bg-bg-weak-100 disabled:text-text-disabled",

        secondary:
          "bg-primary-weak-100 text-primary-base-1000 hover:bg-primary-soft-200 active:not(:disabled):bg-primary-subtle-300 disabled:bg-bg-weak-100 disabled:text-text-disabled",

        outlined:
          "border border-primary-base-1000 text-primary-base-1000 hover:not(:disabled):bg-primary-weak-100 active:not(:disabled):bg-primary-soft-200 disabled:border-stroke-disabled disabled:text-text-disabled",

        text: "text-primary-base-1000 hover:text-primary-weak-100 active:not(:disabled):text-primary-soft-200 disabled:text-text-disabled",
      },
    },
  }
);

const buttonText = cva("text-center", {
  variants: {
    size: {
      xs: "text-body-sm-semibold",
      sm: "text-body-md-semibold",
      md: "text-body-md-semibold",
      lg: "text-body-lg-semibold",
      xl: "text-body-lg-semibold",
    },
  },
});

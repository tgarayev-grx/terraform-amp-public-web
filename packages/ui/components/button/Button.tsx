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

const baseStyles =
  "flex justify-center items-center gap-2 font-medium  text-center transition-colors outline-none focus-visible:ring-4 focus-visible:ring-offset-[2px] focus-visible:ring-neutral-200 disabled:cursor-not-allowed";

const paletteVariantStyles = {
  primary: {
    contained:
      "bg-neutral-1000 hover:bg-neutral-800 active:not(:disabled):bg-neutral-700 text-neutral disabled:bg-neutral-100 disabled:text-neutral-400",
    outlined:
      "border border-neutral-900 bg-transparent hover:not(:disabled):bg-neutral-100 active:not(:disabled):bg-neutral-200 text-neutral-900",
  },
  secondary: {
    contained:
      "bg-neutral-100 hover:not(:disabled):bg-neutral-200 text-neutral-1000 active:not(:disabled):bg-neutral-300 disabled:text-neutral-400 dark:bg-neutral-800 dark:hover:not(:disabled):bg-neutral-700 dark:text-neutral dark:active:not(:disabled):bg-neutral-600 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500",
    outlined:
      "border border-neutral bg-transparent hover:not(:disabled):bg-neutral-100 active:not(:disabled):bg-neutral-200 text-neutral",
  },
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 rounded-lg text-sm",
  md: "px-6 py-2.5 rounded-xl text-base",
  lg: "p-4 rounded-xl text-sm",
} as const;

const textSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-base",
} as const;

export type ButtonPalette = keyof typeof paletteVariantStyles;
export type ButtonVariant = keyof (typeof paletteVariantStyles)["primary"];
export type ButtonSize = keyof typeof sizeStyles;

const ButtonContext = createContext<{
  size: ButtonSize;
}>({
  size: "sm",
});

export type ButtonRootProps = ComponentPropsWithoutRef<"button"> & {
  palette: ButtonPalette;
  variant: ButtonVariant;
  size: ButtonSize;
  asChild?: boolean;
};

export const ButtonRoot = forwardRef(
  (
    {
      palette,
      variant,
      size,
      asChild = false,
      className = "",
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
          className={clsx(
            baseStyles,
            paletteVariantStyles[palette][variant],
            sizeStyles[size],
            className
          )}
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
        className={clsx(
          "font-medium text-center",
          textSizeStyles[size],
          className
        )}
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
    {
      palette = "primary",
      variant = "contained",
      size = "sm",
      className = "",
      children,
      start,
      end,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <ButtonRoot
      ref={ref}
      palette={palette}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {start}
      <ButtonText>{children}</ButtonText>
      {end}
    </ButtonRoot>
  )
);

Button.displayName = "Button";

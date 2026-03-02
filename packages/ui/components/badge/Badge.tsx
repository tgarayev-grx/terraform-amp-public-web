import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef, type PropsWithChildren } from "react";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, palette, variant, size, className }, ref) => {
    return (
      <span
        ref={ref}
        className={
          /**
           * twMerge can't handle text-body-sm-medium and text-warning-base-600 together
           * @note https://github.com/dcastil/tailwind-merge/blob/v3.5.0/docs/limitations.md
           **/
          clsx(
            badge({
              size,
              palette,
              variant,
            }),
            className
          )
        }
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

type BadgeVariantProps = Required<VariantProps<typeof badge>>;
export type BadgeSize = NonNullable<BadgeVariantProps["size"]>;
export type BadgePalette = NonNullable<BadgeVariantProps["palette"]>;
export type BadgeVariant = NonNullable<BadgeVariantProps["variant"]>;

export type BadgeProps = PropsWithChildren & {
  className?: string;
  size: BadgeSize;
  palette: BadgePalette;
  variant: BadgeVariant;
};

const badge = cva("flex justify-center items-center", {
  variants: {
    size: {
      xs: "px-1 py-0.5 rounded-[4px] text-caption-xs-medium",
      sm: "px-1.5 py-0.5 rounded-[6px] text-body-sm-medium",
      md: "px-2 py-1 rounded-[6px] text-body-sm-medium",
    },
    palette: {
      neutral: "",
      success: "",
      warning: "",
      error: "",
      info: "",
    },
    variant: {
      filled: "text-text-inverce",
      light: "",
      stroke: "border border-solid",
      text: "",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      palette: "neutral",
      className: "bg-bg-emphasis-700",
    },
    {
      variant: "filled",
      palette: "info",
      className: "bg-info-base-600",
    },
    {
      variant: "filled",
      palette: "success",
      className: "bg-success-base-600",
    },
    {
      variant: "filled",
      palette: "warning",
      className: "bg-warning-soft-400",
    },
    {
      variant: "filled",
      palette: "error",
      className: "bg-error-subtle-500",
    },

    {
      variant: "light",
      palette: "neutral",
      className: "bg-bg-soft-200 text-text-strong-1000",
    },
    {
      variant: "light",
      palette: "info",
      className: "bg-info-muted-50 text-info-base-600",
    },
    {
      variant: "light",
      palette: "success",
      className: "bg-success-muted-50 text-success-base-600",
    },
    {
      variant: "light",
      palette: "warning",
      className: "bg-warning-muted-50 text-warning-base-600",
    },
    {
      variant: "light",
      palette: "error",
      className: "bg-error-muted-50 text-error-base-600",
    },

    {
      variant: "stroke",
      palette: "neutral",
      className: "border-stroke-base-300 text-text-strong-1000",
    },
    {
      variant: "stroke",
      palette: "info",
      className: "border-info-base-600 text-info-base-600",
    },
    {
      variant: "stroke",
      palette: "success",
      className: "border-success-base-600 text-success-base-600",
    },
    {
      variant: "stroke",
      palette: "warning",
      className: "border-warning-base-600 text-warning-base-600",
    },
    {
      variant: "stroke",
      palette: "error",
      className: "border-error-base-600 text-error-base-600",
    },

    {
      variant: "text",
      palette: "neutral",
      className: "text-text-strong-1000",
    },
    {
      variant: "text",
      palette: "info",
      className: "text-info-base-600",
    },
    {
      variant: "text",
      palette: "success",
      className: "text-success-base-600",
    },
    {
      variant: "text",
      palette: "warning",
      className: "text-warning-base-600",
    },
    {
      variant: "text",
      palette: "error",
      className: "text-error-base-600",
    },
  ],
});

import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
  SVGProps,
} from "react";
import { forwardRef } from "react";
import { CheckCircleFilledIcon } from "../../icons/CheckCircleFilledIcon";
import { RemoveCircleFilledIcon } from "../../icons/RemoveCircleFilled";
import { WarningFilledIcon } from "../../icons/WarningFilled";
import { InfoCircleFilledIcon } from "../../icons/InfoCircleFilledIcon";
import { DiamondIcon } from "../../icons/Diamond";
import { CloseIcon } from "../../icons/CloseIcon";

type AlertVariant = "info" | "success" | "warning" | "error" | "neutral";
type AlertSize = "xs" | "sm";

type AlertProps = {
  className?: string;
  variant: AlertVariant;
  size: AlertSize;
  filled: boolean;

  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;

  hideCloseButton?: boolean;
  onClose?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];

  concatTitleAndDescription?: boolean;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      filled,
      title,
      description,
      action,
      hideCloseButton,
      onClose,
      concatTitleAndDescription,
      ...props
    },
    ref
  ) => {
    return (
      <AlertRoot
        ref={ref}
        variant={variant}
        size={size}
        filled={filled}
        className={className}
        {...props}
      >
        <AlertIcon variant={variant} size={size} />

        <div className="flex flex-col flex-grow gap-3">
          <div className="flex flex-col gap-0.5">
            {concatTitleAndDescription ? (
              <AlertTitle size={size}>
                {title}
                {description}
              </AlertTitle>
            ) : (
              <>
                <AlertTitle size={size}>{title}</AlertTitle>

                <AlertDescription size={size}>{description}</AlertDescription>
              </>
            )}
          </div>

          {action}
        </div>

        {!hideCloseButton && <AlertCloseButton onClick={onClose} />}
      </AlertRoot>
    );
  }
);
Alert.displayName = "Alert";

type AlertRootProps = ComponentPropsWithoutRef<"div"> & {
  variant: AlertVariant;
  size: AlertSize;
  filled: boolean;
};
const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(
  ({ className, variant, size, filled: isFilled, ...props }, ref) => {
    const filled = clsx(
      variant === "info" && "bg-info-muted-50",
      variant === "success" && "bg-success-muted-50",
      variant === "warning" && "bg-warning-muted-50",
      variant === "error" && "bg-error-muted-50",
      variant === "neutral" && "bg-bg-weak-100"
    );
    return (
      <div
        ref={ref}
        className={clsx(
          "flex gap-2 shadow-xs p-3 border border-solid rounded-[10px]",

          variant === "info" && "border-info-base-600",
          variant === "success" && "border-success-base-600",
          variant === "warning" && "border-warning-base-600",
          variant === "error" && "border-error-base-600",
          variant === "neutral" && "border-icon-base-500",

          className,
          {
            [filled]: isFilled,
          }
        )}
        {...props}
      />
    );
  }
);
AlertRoot.displayName = "AlertRoot";

type AlertIconProps = SVGProps<SVGSVGElement> & {
  variant: AlertVariant;
  size: AlertSize;
};

export const AlertIcon = ({
  className,
  variant,
  size,
  ...props
}: AlertIconProps) => {
  const classNames = clsx(
    size === "xs" && "w-4 h-4",
    size === "sm" && "w-5 h-5",
    variant === "info" && "text-info-base-600",
    variant === "success" && "text-success-base-600",
    variant === "warning" && "text-warning-base-600",
    variant === "error" && "text-error-base-600",
    variant === "neutral" && "text-icon-base-500",
    className
  );

  switch (variant) {
    case "info": {
      return <InfoCircleFilledIcon className={classNames} {...props} />;
    }
    case "success": {
      return <CheckCircleFilledIcon className={classNames} {...props} />;
    }
    case "warning": {
      return <WarningFilledIcon className={classNames} {...props} />;
    }
    case "error": {
      return <RemoveCircleFilledIcon className={classNames} {...props} />;
    }
    case "neutral": {
      return <DiamondIcon className={classNames} {...props} />;
    }
    default: {
      const _: never = variant;
      console.error(`[AlertIcon] Invalid variant: ${_}`);

      return null;
    }
  }
};

type AlertTitleProps = ComponentPropsWithoutRef<"h3"> & {
  size: AlertSize;
};
const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx(
          "text-text-strong-1000",
          size === "xs" && "text-body-sm-medium",
          size === "sm" && "text-body-md-medium",
          className
        )}
        {...props}
      />
    );
  }
);
AlertTitle.displayName = "AlertTitle";

type AlertDescriptionProps = ComponentPropsWithoutRef<"p"> & {
  size: AlertSize;
};
const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, size, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={clsx(
        "text-text-subtle-700",
        size === "xs" && "text-body-sm-regular",
        size === "sm" && "text-body-md-regular",
        className
      )}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

const AlertCloseButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx("flex-shrink-0 w-5 h-5", className)}
      {...props}
    >
      <CloseIcon
        className="text-icon-base-500 hover:text-icon-subtle-700 active:text-icon-strong-1000 transition-colors"
        aria-hidden
      />
    </button>
  );
});
AlertCloseButton.displayName = "AlertCloseButton";

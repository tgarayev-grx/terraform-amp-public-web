import clsx from "clsx";
import type { PropsWithChildren } from "react";

export type OpenApiOperationChipProps = PropsWithChildren<{
  variant: "text" | "danger";
  className?: string;
}>;

export function OpenApiOperationChip({
  children,
  variant,
  className,
}: OpenApiOperationChipProps) {
  return (
    <span
      className={clsx(
        "px-1.5 py-0.5 rounded-md font-fira-code font-normal text-[12px]/[16px]",
        variant === "text" && "bg-bg-weak-100 text-text-subtle-700",
        variant === "danger" && "bg-error-muted-50 text-error-base-600",
        className
      )}
    >
      {children}
    </span>
  );
}

OpenApiOperationChip.displayName = "OpenApiOperationChip";

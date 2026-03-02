import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ComingSoonBadgeProps = PropsWithChildren & {
  variant?: "yellow" | "neutral";
  size: "sm" | "md";
};

export function ComingSoonBadge({
  children,
  variant = "yellow",
  size,
}: ComingSoonBadgeProps) {
  return (
    <span
      className={clsx(
        variant === "yellow"
          ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-500"
          : "bg-neutral-200 text-neutral-1000 dark:bg-neutral-700 dark:text-neutral",
        size === "sm" && "px-1.5 py-0.5 rounded-[6px] text-body-sm-medium",
        size === "md" && "px-2 py-1 rounded-[8px] text-body-sm-medium"
      )}
    >
      {children}
    </span>
  );
}

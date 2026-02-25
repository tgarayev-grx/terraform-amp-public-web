import clsx from "clsx";
import type { ReactNode } from "react";

type ComingSoonBadgeProps = {
  children: ReactNode;
  variant?: "yellow" | "neutral";
};

export function ComingSoonBadge({
  children,
  variant = "yellow",
}: ComingSoonBadgeProps) {
  const className = clsx(
    "px-2 py-0.5 rounded-[6px] font-medium text-xs",
    variant === "yellow"
      ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-500"
      : "bg-neutral-200 text-neutral-600 dark:text-neutral dark:bg-neutral-700"
  );
  return <span className={className}>{children}</span>;
}

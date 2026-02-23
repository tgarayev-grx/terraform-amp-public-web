import clsx from "clsx";
import type { ReactNode } from "react";

type ComingSoonBadgeProps = {
  children: ReactNode;
  variant?: "amber" | "neutral";
};

export function ComingSoonBadge({
  children,
  variant = "amber",
}: ComingSoonBadgeProps) {
  const className = clsx(
    "px-2 py-0.5 text-xs font-medium rounded-[6px]",
    variant === "amber"
      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
      : "bg-neutral-200 text-neutral-600"
  );
  return <span className={className}>{children}</span>;
}

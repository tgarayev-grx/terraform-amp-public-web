"use client";

import clsx from "clsx";

import { ArrowDownLeftIcon } from "@grx/ui/icons/ArrowDownLeft";
import { ArrowUpRightIcon } from "@grx/ui/icons/ArrowUpRight";

import type { ParsedOperation } from "@/lib/openapi/types";

type DocsApiMethodBadgeProps = {
  method: string;
  className?: string;
};

export function DocsApiMethodBadge({
  method,
  className,
}: DocsApiMethodBadgeProps) {
  const m = method.toLowerCase() as ParsedOperation["method"];
  const box = clsx(
    "flex justify-center items-center rounded w-5 h-5 shrink-0 border",
    className
  );

  switch (m) {
    case "get": {
      return (
        <div
          className={clsx(
            box,
            "bg-success-lighter-100 border-success-light-200 text-success-base-600"
          )}
        >
          <ArrowDownLeftIcon />
        </div>
      );
    }
    case "post": {
      return (
        <div
          className={clsx(
            box,
            "bg-info-muted-50 border-info-light-200 text-info-base-600"
          )}
        >
          <ArrowUpRightIcon />
        </div>
      );
    }
    case "put":
    case "patch": {
      return (
        <div
          className={clsx(
            box,
            "bg-warning-lighter-100 border-warning-light-200 text-warning-base-600"
          )}
        >
          <ArrowUpRightIcon />
        </div>
      );
    }
    case "delete": {
      return (
        <div
          className={clsx(
            box,
            "bg-error-lighter-100 border-error-light-200 text-error-base-600"
          )}
        >
          <ArrowUpRightIcon />
        </div>
      );
    }
    default: {
      return null;
    }
  }
}

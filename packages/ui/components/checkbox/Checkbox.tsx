"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef, SVGProps, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";
import type { CheckboxProps } from "@radix-ui/react-checkbox";

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        "flex justify-center items-center border-2 border-neutral-300 dark:border-neutral-600 rounded w-5 h-5 shrink-0",
        "data-[state=checked]:border-neutral-1000 data-[state=checked]:bg-neutral data-[state=checked]:text-neutral-1000",
        "dark:data-[state=checked]:border-neutral-400 dark:data-[state=checked]:bg-neutral-1000 dark:data-[state=checked]:text-neutral",
        "focus-visible:ring-4 focus-visible:ring-offset-[2px] focus-visible:ring-neutral-200 focus-visible:text-neutral-200 focus-visible:border-neutral-200",
        "hover:border-neutral-400 dark:hover:border-neutral-400 hover:data-[state=checked]:text-neutral-500 hover:data-[state=checked]:border-neutral-500",
        "active:border-neutral-1000 active:data-[state=checked]:text-neutral-700 active:data-[state=checked]:border-neutral-700",
        "outline-none",
        "disabled:border-neutral-200 dark:disabled:border-neutral-700 disabled:pointer-events-none disabled:data-[state=checked]:border-neutral-200 dark:disabled:data-[state=checked]:border-neutral-700",
        className
      )}
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex justify-center items-center">
        {checked === "indeterminate" ? (
          <CheckboxIndeterminateIcon className="w-5 h-5" />
        ) : (
          <CheckboxCheckIcon className="w-5 h-5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = "Checkbox";

function CheckboxCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5C0 2.23858 2.23858 0 5 0H15ZM15.625 6.62231C15.1857 6.18297 14.4725 6.18297 14.0332 6.62231L9.2041 11.4514L6.875 9.12231C6.43566 8.68297 5.72254 8.68297 5.2832 9.12231C4.84386 9.56165 4.84386 10.2748 5.2832 10.7141L8.32031 13.75C8.80846 14.238 9.59978 14.238 10.0879 13.75L15.625 8.21411C16.0643 7.7748 16.0643 7.06166 15.625 6.62231Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckboxIndeterminateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5C0 2.23858 2.23858 0 5 0H15ZM5 8.75C4.30964 8.75 3.75 9.30964 3.75 10C3.75 10.6904 4.30964 11.25 5 11.25H15C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75H5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type { CheckboxProps } from "@radix-ui/react-checkbox";

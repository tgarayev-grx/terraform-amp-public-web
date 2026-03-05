import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagSR = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagSR({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33232)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M23.2536 7.82666H0.746344C0.264047 9.12669 0 10.5327 0 12.0006C0 13.4684 0.264047 14.8745 0.746344 16.1744H23.2536C23.736 14.8745 24 13.4684 24 12.0006C24 10.5327 23.736 9.12669 23.2536 7.82666Z"
          fill="#A2001D"
        />
        <path
          d="M12.0345 24.0016C16.1446 24.0016 19.7716 21.9347 21.9343 18.7842H2.13477C4.29748 21.9347 7.92439 24.0016 12.0345 24.0016Z"
          fill="#6DA544"
        />
        <path
          d="M12.0345 0.000488281C16.1446 0.000488281 19.7716 2.0673 21.9343 5.21786H2.13477C4.29748 2.0673 7.92439 0.000488281 12.0345 0.000488281Z"
          fill="#6DA544"
        />
        <path
          d="M11.9991 7.82666L13.0351 11.0151H16.3878L13.6754 12.9859L14.7115 16.1744L11.9991 14.2039L9.28665 16.1744L10.3228 12.9859L7.61035 11.0151H10.9631L11.9991 7.82666Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33232">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagSR.displayName = "IconCountryFlagSR";

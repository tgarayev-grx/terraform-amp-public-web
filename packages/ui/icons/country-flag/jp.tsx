import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagJP = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagJP({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33317)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M11.9996 17.2179C14.8811 17.2179 17.217 14.882 17.217 12.0006C17.217 9.1191 14.8811 6.7832 11.9996 6.7832C9.11813 6.7832 6.78223 9.1191 6.78223 12.0006C6.78223 14.882 9.11813 17.2179 11.9996 17.2179Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33317">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagJP.displayName = "IconCountryFlagJP";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagPS = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagPS({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33301)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M7.30388 7.82709H23.2531C21.5576 3.25748 17.1591 0.000976562 11.9995 0.000976562C8.68576 0.000976562 5.68609 1.34437 3.51465 3.51609L7.30388 7.82709Z"
          fill="black"
        />
        <path
          d="M7.30388 16.1738H23.2531C21.5576 20.7434 17.1591 23.9999 11.9995 23.9999C8.68576 23.9999 5.68609 22.6566 3.51465 20.4848L7.30388 16.1738Z"
          fill="#6DA544"
        />
        <path
          d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C5.45126 18.5487 7.31375 16.6862 12 12L3.51471 3.51465Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33301">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagPS.displayName = "IconCountryFlagPS";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagMT = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagMT({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33327)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M12 -0.000488281C18.6274 -0.000488281 24 5.37214 24 11.9995C24 18.6269 18.6274 23.9995 12 23.9995"
          fill="#D80027"
        />
        <path
          d="M8.34725 4.69606V3.13086H6.78205V4.69606H5.2168V6.26126H6.78205V7.82651H8.34725V6.26126H9.91245V4.69606H8.34725Z"
          fill="#ACABB1"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33327">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagMT.displayName = "IconCountryFlagMT";

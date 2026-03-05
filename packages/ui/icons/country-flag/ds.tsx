import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagDS = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagDS({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33233)">
        <path
          d="M1.19072 6.78274C0.427875 8.36037 0 10.1302 0 12.0001C0 13.87 0.427875 15.6399 1.19072 17.2175L12 18.261L22.8093 17.2175C23.5721 15.6399 24 13.87 24 12.0001C24 10.1302 23.5721 8.36037 22.8093 6.78274L12 5.73926L1.19072 6.78274Z"
          fill="#F0F0F0"
        />
        <path
          d="M1.19141 17.2168C3.13231 21.2307 7.24273 23.9994 12.0003 23.9994C16.7578 23.9994 20.8682 21.2307 22.8091 17.2168H1.19141Z"
          fill="black"
        />
        <path
          d="M1.19141 6.78311H22.8091C20.8682 2.76916 16.7578 0.000488281 12.0003 0.000488281C7.24273 0.000488281 3.13231 2.76916 1.19141 6.78311Z"
          fill="#D80027"
        />
        <path
          d="M3.51471 3.51416C-1.17157 8.20044 -1.17157 15.7985 3.51471 20.4848C5.45126 18.5482 7.31375 16.6858 12 11.9995L3.51471 3.51416Z"
          fill="#496E2D"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33233">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagDS.displayName = "IconCountryFlagDS";

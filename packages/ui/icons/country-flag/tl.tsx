import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagTL = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagTL({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33320)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#FFDA44"
        />
        <path
          d="M12.0001 -0.000488281C9.06209 -0.000488281 6.37119 1.05593 4.28516 2.80892L17.2175 11.9995L4.28516 21.1901C6.37119 22.9431 9.06209 23.9995 12.0001 23.9995C18.6275 23.9995 24.0001 18.6269 24.0001 11.9995C24.0001 5.37214 18.6275 -0.000488281 12.0001 -0.000488281Z"
          fill="#D80027"
        />
        <path
          d="M3.51471 3.51562C-1.17157 8.20191 -1.17157 15.7999 3.51471 20.4862C5.45126 18.5497 7.31375 16.6872 12 12.0009L3.51471 3.51562Z"
          fill="black"
        />
        <path
          d="M3.32659 9.25146L5.15284 10.9798L7.36103 9.77684L6.28173 12.0479L8.10803 13.7763L5.61456 13.4516L4.53513 15.7226L4.07355 13.2508L1.58008 12.926L3.78817 11.7231L3.32659 9.25146Z"
          fill="#F0F0F0"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33320">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagTL.displayName = "IconCountryFlagTL";

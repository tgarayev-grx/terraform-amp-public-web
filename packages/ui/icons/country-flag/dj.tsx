import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagDJ = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagDJ({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33343)">
        <path
          d="M10.9565 13.044C10.9565 13.044 3.52168 3.51354 3.51465 3.51522C5.68618 1.34364 8.68623 0.000488281 12 0.000488281C18.6273 0.000488281 24 5.37311 24 12.0005L10.9565 13.044Z"
          fill="#338AF3"
        />
        <path
          d="M10.9565 11.9995C10.9565 11.9995 3.52168 20.4865 3.51465 20.4848C5.68618 22.6564 8.68623 23.9995 12 23.9995C18.6273 23.9995 24 18.6269 24 11.9995H10.9565Z"
          fill="#6DA544"
        />
        <path
          d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C5.45126 18.5487 7.31374 16.6862 12 12L3.51471 3.51465Z"
          fill="#F0F0F0"
        />
        <path
          d="M4.85597 8.86914L5.63292 11.2605H8.14758L6.1133 12.7386L6.8902 15.13L4.85597 13.652L2.82164 15.13L3.59873 12.7386L1.56445 11.2605H4.07892L4.85597 8.86914Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33343">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagDJ.displayName = "IconCountryFlagDJ";

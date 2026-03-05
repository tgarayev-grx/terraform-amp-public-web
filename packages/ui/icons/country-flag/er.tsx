import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagER = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagER({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33409)">
        <path
          d="M10.9565 10.9565C10.9565 10.9565 3.52168 20.487 3.51465 20.4853C5.68618 22.6569 8.68623 24 12 24C18.6273 24 24 18.6274 24 12L10.9565 10.9565Z"
          fill="#338AF3"
        />
        <path
          d="M10.9565 11.9995C10.9565 11.9995 3.52168 3.51256 3.51465 3.51425C5.68618 1.34267 8.68623 -0.000488281 12 -0.000488281C18.6273 -0.000488281 24 5.37214 24 11.9995H10.9565Z"
          fill="#6DA544"
        />
        <path
          d="M3.51373 3.51562C-1.17255 8.20191 -1.17255 15.7999 3.51373 20.4862C3.51341 20.4882 23.999 12.0009 23.999 12.0009L3.51373 3.51562Z"
          fill="#D80027"
        />
        <path
          d="M6.26081 7.04297C3.95929 7.04297 2.08691 8.91539 2.08691 11.2169V12.7821C2.08691 15.0836 3.95934 16.9559 6.26081 16.9559C8.56227 16.9559 10.4347 15.0835 10.4347 12.7821V11.2169C10.4347 8.91539 8.56232 7.04297 6.26081 7.04297ZM8.86949 12.7821C8.86949 13.948 8.10065 14.9375 7.04338 15.2707V13.5647L8.15076 12.4574L7.04399 11.3506L7.04338 10.9567V10.4343H5.47823V11.9995L4.3716 13.1061L5.47823 14.2126V15.2707C4.42096 14.9375 3.65212 13.948 3.65212 12.7822V11.2169C3.65212 9.7785 4.8224 8.60826 6.26081 8.60826C7.69921 8.60826 8.86949 9.77854 8.86949 11.2169V12.7821Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33409">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagER.displayName = "IconCountryFlagER";

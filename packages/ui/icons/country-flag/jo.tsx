import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagJO = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagJO({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33313)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M7.30388 7.82611H23.2531C21.5576 3.2565 17.1591 0 11.9995 0C8.68576 0 5.68609 1.34339 3.51465 3.51511L7.30388 7.82611Z"
          fill="black"
        />
        <path
          d="M7.30388 16.1743H23.2531C21.5576 20.7439 17.1591 24.0004 11.9995 24.0004C8.68576 24.0004 5.68609 22.657 3.51465 20.4853L7.30388 16.1743Z"
          fill="#6DA544"
        />
        <path
          d="M3.51471 3.51367C-1.17157 8.19995 -1.17157 15.798 3.51471 20.4843C5.45126 18.5478 7.31375 16.6853 12 11.999L3.51471 3.51367Z"
          fill="#D80027"
        />
        <path
          d="M4.76268 9.3916L5.42123 10.7687L6.90852 10.425L6.24243 11.7985L7.43845 12.747L5.94937 13.0825L5.95349 14.609L4.76268 13.654L3.57182 14.609L3.57599 13.0825L2.08691 12.747L3.28288 11.7985L2.61688 10.425L4.10409 10.7687L4.76268 9.3916Z"
          fill="#F0F0F0"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33313">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagJO.displayName = "IconCountryFlagJO";

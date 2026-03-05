import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagML = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagML({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33303)">
        <path
          d="M16.1745 0.745902C14.8745 0.263559 13.4684 -0.000488281 12.0006 -0.000488281C10.5327 -0.000488281 9.12667 0.263559 7.82669 0.745902L6.7832 11.9995L7.82669 23.2531C9.12667 23.7355 10.5327 23.9995 12.0006 23.9995C13.4684 23.9995 14.8745 23.7355 16.1745 23.2531L17.218 11.9995L16.1745 0.745902Z"
          fill="#FFDA44"
        />
        <path
          d="M23.9999 12.0001C23.9999 6.84061 20.7434 2.44205 16.1738 0.746582V23.2538C20.7434 21.5582 23.9999 17.1598 23.9999 12.0001Z"
          fill="#D80027"
        />
        <path
          d="M0 11.9997C0 17.1593 3.2565 21.5577 7.82611 23.2533V0.746094C3.2565 2.44156 0 6.84012 0 11.9997Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33303">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagML.displayName = "IconCountryFlagML";

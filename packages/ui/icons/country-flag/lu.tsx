import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagLU = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagLU({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33274)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M11.9997 -0.000488281C6.84012 -0.000488281 2.44161 3.25601 0.746094 7.82562H23.2534C21.5578 3.25601 17.1593 -0.000488281 11.9997 -0.000488281Z"
          fill="#D80027"
        />
        <path
          d="M12.0007 24.0009C17.1603 24.0009 21.5588 20.7444 23.2543 16.1748H0.74707C2.44259 20.7444 6.8411 24.0009 12.0007 24.0009Z"
          fill="#338AF3"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33274">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagLU.displayName = "IconCountryFlagLU";

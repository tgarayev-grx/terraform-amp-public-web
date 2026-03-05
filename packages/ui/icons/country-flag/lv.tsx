import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagLV = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagLV({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33304)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M12.0007 -0.000488281C6.45634 -0.000488281 1.79106 3.75987 0.414062 8.86906H23.5873C22.2103 3.75987 17.545 -0.000488281 12.0007 -0.000488281Z"
          fill="#A2001D"
        />
        <path
          d="M12.0007 23.999C17.545 23.999 22.2103 20.2386 23.5873 15.1294H0.414062C1.79106 20.2385 6.45634 23.999 12.0007 23.999Z"
          fill="#A2001D"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33304">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagLV.displayName = "IconCountryFlagLV";

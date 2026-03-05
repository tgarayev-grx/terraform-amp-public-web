import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagLB = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagLB({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33302)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M11.9997 -0.000488281C7.24218 -0.000488281 3.13143 2.76818 1.19043 6.78214H22.8089C20.868 2.76818 16.7572 -0.000488281 11.9997 -0.000488281Z"
          fill="#D80027"
        />
        <path
          d="M11.9997 23.9994C16.7572 23.9994 20.868 21.2308 22.809 17.2168H1.19043C3.13143 21.2308 7.24218 23.9994 11.9997 23.9994Z"
          fill="#D80027"
        />
        <path
          d="M15.131 14.0863L12.0006 8.34717L8.87012 14.0863H11.2179V15.6515H12.7832V14.0863H15.131Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33302">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagLB.displayName = "IconCountryFlagLB";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagNF = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagNF({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33265)">
        <path
          d="M17.2165 1.19023C15.6389 0.427387 13.869 -0.000488281 11.9991 -0.000488281C10.1292 -0.000488281 8.35939 0.427387 6.78176 1.19023L5.73828 11.9995L6.78176 22.8088C8.35939 23.5716 10.1292 23.9995 11.9991 23.9995C13.869 23.9995 15.6389 23.5716 17.2165 22.8088L18.26 11.9995L17.2165 1.19023Z"
          fill="#F0F0F0"
        />
        <path
          d="M6.78262 1.19141C2.76867 3.13231 0 7.24273 0 12.0003C0 16.7578 2.76867 20.8682 6.78262 22.8091V1.19141Z"
          fill="#6DA544"
        />
        <path
          d="M17.2168 1.19141V22.8091C21.2307 20.8682 23.9994 16.7578 23.9994 12.0003C23.9994 7.24278 21.2307 3.13231 17.2168 1.19141Z"
          fill="#6DA544"
        />
        <path
          d="M15.131 15.6518L12.0006 5.73877L8.87012 15.6518H11.2179V18.2605H12.7832V15.6518H15.131Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33265">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagNF.displayName = "IconCountryFlagNF";

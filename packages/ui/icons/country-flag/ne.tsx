import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagNE = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagNE({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33435)">
        <path
          d="M1.19072 6.78225C0.427875 8.35988 0 10.1297 0 11.9996C0 13.8695 0.427875 15.6394 1.19072 17.217L12 18.2605L22.8093 17.217C23.5721 15.6394 24 13.8695 24 11.9996C24 10.1297 23.5721 8.35988 22.8093 6.78225L12 5.73877L1.19072 6.78225Z"
          fill="#F0F0F0"
        />
        <path
          d="M1.19043 17.2183C3.13134 21.2322 7.24176 24.0009 11.9993 24.0009C16.7568 24.0009 20.8672 21.2322 22.8081 17.2183H1.19043Z"
          fill="#6DA544"
        />
        <path
          d="M1.19043 6.78214H22.8081C20.8672 2.76818 16.7568 -0.000488281 11.9993 -0.000488281C7.24181 -0.000488281 3.13134 2.76818 1.19043 6.78214Z"
          fill="#FF9811"
        />
        <path
          d="M11.9991 16.174C14.3043 16.174 16.173 14.3052 16.173 12.0001C16.173 9.69489 14.3043 7.82617 11.9991 7.82617C9.69391 7.82617 7.8252 9.69489 7.8252 12.0001C7.8252 14.3052 9.69391 16.174 11.9991 16.174Z"
          fill="#FF9811"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33435">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagNE.displayName = "IconCountryFlagNE";

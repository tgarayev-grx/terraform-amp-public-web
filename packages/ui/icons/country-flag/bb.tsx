import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagBB = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagBB({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33392)">
        <path
          d="M17.2175 1.19072C15.6399 0.427875 13.87 0 12.0001 0C10.1303 0 8.36037 0.427875 6.78274 1.19072L5.73926 12L6.78274 22.8093C8.36037 23.5721 10.1303 24 12.0001 24C13.87 24 15.6399 23.5721 17.2175 22.8093L18.261 12L17.2175 1.19072Z"
          fill="#FFDA44"
        />
        <path
          d="M6.78262 1.19141C2.76872 3.13231 0 7.24273 0 12.0003C0 16.7578 2.76872 20.8682 6.78262 22.8091V1.19141Z"
          fill="#0052B4"
        />
        <path
          d="M17.2178 1.19189V22.8096C21.2317 20.8687 24.0004 16.7582 24.0004 12.0008C24.0004 7.24327 21.2317 3.1328 17.2178 1.19189Z"
          fill="#0052B4"
        />
        <path
          d="M15.6518 7.30325L16.3518 7.65322L15.6518 7.30325L14.9518 6.95328C14.9096 7.0377 13.9956 8.89738 13.8463 11.738H12.7822V7.30325L11.9996 6.25977L11.217 7.30325V11.738H10.153C10.0036 8.89738 9.08966 7.0377 9.04743 6.95328L7.64746 7.65327C7.65712 7.67248 8.60835 9.60866 8.60835 12.5207V13.3033H11.217V17.7381H12.7822V13.3033H15.3909V12.5206C15.3909 11.0151 15.6514 9.77366 15.87 8.99731C16.1083 8.15075 16.3503 7.65636 16.3527 7.65144L15.6518 7.30325Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33392">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagBB.displayName = "IconCountryFlagBB";

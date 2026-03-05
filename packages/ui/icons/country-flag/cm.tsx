import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagCM = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagCM({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33360)">
        <path
          d="M17.2175 1.19121C15.6399 0.428363 13.87 0.000488281 12.0001 0.000488281C10.1303 0.000488281 8.36037 0.428363 6.78274 1.19121L5.73926 12.0005L6.78274 22.8098C8.36037 23.5726 10.1303 24.0005 12.0001 24.0005C13.87 24.0005 15.6399 23.5726 17.2175 22.8098L18.261 12.0005L17.2175 1.19121Z"
          fill="#D80027"
        />
        <path
          d="M12 7.8252L13.0359 11.0136H16.3888L13.6764 12.9844L14.7124 16.173L12 14.2023L9.28753 16.173L10.3237 12.9844L7.61133 11.0136H10.964L12 7.8252Z"
          fill="#FFDA44"
        />
        <path
          d="M6.78262 1.19189C2.76872 3.1328 0 7.24322 0 12.0008C0 16.7583 2.76872 20.8687 6.78262 22.8096V1.19189Z"
          fill="#496E2D"
        />
        <path
          d="M17.2178 1.19189V22.8096C21.2317 20.8687 24.0004 16.7582 24.0004 12.0008C24.0004 7.24327 21.2317 3.1328 17.2178 1.19189Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33360">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagCM.displayName = "IconCountryFlagCM";

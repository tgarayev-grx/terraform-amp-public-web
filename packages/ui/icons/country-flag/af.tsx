import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagAF = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagAF({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33424)">
        <path
          d="M17.2175 1.19072C15.6399 0.427875 13.87 0 12.0001 0C10.1303 0 8.36037 0.427875 6.78274 1.19072L5.73926 12L6.78274 22.8093C8.36037 23.5721 10.1303 24 12.0001 24C13.87 24 15.6399 23.5721 17.2175 22.8093L18.261 12L17.2175 1.19072Z"
          fill="#D80027"
        />
        <path
          d="M6.78262 1.19141C2.76872 3.13236 0 7.24278 0 12.0003C0 16.7577 2.76872 20.8682 6.78262 22.8091V1.19141Z"
          fill="black"
        />
        <path
          d="M17.2178 1.19141V22.8091C21.2317 20.8682 24.0004 16.7577 24.0004 12.0003C24.0004 7.24278 21.2317 3.13236 17.2178 1.19141Z"
          fill="#496E2D"
        />
        <path
          d="M12.0001 7.82666C9.69484 7.82666 7.82617 9.69538 7.82617 12.0006C7.82617 14.3057 9.69489 16.1744 12.0001 16.1744C14.3052 16.1744 16.174 14.3057 16.174 12.0006C16.174 9.69538 14.3053 7.82666 12.0001 7.82666ZM12.0001 14.6092C10.5593 14.6092 9.39138 13.4413 9.39138 12.0006C9.39138 10.5598 10.5594 9.39186 12.0001 9.39186C13.4408 9.39186 14.6088 10.5598 14.6088 12.0006C14.6088 13.4413 13.4408 14.6092 12.0001 14.6092Z"
          fill="#FFDA44"
        />
        <path
          d="M12.0005 10.436C11.4242 10.436 10.957 10.9032 10.957 11.4795V13.0447H13.044V11.4795C13.044 10.9032 12.5768 10.436 12.0005 10.436Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33424">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagAF.displayName = "IconCountryFlagAF";

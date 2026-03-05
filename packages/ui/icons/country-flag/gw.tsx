import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagGW = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagGW({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33336)">
        <path
          d="M12.0001 0C10.917 0 9.86772 0.144375 8.86961 0.413391L7.82617 12L8.86966 23.5866C9.86772 23.8556 10.917 24 12.0001 24C18.6274 24 24.0001 18.6274 24.0001 12C24.0001 5.37262 18.6274 0 12.0001 0Z"
          fill="#FFDA44"
        />
        <path
          d="M7.82617 12.0005L8.86966 23.5871C9.86772 23.8561 10.917 24.0005 12.0001 24.0005C18.6274 24.0005 24.0001 18.6279 24.0001 12.0005H7.82617Z"
          fill="#6DA544"
        />
        <path
          d="M0 11.9999C0 16.5484 2.53078 20.5056 6.26086 22.5408V1.45898C2.53078 3.4942 0 7.45139 0 11.9999Z"
          fill="#D80027"
        />
        <path
          d="M0 11.9997C0 17.544 3.76036 22.2093 8.86955 23.5863V0.413086C3.76036 1.79009 0 6.45537 0 11.9997Z"
          fill="#D80027"
        />
        <path
          d="M4.53468 8.86816L5.31163 11.2595H7.82629L5.79201 12.7376L6.56891 15.1291L4.53468 13.6511L2.50035 15.1291L3.27745 12.7376L1.24316 11.2595H3.75768L4.53468 8.86816Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33336">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagGW.displayName = "IconCountryFlagGW";

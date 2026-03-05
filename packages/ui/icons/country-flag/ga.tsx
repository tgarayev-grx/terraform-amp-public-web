import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagGA = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagGA({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33420)">
        <path
          d="M23.2536 16.175C23.736 14.875 24 13.4689 24 12.0011C24 10.5332 23.736 9.12721 23.2536 7.82718L12 6.78369L0.746391 7.82718C0.264047 9.12721 0 10.5332 0 12.0011C0 13.4689 0.264047 14.875 0.746391 16.175L12 17.2184L23.2536 16.175Z"
          fill="#FFDA44"
        />
        <path
          d="M12.0007 23.9995C17.1603 23.9995 21.5588 20.743 23.2543 16.1733H0.74707C2.44263 20.743 6.8411 23.9995 12.0007 23.9995Z"
          fill="#0052B4"
        />
        <path
          d="M12.0007 0.000976562C6.8411 0.000976562 2.44263 3.25748 0.74707 7.82709H23.2543C21.5588 3.25748 17.1603 0.000976562 12.0007 0.000976562Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33420">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagGA.displayName = "IconCountryFlagGA";

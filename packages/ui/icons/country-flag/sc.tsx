import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagSC = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagSC({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33412)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M20.1006 3.14656C17.9659 1.19225 15.1224 -0.000488281 12.0002 -0.000488281C11.489 -0.000488281 10.9854 0.0317148 10.491 0.0937305L4.69581 6.78214L0.379883 15.0057C0.658695 16.0866 1.08498 17.1082 1.63496 18.0486L12.0002 11.9995L20.1006 3.14656Z"
          fill="#FFDA44"
        />
        <path
          d="M21.9903 18.6479L5.20117 21.8879C7.13378 23.2192 9.47556 23.9993 11.9998 23.9993C16.168 23.9993 19.8392 21.8738 21.9903 18.6479Z"
          fill="#6DA544"
        />
        <path
          d="M20.1021 3.14844L1.6416 18.0605C2.12446 18.884 2.70257 19.6449 3.36102 20.3278L23.9999 11.9998C23.9999 8.49547 22.4976 5.34228 20.1021 3.14844Z"
          fill="#D80027"
        />
        <path
          d="M0 12C0 13.0382 0.131906 14.0455 0.379734 15.0062L10.4909 0.0942383C4.57584 0.836457 0 5.88377 0 12Z"
          fill="#0052B4"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33412">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagSC.displayName = "IconCountryFlagSC";

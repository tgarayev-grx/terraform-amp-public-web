import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagBQ = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagBQ({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33439)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M12 0.000981008C11.9888 -0.00745649 -0.00318686 11.9978 6.35322e-07 12.001C6.35322e-07 5.37361 5.37262 0.000981008 12 0.000981008Z"
          fill="#D80027"
        />
        <path
          d="M12 4.44543e-06C12.0112 -0.00843305 24.0032 11.9968 24 12C24 5.37263 18.6274 4.44543e-06 12 4.44543e-06Z"
          fill="#D80027"
        />
        <path
          d="M12 23.9995C11.9888 24.008 -0.00318686 12.0027 6.35322e-07 11.9995C6.35322e-07 18.6269 5.37262 23.9995 12 23.9995Z"
          fill="#0052B4"
        />
        <path
          d="M12 23.999C12.0112 24.0075 24.0032 12.0022 24 11.999C24 18.6264 18.6274 23.999 12 23.999Z"
          fill="#0052B4"
        />
        <path
          d="M11.9995 6.26074L13.2946 10.2465H17.4855L14.0949 12.7098L15.39 16.6956L11.9995 14.2322L8.60908 16.6956L9.90414 12.7098L6.51367 10.2465H10.7045L11.9995 6.26074Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33439">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagBQ.displayName = "IconCountryFlagBQ";

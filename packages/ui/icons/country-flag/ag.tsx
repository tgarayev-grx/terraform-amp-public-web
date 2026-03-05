import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagAG = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagAG({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33256)">
        <path
          d="M0 11.9991C0 12.8211 0.082875 13.6237 0.240328 14.3991L12 15.1296L23.7597 14.3991C23.9172 13.6237 24 12.8211 24 11.9991C24 11.1772 23.9171 10.3746 23.7597 9.59911L12 8.86865L0.240328 9.59911C0.082875 10.3746 0 11.1772 0 11.9991Z"
          fill="#0052B4"
        />
        <path
          d="M23.7596 14.3989H0.240234C1.35206 19.8763 6.19448 23.9989 11.9999 23.9989C17.8053 23.9989 22.6477 19.8763 23.7596 14.3989Z"
          fill="#F0F0F0"
        />
        <path
          d="M0.240234 9.6H23.7597C22.6478 4.12266 17.8054 0 11.9999 0C6.19439 0 1.35206 4.12266 0.240234 9.6Z"
          fill="black"
        />
        <path
          d="M17.218 9.5995H6.7832L8.91508 8.59665L7.77981 6.53204L10.0947 6.97478L10.3882 4.63623L12.0006 6.35626L13.6131 4.63623L13.9063 6.97478L16.2214 6.53204L15.0862 8.59675L17.218 9.5995Z"
          fill="#FFDA44"
        />
        <path
          d="M0 12.0007C0 18.6281 5.37262 24.0007 12 24.0007L2.39981 4.80029C0.893062 6.80603 0 9.29898 0 12.0007Z"
          fill="#A2001D"
        />
        <path
          d="M12 23.9997C18.6274 23.9997 24 18.6271 24 11.9997C24 9.298 23.1069 6.80505 21.6002 4.79932L12 23.9997Z"
          fill="#A2001D"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33256">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagAG.displayName = "IconCountryFlagAG";

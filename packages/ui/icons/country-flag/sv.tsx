import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagSV = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagSV({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33240)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M11.9997 -0.000976562C7.24218 -0.000976562 3.13143 2.7677 1.19043 6.78165H22.8089C20.868 2.7677 16.7572 -0.000976562 11.9997 -0.000976562Z"
          fill="#0052B4"
        />
        <path
          d="M11.9997 23.9989C16.7572 23.9989 20.868 21.2303 22.809 17.2163H1.19043C3.13143 21.2303 7.24218 23.9989 11.9997 23.9989Z"
          fill="#0052B4"
        />
        <path
          d="M9.58984 12.5225L11.9997 8.34863L14.4095 12.5225H9.58984Z"
          fill="#FFDA44"
        />
        <path
          d="M15.13 13.8994L11.9996 15.4647L8.86914 13.8994V11.8125H15.13V13.8994Z"
          fill="#6DA544"
        />
        <path
          d="M14.9514 8.52734L13.8446 9.63411C14.3167 10.1062 14.6088 10.7584 14.6088 11.4787C14.6088 12.9195 13.4408 14.0874 12.0001 14.0874C10.5594 14.0874 9.39138 12.9194 9.39138 11.4787C9.39138 10.7584 9.68341 10.1062 10.1555 9.63411L9.04872 8.52734C8.29333 9.28259 7.82617 10.3261 7.82617 11.4787C7.82617 13.784 9.69489 15.6526 12.0001 15.6526C14.3052 15.6526 16.174 13.7839 16.174 11.4787C16.1739 10.3261 15.7068 9.28259 14.9514 8.52734Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33240">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagSV.displayName = "IconCountryFlagSV";

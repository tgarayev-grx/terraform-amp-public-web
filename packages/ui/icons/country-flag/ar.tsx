import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagAR = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagAR({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33371)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M12.0007 -0.000976562C7.24316 -0.000976562 3.13241 2.7677 1.19141 6.78165H22.8099C20.869 2.7677 16.7582 -0.000976562 12.0007 -0.000976562Z"
          fill="#338AF3"
        />
        <path
          d="M12.0007 23.9989C16.7582 23.9989 20.869 21.2303 22.81 17.2163H1.19141C3.13241 21.2303 7.24316 23.9989 12.0007 23.9989Z"
          fill="#338AF3"
        />
        <path
          d="M15.5864 12.0003L14.1208 12.6897L14.9012 14.109L13.3098 13.8045L13.1082 15.4122L11.9997 14.2298L10.8912 15.4122L10.6896 13.8045L9.09821 14.1089L9.87859 12.6896L8.41309 12.0003L9.87863 11.3109L9.09821 9.8916L10.6896 10.196L10.8913 8.58838L11.9997 9.77075L13.1082 8.58838L13.3098 10.196L14.9013 9.8916L14.1209 11.3109L15.5864 12.0003Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33371">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagAR.displayName = "IconCountryFlagAR";

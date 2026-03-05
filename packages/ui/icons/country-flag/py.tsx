import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagPY = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagPY({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33326)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M12.0007 0C7.24316 0 3.13241 2.76867 1.19141 6.78262H22.8099C20.869 2.76867 16.7582 0 12.0007 0Z"
          fill="#D80027"
        />
        <path
          d="M12.0007 24.0009C16.7582 24.0009 20.869 21.2322 22.81 17.2183H1.19141C3.13241 21.2322 7.24316 24.0009 12.0007 24.0009Z"
          fill="#0052B4"
        />
        <path
          d="M14.9514 8.52686L13.8446 9.63362C14.3167 10.1057 14.6088 10.7579 14.6088 11.4782C14.6088 12.919 13.4408 14.0869 12.0001 14.0869C10.5594 14.0869 9.39138 12.919 9.39138 11.4782C9.39138 10.7579 9.68341 10.1057 10.1555 9.63362L9.04872 8.52686C8.29333 9.28211 7.82617 10.3256 7.82617 11.4782C7.82617 13.7835 9.69489 15.6521 12.0001 15.6521C14.3052 15.6521 16.174 13.7834 16.174 11.4782C16.1739 10.3256 15.7068 9.28211 14.9514 8.52686Z"
          fill="#6DA544"
        />
        <path
          d="M12.0003 9.9126L12.3888 11.1084H13.6461L12.6289 11.8473L13.0175 13.043L12.0003 12.3041L10.9831 13.043L11.3716 11.8473L10.3545 11.1084H11.6117L12.0003 9.9126Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33326">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagPY.displayName = "IconCountryFlagPY";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagBF = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagBF({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33397)">
        <path
          d="M0 12C0 5.37262 5.37262 0 12 0C18.6274 0 24 5.37262 24 12C23.4783 12 12 13.5652 12 13.5652L0 12Z"
          fill="#D80027"
        />
        <path
          d="M24 12.001C24 18.6283 18.6274 24.001 12 24.001C5.37262 24.001 0 18.6283 0 12.001"
          fill="#6DA544"
        />
        <path
          d="M12.0003 7.8252L12.9067 10.6151H15.8405L13.4671 12.3394L14.3736 15.1295L12.0003 13.4052L9.62697 15.1295L10.5336 12.3394L8.16016 10.6151H11.0938L12.0003 7.8252Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33397">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagBF.displayName = "IconCountryFlagBF";

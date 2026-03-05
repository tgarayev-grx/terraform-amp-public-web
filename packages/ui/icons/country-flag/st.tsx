import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagST = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagST({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33242)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#FFDA44"
        />
        <path
          d="M7.30486 7.82611H23.2541C21.5586 3.2565 17.16 0 12.0005 0C8.68673 0 5.68706 1.34339 3.51562 3.51511L7.30486 7.82611Z"
          fill="#6DA544"
        />
        <path
          d="M7.30388 16.1743H23.2531C21.5576 20.7439 17.1591 24.0004 11.9995 24.0004C8.68576 24.0004 5.68609 22.657 3.51465 20.4853L7.30388 16.1743Z"
          fill="#6DA544"
        />
        <path
          d="M3.51471 3.51367C-1.17157 8.19995 -1.17157 15.798 3.51471 20.4843C5.45126 18.5478 7.31375 16.6853 12 11.999L3.51471 3.51367Z"
          fill="#D80027"
        />
        <path
          d="M15.2383 9.9126L15.7563 11.5069H17.4327L16.0765 12.4922L16.5945 14.0865L15.2383 13.1012L13.8821 14.0865L14.4001 12.4922L13.0439 11.5069H14.7203L15.2383 9.9126Z"
          fill="black"
        />
        <path
          d="M20.4561 9.9126L20.9741 11.5069H22.6504L21.2943 12.4922L21.8123 14.0865L20.4561 13.1012L19.0999 14.0865L19.6179 12.4922L18.2617 11.5069H19.9381L20.4561 9.9126Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33242">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagST.displayName = "IconCountryFlagST";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagKP = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagKP({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33263)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M11.9999 -0.000488281C8.36285 -0.000488281 5.10396 1.61782 2.90332 4.1734H21.0965C18.8959 1.61782 15.637 -0.000488281 11.9999 -0.000488281Z"
          fill="#0052B4"
        />
        <path
          d="M21.0965 19.8267H2.90332C5.10396 22.3822 8.36285 24.0006 11.9999 24.0006C15.637 24.0006 18.8959 22.3822 21.0965 19.8267Z"
          fill="#0052B4"
        />
        <path
          d="M22.2387 5.73877H1.76128C0.644297 7.5615 0 9.70524 0 11.9996C0 14.294 0.644297 16.4378 1.76128 18.2605H22.2387C23.3557 16.4378 24 14.294 24 11.9996C24 9.70524 23.3557 7.5615 22.2387 5.73877Z"
          fill="#D80027"
        />
        <path
          d="M7.383 16.6181C9.9331 16.6181 12.0004 14.5508 12.0004 12.0007C12.0004 9.45057 9.9331 7.3833 7.383 7.3833C4.83289 7.3833 2.76562 9.45057 2.76562 12.0007C2.76562 14.5508 4.83289 16.6181 7.383 16.6181Z"
          fill="#F0F0F0"
        />
        <path
          d="M7.38279 7.3833L8.41877 10.5718H11.7768L9.05913 12.5425L10.1032 15.7405L7.38279 13.7604L4.66648 15.7368L5.70645 12.5425L2.99121 10.5718H6.34676L7.38279 7.3833Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33263">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagKP.displayName = "IconCountryFlagKP";

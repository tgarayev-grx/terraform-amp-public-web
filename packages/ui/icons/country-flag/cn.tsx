import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagCN = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagCN({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33383)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#D80027"
        />
        <path
          d="M6.56719 7.30176L7.60313 10.4893H10.9547L8.24531 12.4627L9.28125 15.6502L6.56719 13.6814L3.85313 15.6502L4.89375 12.4627L2.17969 10.4893H5.53125L6.56719 7.30176Z"
          fill="#FFDA44"
        />
        <path
          d="M14.226 18.5848L13.4338 17.6098L12.2619 18.0645L12.9416 17.0098L12.1494 16.0301L13.3635 16.3535L14.0479 15.2988L14.1135 16.5551L15.3322 16.8785L14.1557 17.3285L14.226 18.5848Z"
          fill="#FFDA44"
        />
        <path
          d="M15.802 15.7254L16.177 14.5254L15.1504 13.7988L16.4066 13.7801L16.777 12.5801L17.1848 13.7707L18.441 13.7566L17.4332 14.5066L17.8363 15.6973L16.8098 14.9707L15.802 15.7254Z"
          fill="#FFDA44"
        />
        <path
          d="M17.9256 8.80674L17.3725 9.93643L18.2725 10.813L17.0303 10.6349L16.4771 11.7599L16.2615 10.5224L15.0146 10.3442L16.1303 9.7583L15.9146 8.51611L16.8146 9.39268L17.9256 8.80674Z"
          fill="#FFDA44"
        />
        <path
          d="M14.2592 5.38525L14.1654 6.63682L15.3326 7.11026L14.1092 7.41026L14.0201 8.66651L13.3592 7.59776L12.1357 7.89776L12.9467 6.93682L12.2811 5.87275L13.4482 6.34619L14.2592 5.38525Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33383">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagCN.displayName = "IconCountryFlagCN";

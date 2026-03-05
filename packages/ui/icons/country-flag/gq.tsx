import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagGQ = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagGQ({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33243)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M7.30486 7.82562H23.2541C21.5586 3.25601 17.16 -0.000488281 12.0005 -0.000488281C8.68673 -0.000488281 5.68706 1.3429 3.51562 3.51462L7.30486 7.82562Z"
          fill="#6DA544"
        />
        <path
          d="M7.30486 16.1743H23.2541C21.5586 20.7439 17.16 24.0004 12.0005 24.0004C8.68673 24.0004 5.68706 22.657 3.51562 20.4853L7.30486 16.1743Z"
          fill="#D80027"
        />
        <path
          d="M3.51471 3.51562C-1.17157 8.20191 -1.17157 15.7999 3.51471 20.4862C5.45126 18.5497 7.31375 16.6872 12 12.0009L3.51471 3.51562Z"
          fill="#0052B4"
        />
        <path
          d="M14.0869 9.9126V12.5213C14.0869 14.1188 16.1739 14.6083 16.1739 14.6083C16.1739 14.6083 18.2609 14.1188 18.2609 12.5213V9.9126H14.0869Z"
          fill="#DEDDE0"
        />
        <path
          d="M16.6958 12.0522H15.6523V13.5653H16.6958V12.0522Z"
          fill="#786145"
        />
        <path
          d="M17.2171 11.479C17.2171 10.9027 16.7499 10.4355 16.1736 10.4355C15.5973 10.4355 15.1301 10.9027 15.1301 11.479C14.842 11.479 14.6084 11.7126 14.6084 12.0008C14.6084 12.2889 14.842 12.5225 15.1301 12.5225C15.3012 12.5225 17.046 12.5225 17.2171 12.5225C17.5052 12.5225 17.7388 12.2889 17.7388 12.0008C17.7388 11.7126 17.5053 11.479 17.2171 11.479Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33243">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagGQ.displayName = "IconCountryFlagGQ";

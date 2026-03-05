import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagHT = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagHT({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33331)">
        <path
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37262 24 0 18.6274 0 12C0 5.37262 12 0 12 0C12 0 24 5.37262 24 12Z"
          fill="#A2001D"
        />
        <path
          d="M0 12C0 5.37262 5.37262 0 12 0C18.6274 0 24 5.37262 24 12"
          fill="#0052B4"
        />
        <path
          d="M16.174 15.1305L12.0001 14.6088L7.82617 15.1305V8.86963H16.174V15.1305Z"
          fill="#F0F0F0"
        />
        <path
          d="M12.0001 14.608C13.1527 14.608 14.087 13.6737 14.087 12.5211C14.087 11.3685 13.1527 10.4341 12.0001 10.4341C10.8475 10.4341 9.91309 11.3685 9.91309 12.5211C9.91309 13.6737 10.8475 14.608 12.0001 14.608Z"
          fill="#0052B4"
        />
        <path
          d="M12.0005 13.565C12.5768 13.565 13.044 13.0978 13.044 12.5215C13.044 11.9452 12.5768 11.478 12.0005 11.478C11.4242 11.478 10.957 11.9452 10.957 12.5215C10.957 13.0978 11.4242 13.565 12.0005 13.565Z"
          fill="#A2001D"
        />
        <path
          d="M10.4346 9.91309H13.565L11.9998 11.4783L10.4346 9.91309Z"
          fill="#6DA544"
        />
        <path
          d="M12.522 10.9556H11.4785V14.086H12.522V10.9556Z"
          fill="#FFDA44"
        />
        <path
          d="M13.6696 13.7744H10.3304L7.82617 15.131H16.174L13.6696 13.7744Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33331">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagHT.displayName = "IconCountryFlagHT";

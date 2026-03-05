import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagIL = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagIL({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33366)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M16.5173 9.39189H13.505L11.9989 6.7832L10.4928 9.39189H7.48047L8.98675 12.0006L7.48047 14.6093H10.4928L11.9989 17.2179L13.505 14.6093H16.5173L15.011 12.0006L16.5173 9.39189ZM13.8493 12.0006L12.9242 13.6031H11.0738L10.1485 12.0006L11.0737 10.398H12.9241L13.8493 12.0006ZM11.9989 8.79541L12.3432 9.39184H11.6546L11.9989 8.79541ZM9.22324 10.398H9.91192L9.56758 10.9945L9.22324 10.398ZM9.22324 13.6031L9.56763 13.0067L9.91197 13.6031H9.22324ZM11.9989 15.2057L11.6546 14.6093H12.3432L11.9989 15.2057ZM14.7746 13.6031H14.0859L14.4303 13.0067L14.7746 13.6031ZM14.0859 10.398H14.7746L14.4302 10.9945L14.0859 10.398Z"
          fill="#0052B4"
        />
        <path
          d="M19.4693 2.60889H4.5296C3.43446 3.48114 2.49527 4.54061 1.76074 5.73934H22.2382C21.5036 4.54065 20.5644 3.48114 19.4693 2.60889Z"
          fill="#0052B4"
        />
        <path
          d="M4.5296 21.3912H19.4693C20.5644 20.5189 21.5036 19.4595 22.2381 18.2607H1.76074C2.49532 19.4594 3.43451 20.5189 4.5296 21.3912Z"
          fill="#0052B4"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33366">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagIL.displayName = "IconCountryFlagIL";

import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagJE = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagJE({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33406)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M21.5209 19.3073L14.2143 12.0007H14.2142L21.5209 4.694C21.2058 4.2845 20.861 3.89052 20.486 3.51538C20.1109 3.14028 19.7169 2.79552 19.3074 2.48047L12.0007 9.78711L12.0007 9.78716L4.69405 2.48047C4.28459 2.79556 3.89056 3.14023 3.51542 3.51538C3.14028 3.89052 2.79556 4.2845 2.48052 4.694L9.78716 12.0006L9.7872 12.0006L2.48047 19.3074C2.79561 19.7169 3.14033 20.1109 3.51538 20.486C3.89052 20.8611 4.28445 21.2059 4.694 21.5209L12.0007 14.2143L12.0007 14.2142L19.3074 21.5209C19.7168 21.2058 20.1109 20.861 20.486 20.486C20.8611 20.1108 21.2058 19.7168 21.5209 19.3073Z"
          fill="#D80027"
        />
        <path
          d="M9.91309 3.65263L12.0001 4.17435L14.087 3.65263V1.87874L13.2522 2.29612L12.0001 1.04395L10.7479 2.29612L9.91309 1.87874V3.65263Z"
          fill="#FFDA44"
        />
        <path
          d="M9.91309 3.65283V4.95727C9.91309 6.55477 12.0001 7.04424 12.0001 7.04424C12.0001 7.04424 14.087 6.55472 14.087 4.95727V3.65283H9.91309Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33406">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagJE.displayName = "IconCountryFlagJE";

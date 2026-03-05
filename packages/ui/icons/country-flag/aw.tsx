import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagAW = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagAW({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33447)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#FFDA44"
        />
        <path
          d="M11.9999 24C15.637 24 18.8959 22.3817 21.0965 19.8262H2.90332C5.10396 22.3817 8.36285 24 11.9999 24Z"
          fill="#338AF3"
        />
        <path
          d="M24 12C24 5.37263 18.6274 0 12 0C5.37262 0 0 5.37263 0 12C0 13.0831 0.144375 14.1323 0.413391 15.1305H23.5867C23.8556 14.1323 24 13.0831 24 12Z"
          fill="#338AF3"
        />
        <path
          d="M0.954102 16.6963C1.18543 17.2399 1.45585 17.7626 1.76152 18.2615H22.239C22.5446 17.7626 22.8151 17.2398 23.0465 16.6963H0.954102Z"
          fill="#338AF3"
        />
        <path
          d="M5.4988 7.56916L3.1543 6.53445L5.4988 5.49973L6.53347 3.15527L7.56814 5.49973L9.9126 6.53445L7.56814 7.56916L6.53347 9.91362L5.4988 7.56916Z"
          fill="#F0F0F0"
        />
        <path
          d="M6.53326 4.44727L7.17221 5.89519L8.62018 6.53424L7.17221 7.17324L6.53326 8.62116L5.89421 7.17324L4.44629 6.53424L5.89421 5.89519L6.53326 4.44727Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33447">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagAW.displayName = "IconCountryFlagAW";

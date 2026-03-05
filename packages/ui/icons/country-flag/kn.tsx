import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagKN = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagKN({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33246)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37257 18.6274 0 12 0C5.37257 0 0 5.37257 0 12C0 18.6274 5.37257 24 12 24Z"
          fill="#FFDA44"
        />
        <path
          d="M3.51539 20.485C4.01878 20.9884 4.55593 21.4374 5.11932 21.8326L21.8335 5.11844C21.4383 4.555 20.9893 4.0179 20.4859 3.51451C19.9825 3.01112 19.4454 2.56229 18.882 2.16699L2.16797 18.8812C2.56313 19.4446 3.012 19.9816 3.51539 20.485Z"
          fill="black"
        />
        <path
          d="M3.51426 3.51463C-0.271509 7.3004 -0.998308 12.986 1.33251 17.502L17.5016 1.33297C12.9856 -0.997801 7.2999 -0.271002 3.51426 3.51463Z"
          fill="#6DA544"
        />
        <path
          d="M20.4855 20.4849C24.2712 16.6993 24.998 11.0136 22.6673 6.49756L6.49805 22.6667C11.0141 24.9975 16.6997 24.2707 20.4855 20.4849Z"
          fill="#D80027"
        />
        <path
          d="M7.62971 14.158L8.74993 14.7288L9.63896 13.8398L9.44228 15.0815L10.5624 15.6524L9.32068 15.849L9.12399 17.0908L8.55324 15.9705L7.31152 16.1672L8.20051 15.2782L7.62971 14.158Z"
          fill="#F0F0F0"
        />
        <path
          d="M14.1561 7.63069L15.2763 8.20149L16.1653 7.3125L15.9686 8.55417L17.0888 9.12502L15.8471 9.3217L15.6504 10.5634L15.0796 9.44325L13.8379 9.63989L14.7269 8.75091L14.1561 7.63069Z"
          fill="#F0F0F0"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33246">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagKN.displayName = "IconCountryFlagKN";

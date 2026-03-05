import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagTZ = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagTZ({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33286)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#FFDA44"
        />
        <path
          d="M3.51446 20.4856C4.01785 20.989 4.55495 21.4379 5.11834 21.8331L21.8326 5.11887C21.4374 4.55548 20.9884 4.01839 20.485 3.515C19.9816 3.01161 19.4446 2.56273 18.8812 2.16748L2.16699 18.8817C2.56215 19.445 3.01112 19.9821 3.51446 20.4856Z"
          fill="black"
        />
        <path
          d="M3.51422 3.51368C-0.271495 7.29949 -0.998292 12.985 1.33247 17.5011L17.5016 1.33198C12.9856 -0.99879 7.29999 -0.271947 3.51422 3.51368Z"
          fill="#6DA544"
        />
        <path
          d="M20.4854 20.485C24.2711 16.6992 24.9979 11.0136 22.6672 6.49756L6.49805 22.6667C11.014 24.9975 16.6996 24.2707 20.4854 20.485Z"
          fill="#338AF3"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33286">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagTZ.displayName = "IconCountryFlagTZ";

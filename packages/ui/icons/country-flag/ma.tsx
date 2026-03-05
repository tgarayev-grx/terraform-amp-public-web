import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagMA = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagMA({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33269)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#D80027"
        />
        <path
          d="M19.0924 9.84763H13.6749L12.0008 4.69531L10.3267 9.84763H4.90918L9.29204 13.0319L7.6179 18.1844L12.0008 15L16.3837 18.1844L14.7096 13.032L19.0924 9.84763ZM10.5187 12.6334L11.0848 10.8911H12.9167L13.4829 12.6334V12.6334L12.0008 13.7102L10.5188 12.6334L10.5187 12.6334ZM12.5777 9.84763H11.4239L12.0008 8.072L12.5777 9.84763ZM14.3705 11.9885L14.0139 10.8911H15.8809L14.3705 11.9885ZM9.98766 10.8911L9.63109 11.9885L8.12063 10.8911H9.98766ZM9.60273 15.4525L10.1797 13.6769L11.1132 14.3551L9.60273 15.4525ZM12.8884 14.3552L13.8219 13.677L14.3989 15.4526L12.8884 14.3552Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33269">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagMA.displayName = "IconCountryFlagMA";

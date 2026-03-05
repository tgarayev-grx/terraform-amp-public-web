import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagVC = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagVC({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33234)">
        <path
          d="M17.7395 1.45957C16.0346 0.529379 14.0793 0.000488281 12.0004 0.000488281C9.92149 0.000488281 7.96615 0.529379 6.26126 1.45957L5.21777 12.0005L6.26126 22.5414C7.96615 23.4716 9.92149 24.0005 12.0004 24.0005C14.0793 24.0005 16.0346 23.4716 17.7395 22.5414L18.783 12.0005L17.7395 1.45957Z"
          fill="#FFDA44"
        />
        <path
          d="M6.26086 22.5408V1.45898C2.53073 3.4943 0 7.45144 0 12C0 16.5485 2.53073 20.5056 6.26086 22.5408Z"
          fill="#338AF3"
        />
        <path
          d="M24.0001 12C24.0001 7.45144 21.4694 3.4943 17.7393 1.45898V22.5408C21.4694 20.5056 24.0001 16.5485 24.0001 12Z"
          fill="#6DA544"
        />
        <path
          d="M9.3917 15.1296L7.30469 11.9991L9.39166 8.86865L11.4787 11.9991L9.3917 15.1296Z"
          fill="#6DA544"
        />
        <path
          d="M14.6094 15.1296L12.5225 11.9991L14.6094 8.86865L16.6964 11.9991L14.6094 15.1296Z"
          fill="#6DA544"
        />
        <path
          d="M12.001 19.3034L9.91406 16.1729L12.001 13.0425L14.088 16.1729L12.001 19.3034Z"
          fill="#6DA544"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33234">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagVC.displayName = "IconCountryFlagVC";

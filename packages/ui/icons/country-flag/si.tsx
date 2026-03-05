import { forwardRef } from "react";
import type { SVGProps } from "react";
import clsx from "clsx";

export const IconCountryFlagSI = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function IconCountryFlagSI({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      className={clsx("shrink-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_161_33416)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#F0F0F0"
        />
        <path
          d="M23.2536 7.82625H10.4348V4.6958H4.17389V7.82625H0.746391C0.264047 9.12619 0 10.5323 0 12.0001C0 13.468 0.264047 14.874 0.746391 16.174L12 17.2175L23.2536 16.174C23.736 14.874 24 13.468 24 12.0001C24 10.5323 23.736 9.12619 23.2536 7.82625Z"
          fill="#0052B4"
        />
        <path
          d="M11.9997 23.9995C17.1593 23.9995 21.5578 20.743 23.2533 16.1733H0.746094C2.44161 20.743 6.84012 23.9995 11.9997 23.9995Z"
          fill="#D80027"
        />
        <path
          d="M4.17383 7.82641V8.86984C4.17383 11.2661 7.30428 12.0003 7.30428 12.0003C7.30428 12.0003 10.4347 11.2661 10.4347 8.86984V7.82641L9.39125 8.86989L7.30428 7.30469L5.21731 8.86989L4.17383 7.82641Z"
          fill="#F0F0F0"
        />
      </g>
      <defs>
        <clipPath id="clip0_161_33416">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
IconCountryFlagSI.displayName = "IconCountryFlagSI";

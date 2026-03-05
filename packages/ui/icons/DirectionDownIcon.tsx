import type { SVGProps } from "react";

/** Chevron/arrow pointing down. Use for dropdowns or expand indicators. */
export function DirectionDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.775 7.84595C14.0445 7.63031 14.4383 7.67406 14.6539 7.9436C14.8695 8.21314 14.8258 8.60688 14.5562 8.82251L10.3637 12.5009C10.1354 12.6835 9.8107 12.6835 9.58244 12.5009L5.44165 8.82251C5.17211 8.60688 5.12836 8.21314 5.34399 7.9436C5.55962 7.67406 5.95336 7.63031 6.2229 7.84595L9.97306 11.2118L13.775 7.84595Z"
        fill="currentColor"
      />
    </svg>
  );
}

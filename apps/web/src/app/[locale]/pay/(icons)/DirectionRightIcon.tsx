import type { SVGProps } from "react";

/** Chevron/arrow pointing right. Use for list item navigation (e.g. FAQ list). */
export function DirectionRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.84399 6.22307C7.62836 5.95353 7.67211 5.55979 7.94165 5.34416C8.21119 5.12853 8.60492 5.17228 8.82055 5.44182L12.4991 9.60848C12.6817 9.83674 12.6817 10.1615 12.4991 10.3897L8.82056 14.5564C8.60492 14.8259 8.21119 14.8697 7.94165 14.6541C7.67211 14.4384 7.62836 14.0447 7.84399 13.7751L11.21 9.99911L7.84399 6.22307Z"
        fill="currentColor"
      />
    </svg>
  );
}

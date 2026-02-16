import type { SVGProps } from "react";

/** Thin vertical line. Use as a visual separator (e.g. between nav items). */
export function VerticalDividerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 0.5L0.499999 15.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

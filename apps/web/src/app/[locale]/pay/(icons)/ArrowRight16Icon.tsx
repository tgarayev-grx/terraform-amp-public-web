import type { SVGProps } from "react";

/** Small arrow pointing right (16×16). Use for compact links or list items. */
export function ArrowRight16Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 7.49939L10.793 7.49939L8.97982 5.68624C8.78456 5.49097 8.78456 5.17447 8.97982 4.9792C9.17508 4.78394 9.49159 4.78394 9.68685 4.9792L12.3535 7.64587L12.388 7.68363C12.5482 7.88002 12.5366 8.16983 12.3535 8.3529L9.68685 11.0196C9.49159 11.2148 9.17508 11.2148 8.97982 11.0196C8.78455 10.8243 8.78455 10.5078 8.97982 10.3125L10.793 8.49939L4 8.49939C3.72386 8.49939 3.5 8.27553 3.5 7.99939C3.5 7.72324 3.72386 7.49939 4 7.49939Z"
        fill="currentColor"
      />
    </svg>
  );
}

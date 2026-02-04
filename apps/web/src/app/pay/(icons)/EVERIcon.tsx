import type { SVGProps } from "react";

export function EVERIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <g clipPath="url(#clip0_14_57865)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.4492 31.1118L26.6665 24.941V13.334L15.0595 13.334L8.88867 19.5562H20.4442L20.4492 31.1118Z"
          fill="#6347F5"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_57865">
          <rect
            width="17.7778"
            height="17.7778"
            fill="white"
            transform="translate(8.88867 13.334)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

import type { SVGProps } from "react";

export function EURIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="48" cy="48" r="48" fill="#F1FFF9" />
      <circle cx="48" cy="48" r="32" fill="#1DD98A" />
      <circle
        cx="48"
        cy="48"
        r="32"
        fill="url(#paint0_linear_14_57848)"
        fillOpacity="0.2"
      />
      <path
        d="M50.3669 58.0247C46.161 58.0247 42.5091 55.6405 40.6874 52.1481H50.3669V48.7901H39.5961C39.5121 48.2444 39.4534 47.6819 39.4534 47.1111C39.4534 46.5403 39.5122 45.9778 39.5961 45.4321H50.3669V42.0741H40.6874C42.5091 38.5818 46.1525 36.1975 50.3669 36.1975C53.0785 36.1975 55.555 37.1881 57.4607 38.8252L60.441 35.8618C57.7713 33.4692 54.237 32 50.3669 32C43.7936 32 38.2109 36.2059 36.1373 42.0741H30.2188V45.4321H35.3565C35.2894 45.9862 35.2558 46.5403 35.2558 47.1111C35.2558 47.6819 35.2894 48.236 35.3565 48.7901H30.2188V52.1481H36.1373C38.2109 58.0163 43.7936 62.2222 50.3669 62.2222C54.237 62.2222 57.7713 60.7531 60.441 58.3605L57.4607 55.3886C55.555 57.0257 53.0785 58.0247 50.3669 58.0247Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_14_57848"
          x1="52.5"
          y1="80"
          x2="48"
          y2="33.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}

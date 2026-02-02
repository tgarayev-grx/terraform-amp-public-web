import type { SVGProps } from "react";

export function WAVESIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#002FFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4444 11.6669C19.7513 11.3601 20.2487 11.3601 20.5556 11.6669L28.0869 19.1982C28.3937 19.505 28.3937 20.0025 28.0869 20.3093L20.5556 27.8406C20.2487 28.1474 19.7513 28.1474 19.4444 27.8406L11.9131 20.3093C11.6063 20.0025 11.6063 19.505 11.9131 19.1982L19.4444 11.6669Z"
        fill="white"
      />
    </svg>
  );
}

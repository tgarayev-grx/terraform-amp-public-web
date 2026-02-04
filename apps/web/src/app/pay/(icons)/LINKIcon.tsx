import type { SVGProps } from "react";

export function LINKIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#2A5ADA" />
      <path
        d="M20.0002 10L18.119 11.042L12.9926 13.8963L11.1113 14.9383V24.8148L12.9926 25.8568L18.166 28.7111L20.0472 29.7531L21.9285 28.7111L27.0079 25.8568L28.8891 24.8148V14.9383L27.0079 13.8963L21.8815 11.042L20.0002 10ZM14.8738 22.7308V17.0223L20.0002 14.1681L25.1266 17.0223V22.7308L20.0002 25.585L14.8738 22.7308Z"
        fill="white"
      />
    </svg>
  );
}

import type { SVGProps } from "react";

export function XRPIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#303030" />
      <path
        d="M26.2849 12.2227H28.8562L23.5066 17.5503C21.5702 19.4788 18.4305 19.4788 16.4941 17.5503L11.1445 12.2227H13.7158L17.7797 16.2699C19.0061 17.4913 20.9945 17.4913 22.221 16.2699L26.2849 12.2227Z"
        fill="white"
      />
      <path
        d="M13.6826 27.0374H11.1113L16.4939 21.6769C18.4304 19.7483 21.57 19.7483 23.5065 21.6769L28.8891 27.0374H26.3178L22.2208 22.9572C20.9944 21.7358 19.006 21.7358 17.7796 22.9572L13.6826 27.0374Z"
        fill="white"
      />
    </svg>
  );
}

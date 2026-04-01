"use client";

export type FileFormatIconProps = {
  filename: string;
  className?: string;
};

export function FileFormatIcon({ filename, className }: FileFormatIconProps) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const label = ext === "docx" ? "doc" : ext || "file";
  const badgeColor =
    ext === "pdf" ? "var(--color-red-600)" : "var(--color-blue-600)";

  return (
    <svg
      aria-label={`${label.toUpperCase()} file`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
    >
      <g clipPath="url(#file-format-clip)">
        {/* Document body */}
        <path
          d="M11 0.75H27.3535L38.25 11.7373V34C38.25 36.8995 35.8995 39.25 33 39.25H11C8.10051 39.25 5.75 36.8995 5.75 34V6C5.75 3.10051 8.10051 0.75 11 0.75Z"
          stroke="var(--color-neutral-700)"
          strokeWidth="1.5"
        />
        <path
          d="M27 0L39 12H31C28.7909 12 27 10.2091 27 8V0Z"
          fill="var(--color-neutral-700)"
        />
        {/* Badge background */}
        <path
          d="M1 22C1 19.7909 2.79086 18 5 18H29C31.2091 18 33 19.7909 33 22V30C33 32.2091 31.2091 34 29 34H5C2.79086 34 1 32.2091 1 30V22Z"
          fill={badgeColor}
        />
        {/* Badge label — rendered as text so it works for any extension */}
        <text
          x="17"
          y="26"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-neutral)"
          fontSize="9"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.3"
        >
          {label.toUpperCase()}
        </text>
      </g>
      <defs>
        <clipPath id="file-format-clip">
          <rect width="40" height="40" fill="var(--color-neutral)" />
        </clipPath>
      </defs>
    </svg>
  );
}

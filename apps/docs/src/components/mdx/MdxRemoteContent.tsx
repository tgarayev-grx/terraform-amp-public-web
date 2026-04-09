"use client";

import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import clsx from "clsx";
import { Alert } from "@grx/ui/components/alert/Alert";

import { CodeGroup } from "@/components/mdx/CodeGroup";
import { CodeGroupStateProvider } from "@/components/mdx/CodeGroupState";

export type MdxRemoteContentProps = {
  source: MDXRemoteSerializeResult;
  components?: ComponentProps<typeof MDXRemote>["components"];
};

function isExternalHref(href: string | undefined): boolean {
  return !!href && (href.startsWith("http") || href.startsWith("//"));
}

function Heading({
  as: As,
  className,
  children,
  ...props
}: {
  as: "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
  id?: string;
}) {
  const id = (props as { id?: string }).id;
  return (
    <As
      {...props}
      className={clsx("group text-text-strong-1000 scroll-mt-24", className)}
    >
      {children}

      {!!id && (
        <a
          href={`#${id}`}
          aria-label="Anchor link"
          className="inline-flex opacity-0 group-hover:opacity-100 ml-2 text-text-subtle-700 hover:text-text-strong-1000 transition"
        >
          #
        </a>
      )}
    </As>
  );
}

export function MdxRemoteContent({
  source,
  components,
}: MdxRemoteContentProps) {
  return (
    <CodeGroupStateProvider>
      <div className="[&>*:first-child]:mt-0 h-full max-h-full">
        <MDXRemote
          {...source}
          components={{
            Alert,
            CodeGroup,
            p: ({ children }) => (
              <p
                className={clsx(
                  "mb-4 last:mb-0 text-body-md-regular text-text-subtle-700 leading-7",
                  "[&:has(+_ul)]:mb-0 [&:has(+_ol)]:mb-0"
                )}
              >
                {children}
              </p>
            ),
            h2: (p) => (
              <Heading
                as="h2"
                {...p}
                className={clsx(
                  "mt-10 first:mt-0 mb-4 text-title-md-semibold tracking-tight",
                  p.className
                )}
              />
            ),
            h3: (p) => (
              <Heading
                as="h3"
                {...p}
                className={clsx(
                  "mt-8 first:mt-0 mb-3 text-title-sm-semibold tracking-tight",
                  p.className
                )}
              />
            ),
            h4: (p) => (
              <Heading
                as="h4"
                {...p}
                className={clsx(
                  "mt-6 first:mt-0 mb-2 text-body-md-semibold",
                  p.className
                )}
              />
            ),
            strong: ({ children }) => (
              <strong className="text-body-md-semibold text-text-strong-1000">
                {children}
              </strong>
            ),
            a: ({ href, children, ...rest }) => {
              const external = isExternalHref(href);
              return (
                <a
                  {...rest}
                  href={href}
                  className="text-text-subtle-700 hover:text-text-strong-1000 underline underline-offset-4"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              );
            },
            img: ({ className, alt, ...rest }: ComponentProps<"img">) => (
              // MDX/markdown images usually omit width/height; <img> preserves intrinsic aspect ratio.
              // eslint-disable-next-line @next/next/no-img-element -- see above
              <img
                className={clsx(
                  "rounded-lg w-full max-w-full max-h-[400px] object-contain object-left",
                  className
                )}
                alt={alt ?? ""}
                decoding="async"
                loading="lazy"
                {...rest}
              />
            ),
            ul: ({ children }) => (
              <ul
                className={clsx(
                  "space-y-2 my-4 pl-5 text-text-subtle-700 list-disc",
                  "[p+&]:mt-0"
                )}
              >
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol
                className={clsx(
                  "space-y-2 my-4 pl-5 text-text-subtle-700 list-decimal",
                  "[p+&]:mt-0"
                )}
              >
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-stroke-soft-200 my-5 pl-4 border-l-2 text-text-subtle-700">
                {children}
              </blockquote>
            ),
            hr: () => null,
            table: ({ children }) => (
              <div
                className={clsx(
                  "mt-2 mb-6 border rounded-lg w-full overflow-x-auto",
                  "border-stroke-soft-200"
                )}
              >
                <table className={clsx("w-full border-collapse", "text-sm")}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-bg-muted-50">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr
                className={clsx(
                  "last:border-0 border-b",
                  "border-stroke-soft-200"
                )}
              >
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th
                className={clsx(
                  "relative px-4 py-4 text-left whitespace-nowrap",
                  "[&:not(:last-child)]:after:top-4 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:bottom-4 [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-stroke-soft-200",
                  "text-body-md-semibold text-text-strong-1000"
                )}
              >
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td
                className={clsx(
                  "px-4 py-4 first:w-[160px] [&:nth-child(2)]:w-[160px] align-top",
                  "text-body-md-regular",
                  "text-text-subtle-700"
                )}
              >
                {children}
              </td>
            ),
            ...components,
          }}
        />
      </div>
    </CodeGroupStateProvider>
  );
}

MdxRemoteContent.displayName = "MdxRemoteContent";

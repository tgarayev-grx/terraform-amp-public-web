import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import clsx from "clsx";

export const baseLegalComponents: Components = {
  p: ({ children }) => (
    <p className="mb-4 last:mb-0 text-body-lg-regular text-text-subtle-700">
      {children}
    </p>
  ),

  h2: ({ children }) => (
    <h2 className="mt-10 first:mt-0 mb-4 text-text-strong-1000 text-title-lg">
      {children}
    </h2>
  ),

  strong: ({ children }) => (
    <strong className="text-body-lg-semibold text-text-strong-1000">
      {children}
    </strong>
  ),

  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http") || href?.startsWith("//");
    return (
      <a
        className="text-info-base-600 hover:text-info-subtle-500"
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },

  ul: ({ children }) => (
    <ul className="space-y-2 my-4 pl-5 text-text-subtle-700 list-disc">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="space-y-2 my-4 pl-5 text-text-subtle-700 list-decimal">
      {children}
    </ol>
  ),

  li: ({ children }) => <li className="pl-1">{children}</li>,

  hr: () => null,
};

export const baseLegalTableComponents: Components = {
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
  thead: ({ children }) => <thead className="bg-bg-muted-50">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className={clsx("last:border-0 border-b", "border-stroke-soft-200")}>
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
};

type LegalMarkdownProps = {
  content: string;
  components?: Components;
};

export function LegalMarkdown({ content, components }: LegalMarkdownProps) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ...baseLegalComponents,
          ...baseLegalTableComponents,
          ...components,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

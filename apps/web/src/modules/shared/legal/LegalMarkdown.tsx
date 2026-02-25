import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const linkClassName = "text-blue-600 hover:text-blue-500 underline";

export const baseLegalComponents: Components = {
  p: ({ children }) => (
    <p className="text-base text-neutral-700 leading-6 mb-4 last:mb-0">
      {children}
    </p>
  ),

  h2: ({ children }) => (
    <h2 className="font-bold text-2xl leading-7 text-neutral-1000 mt-10 mb-4 first:mt-0">
      {children}
    </h2>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-neutral-1000">{children}</strong>
  ),

  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http") || href?.startsWith("//");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={linkClassName}
      >
        {children}
      </a>
    );
  },

  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 my-4">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 my-4">{children}</ol>
  ),

  li: ({ children }) => <li className="pl-1">{children}</li>,

  hr: () => null,
};

export const baseLegalTableComponents: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 my-2 w-full">
      <table className="w-full border-collapse text-sm text-neutral-600">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-neutral-100">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-neutral-200 last:border-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="relative text-left font-semibold text-[14px] leading-5 text-neutral-1000 px-4 py-4 whitespace-nowrap [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:top-4 [&:not(:last-child)]:after:bottom-4 [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-neutral-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-4 text-[14px] leading-5 align-top first:w-[160px] [&:nth-child(2)]:w-[160px]">
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

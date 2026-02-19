import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const linkClassName = "text-blue-600 hover:text-blue-500 underline";

type PrivacyMarkdownProps = {
  content: string;
};

export function PrivacyMarkdown({ content }: PrivacyMarkdownProps) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
            <strong className="font-semibold text-neutral-1000">
              {children}
            </strong>
          ),
          a: ({ href, children }) => {
            const isExternal =
              href?.startsWith("http") || href?.startsWith("//");
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
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-2 my-4">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          hr: () => null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

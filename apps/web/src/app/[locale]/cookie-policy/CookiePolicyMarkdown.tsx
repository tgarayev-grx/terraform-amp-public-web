"use client";

import type { Components } from "react-markdown";
import { useCookiePreferences } from "@/modules/cross-cutting-concerns/cookie-preference/CookiePersist";
import { ManageCookiesModal } from "@/modules/cross-cutting-concerns/cookie-preference/CookieBanner";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import {
  LegalMarkdown,
  baseLegalComponents,
  baseLegalTableComponents,
} from "@/modules/shared/legal/LegalMarkdown";

const linkClassName =
  "text-blue-600 hover:text-blue-500 underline transition-colors duration-150";

type CookiePolicyMarkdownProps = {
  content: string;
};

function cookieOverrides(
  cookiePreferences: ReturnType<typeof useCookiePreferences>
): Components {
  return {
    a: ({ href, children }) => {
      if (href === "#cookie-settings") {
        return (
          <ManageCookiesModal cookiePreferences={cookiePreferences}>
            <button className={linkClassName}>{children}</button>
          </ManageCookiesModal>
        );
      }
      const isExternal = href?.startsWith("http") || href?.startsWith("//");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href ?? "#"} className={linkClassName}>
          {children}
        </Link>
      );
    },
  };
}

export function CookiePolicyMarkdown({ content }: CookiePolicyMarkdownProps) {
  const cookiePreferences = useCookiePreferences();
  return (
    <LegalMarkdown
      content={content}
      components={{
        ...baseLegalComponents,
        ...baseLegalTableComponents,
        ...cookieOverrides(cookiePreferences),
      }}
    />
  );
}

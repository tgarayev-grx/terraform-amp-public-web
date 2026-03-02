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
            <button className="text-info-base-600 hover:text-info-subtle-500">
              {children}
            </button>
          </ManageCookiesModal>
        );
      }
      const isExternal = href?.startsWith("http") || href?.startsWith("//");
      if (isExternal) {
        return (
          <a
            className="text-info-base-600 hover:text-info-subtle-500"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          className="text-info-base-600 hover:text-info-subtle-500"
          href={href ?? "#"}
        >
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

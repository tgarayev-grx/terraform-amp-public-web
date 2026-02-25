import type { Metadata } from "next";
import { getLegalPageMetadata, LegalPage } from "@/modules/shared/legal";
import { CookiePolicyMarkdown } from "./CookiePolicyMarkdown";

const CONFIG = {
  contentDir: "content/cookie-policy",
  namespace: "Pay.CookiePolicy" as const,
};

export async function generateMetadata(): Promise<Metadata> {
  return getLegalPageMetadata(CONFIG);
}

export default async function CookiePolicyPage() {
  return <LegalPage config={CONFIG} MarkdownComponent={CookiePolicyMarkdown} />;
}

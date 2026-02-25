import type { Metadata } from "next";
import { getLegalPageMetadata, LegalPage } from "@/modules/shared/legal";

const CONFIG = {
  contentDir: "content/terms-of-use",
  namespace: "Pay.TermsOfUse" as const,
};

export async function generateMetadata(): Promise<Metadata> {
  return getLegalPageMetadata(CONFIG);
}

export default async function TermsOfUsePage() {
  return <LegalPage config={CONFIG} />;
}

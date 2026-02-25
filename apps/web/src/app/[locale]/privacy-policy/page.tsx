import type { Metadata } from "next";
import { getLegalPageMetadata, LegalPage } from "@/modules/shared/legal";

const CONFIG = {
  contentDir: "content/privacy-policy",
  namespace: "Pay.PrivacyPolicy" as const,
};

export async function generateMetadata(): Promise<Metadata> {
  return getLegalPageMetadata(CONFIG);
}

export default async function PrivacyPolicyPage() {
  return <LegalPage config={CONFIG} />;
}

import type { Metadata } from "next";
import { getLegalPageMetadata, LegalPage } from "@/modules/shared/legal";

const CONFIG = {
  contentDir: "content/aml-policy",
  namespace: "Pay.AmlPolicy",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return getLegalPageMetadata(CONFIG);
}

export default async function AmlPolicyPage() {
  return <LegalPage config={CONFIG} />;
}

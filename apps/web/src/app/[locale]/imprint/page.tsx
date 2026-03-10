import type { Metadata } from "next";
import { getLegalPageMetadata, LegalPage } from "@/modules/shared/legal";

const CONFIG = {
  contentDir: "content/imprint",
  namespace: "Pay.Imprint",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return getLegalPageMetadata(CONFIG);
}

export default async function ImprintPage() {
  return <LegalPage config={CONFIG} />;
}

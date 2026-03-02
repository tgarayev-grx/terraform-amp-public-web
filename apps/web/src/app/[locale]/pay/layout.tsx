import { ReactNode } from "react";
import { ProductSubHeader } from "@/modules/shared/header";

const GRX_PAY_SUB_NAV_ITEMS = [
  {
    labelKey: "ProductSubHeader.overview" as const,
    href: "/pay/",
    exact: true,
  },
  { labelKey: "ProductSubHeader.pricing" as const, href: "/pay/pricing" },
  {
    labelKey: "ProductSubHeader.partners" as const,
    href: "/pay/partner-program",
  },
  { labelKey: "ProductSubHeader.faq" as const, href: "/pay/faq" },
  { labelKey: "ProductSubHeader.aboutProduct" as const, href: "/pay/about-us" },
];

export default function PayLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProductSubHeader productName="GRX Pay" items={GRX_PAY_SUB_NAV_ITEMS} />

      {children}
    </>
  );
}

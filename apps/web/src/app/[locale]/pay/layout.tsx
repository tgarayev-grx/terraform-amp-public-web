import { ReactNode } from "react";
import { ProductSubHeader } from "@/modules/shared/header";
import { ROUTES } from "@/modules/shared/header/routes";

const GRX_PAY_SUB_NAV_ITEMS = [
  {
    labelKey: "ProductSubHeader.forMerchants" as const,
    href: ROUTES.pay,
    exact: true,
  },
  { labelKey: "ProductSubHeader.pricing" as const, href: ROUTES.payPricing },
];

export default function PayLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProductSubHeader productName="GRX Pay" items={GRX_PAY_SUB_NAV_ITEMS} />

      {children}
    </>
  );
}

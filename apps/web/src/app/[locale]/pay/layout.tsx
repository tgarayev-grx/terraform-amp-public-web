import { ReactNode } from "react";
import { ProductHeader } from "@/modules/shared/header";

export default function PayLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProductHeader productName="GRX Pay" productSlug="pay" />

      {children}
    </>
  );
}

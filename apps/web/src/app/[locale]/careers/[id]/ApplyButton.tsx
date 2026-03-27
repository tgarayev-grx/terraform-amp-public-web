"use client";

import { useTranslations } from "next-intl";

export function ApplyButton() {
  const t = useTranslations();

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("reveal-apply-form"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex shrink-0 items-center justify-center self-start rounded-[var(--md-10,10px)] bg-white px-[var(--400,16px)] py-[var(--250,10px)] font-['Nunito_Sans',sans-serif] text-[16px] font-semibold leading-[24px] text-[#0a0a0a] transition-opacity hover:opacity-90"
      style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
    >
      {t("CareersPage.jobDetail.applyButton")}
    </button>
  );
}

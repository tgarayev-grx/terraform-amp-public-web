"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@grx/ui";
import { ApplicationForm } from "@/modules/careers";

type ApplySectionProps = {
  vacancyId: number;
  vacancyName: string;
};

export function ApplySection({ vacancyId, vacancyName }: ApplySectionProps) {
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    const handler = () => handleApplyClick();
    window.addEventListener("reveal-apply-form", handler);
    return () => window.removeEventListener("reveal-apply-form", handler);
  }, []);

  if (!showForm) {
    return (
      <div className="flex flex-col gap-[var(--400,16px)] items-start">
        <Button
          variant="primary"
          size="lg"
          onClick={handleApplyClick}
          className="self-start"
        >
          {t("CareersPage.jobDetail.applyButton")}
        </Button>
        <p
          className="font-['Nunito_Sans',sans-serif] text-[12px] font-medium leading-[16px] text-text-soft-500"
          style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
        >
          {t("CareersPage.jobDetail.applySection.subtitle")}
        </p>
      </div>
    );
  }

  return (
    <section ref={formRef} id="apply" aria-labelledby="apply-heading">
      <h2
        id="apply-heading"
        className="mb-10 font-['Nunito_Sans',sans-serif] text-[24px] font-bold leading-[28px] text-text-strong-1000"
        style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
      >
        {t("CareersPage.jobDetail.applySection.title")}
      </h2>

      <ApplicationForm vacancyId={vacancyId} vacancyName={vacancyName} />
    </section>
  );
}

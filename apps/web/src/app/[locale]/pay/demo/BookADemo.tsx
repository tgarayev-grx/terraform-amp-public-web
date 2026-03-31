import { getTranslations } from "next-intl/server";
import { StepCard } from "../partner-program/HowItWorks";
import { BookDemoForm } from "@/modules/book-demo/BookDemoForm";
import { CubeIcon } from "@grx/ui/icons/CubeIcon";
import { ShieldIcon } from "@grx/ui/icons/ShieldIcon";
import { GlobeIcon } from "@grx/ui/icons/GlobeIcon";

export async function BookDemoSection() {
  const t = await getTranslations("BookDemo");
  return (
    <section className="flex flex-col items-center bg-surface-floating px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto font-bounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("section.title")}
          </h3>
          <h4 className="mx-auto max-w-[580px] text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
            {t("section.subtitle")}
          </h4>
        </div>

        <div className="gap-[80px] xl:gap-[120px] grid grid-cols-1 xl:grid-cols-2">
          <div className="flex flex-col gap-12">
            <StepCard
              number={
                <CubeIcon
                  width={56}
                  height={56}
                  className="text-icon-base-500"
                />
              }
              title={t("steps.complianceFirst.title")}
              description={t("steps.complianceFirst.description")}
            />
            <StepCard
              number={
                <ShieldIcon
                  width={56}
                  height={56}
                  className="text-icon-base-500"
                />
              }
              title={t("steps.securityInfrastructure.title")}
              description={t("steps.securityInfrastructure.description")}
            />
            <StepCard
              number={
                <GlobeIcon
                  width={56}
                  height={56}
                  className="text-icon-base-500"
                />
              }
              title={t("steps.globalScale.title")}
              description={t("steps.globalScale.description")}
              isLast
            />
          </div>

          <BookDemoForm />
        </div>
      </div>
    </section>
  );
}

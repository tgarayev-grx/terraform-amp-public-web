import { getTranslations } from "next-intl/server";
import { Badge } from "@grx/ui";
import { ArrowRightIcon } from "@grx/ui/icons/ArrowRightIcon";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";

const VASP_LEARN_MORE_URL =
  "https://www.fsc.bg/registri-i-spravki/registar-po-paragraf-5-al-3-ot-zakona-za-pazarite-na-kriptoaktivi/";

export async function ComplianceSection() {
  const t = await getTranslations("AboutUsPage.compliance");

  return (
    <section className="bg-bg-muted-50 py-24 px-4 md:px-8">
      <div className="max-w-[1180px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-4 text-center max-w-[780px] mx-auto">
          <h2 className="font-bounded text-display-sm text-text-strong-1000 md:text-display-md">
            {t("title")}
          </h2>
          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("subtitle")}
          </p>
        </div>

        <div className="border border-stroke-soft-200 rounded-2xl p-8 md:p-10 flex flex-col gap-16 md:gap-20 max-w-[980px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-5">
            <div className="shrink-0 md:w-[280px]">
              <h3 className="text-heading-h4 text-text-strong-1000 font-bold">
                {t("vasp.title")}
              </h3>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p className="text-body-xl-regular text-text-subtle-700">
                {t("vasp.description")}
              </p>
              <Link
                href={VASP_LEARN_MORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-body-lg-semibold text-text-strong-1000 hover:underline underline-offset-2 self-start border-b border-stroke-base-300 pb-0.5 -mb-0.5"
              >
                {t("learnMore")}
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-5">
            <div className="shrink-0 md:w-[280px] flex flex-col gap-2.5">
              <h3 className="text-heading-h4 text-text-strong-1000 font-bold flex items-center gap-2 flex-wrap">
                <span>{t("mica.titlePart1")}</span>
                <Badge size="sm" palette="warning" variant="light">
                  {t("upcoming")}
                </Badge>
                <span>{t("mica.titlePart2")}</span>
              </h3>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-xl-regular text-text-subtle-700">
                {t("mica.description")}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-5">
            <div className="shrink-0 md:w-[280px]">
              <h3 className="text-heading-h4 text-text-strong-1000 font-bold">
                {t("aml.title")}
              </h3>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p className="text-body-xl-regular text-text-subtle-700">
                {t("aml.description")}
              </p>
              <Link
                href={ROUTES.amlPolicy}
                className="inline-flex items-center gap-1.5 text-body-lg-semibold text-text-strong-1000 hover:underline underline-offset-2 self-start border-b border-stroke-base-300 pb-0.5 -mb-0.5"
              >
                {t("learnMore")}
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

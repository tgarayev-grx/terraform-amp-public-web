import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HurmaClient } from "@/modules/careers";
import { ApplySection } from "./ApplySection";
import { ApplyButton } from "./ApplyButton";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { LegalMarkdown } from "@/modules/shared/legal/LegalMarkdown";

export const revalidate = 86400; // 1 day ISR

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const client = new HurmaClient();
  const vacancies = await client.getPublishedVacancies();
  const vacancy = vacancies.find((v) => String(v.id) === id);

  if (!vacancy) {
    return { title: "Role not found | GRX Careers" };
  }

  return {
    title: `${vacancy.name} | GRX Careers`,
    description: vacancy.description?.slice(0, 160) ?? undefined,
  };
}

export default async function JobDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  const t = await getTranslations();

  const client = new HurmaClient();
  const vacancies = await client.getPublishedVacancies();
  const vacancy = vacancies.find((v) => String(v.id) === id);

  if (!vacancy) {
    notFound();
  }

  const metaItems: string[] = [];
  if (vacancy.residence?.trim()) metaItems.push(vacancy.residence.trim());
  if (vacancy.work_types?.length) {
    vacancy.work_types.forEach((wt) => metaItems.push(wt.name));
  }

  return (
    <main className="w-full bg-surface-floating">
      <div className="mx-auto flex max-w-[780px] flex-col gap-8 px-4 pb-14 pt-6 md:gap-10 md:pb-24 md:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-[var(--150,6px)]">
            <li>
              <Link
                href="/careers"
                className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-['Nunito_Sans',sans-serif] text-[14px] font-normal leading-[20px] text-text-soft-500"
              >
                {t("CareersPage.jobDetail.breadcrumbs.careers")}
              </Link>
            </li>
            <li aria-hidden="true" className="shrink-0">
              <ChevronRight />
            </li>
            <li
              className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-['Nunito_Sans',sans-serif] text-[14px] font-medium leading-[20px] text-text-strong-1000"
              aria-current="page"
            >
              {vacancy.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-[var(--600,24px)]">
          <div className="flex flex-col gap-[var(--200,8px)]">
            <h1
              className="font-['Nunito_Sans',sans-serif] text-[26px] font-bold leading-[30px] text-text-strong-1000 sm:text-[30px] sm:leading-[34px] md:text-[36px] md:leading-[40px]"
              style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
            >
              {vacancy.name}
            </h1>

            {metaItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-[var(--200,8px)]">
                {metaItems.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-[var(--200,8px)]"
                  >
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="size-[4px] shrink-0 rounded-full bg-text-soft-500"
                      />
                    )}
                    <span
                      className="whitespace-nowrap font-['Nunito_Sans',sans-serif] text-[16px] font-normal leading-[24px] text-text-soft-500"
                      style={{
                        fontVariationSettings: "'YTLC' 500, 'wdth' 100",
                      }}
                    >
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <ApplyButton />
        </div>

        {(vacancy.description ||
          vacancy.responsibility ||
          vacancy.demand ||
          vacancy.addition ||
          vacancy.working_conditions) && (
          <div className="flex flex-col gap-10">
            {vacancy.description && (
              <Section
                title={t("CareersPage.jobDetail.sections.description")}
                text={vacancy.description}
              />
            )}
            {vacancy.responsibility && (
              <Section
                title={t("CareersPage.jobDetail.sections.responsibilities")}
                text={vacancy.responsibility}
              />
            )}
            {vacancy.demand && (
              <Section
                title={t("CareersPage.jobDetail.sections.requirements")}
                text={vacancy.demand}
              />
            )}
            {vacancy.addition && (
              <Section
                title={t("CareersPage.jobDetail.sections.niceToHave")}
                text={vacancy.addition}
              />
            )}
            {vacancy.working_conditions && (
              <Section
                title={t("CareersPage.jobDetail.sections.offer")}
                text={vacancy.working_conditions}
              />
            )}
          </div>
        )}

        <div id="apply">
          <ApplySection vacancyId={vacancy.id} vacancyName={vacancy.name} />
        </div>
      </div>
    </main>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        className="text-text-soft-500"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  const processedText = text
    .replace(/([^\n])\n(\s*[-*]\s)/g, "$1\n\n$2")
    .replace(/\n(?!\n)/g, "\n\n");

  return (
    <div className="flex flex-col gap-[var(--600,24px)]">
      <h2
        className="font-['Nunito_Sans',sans-serif] text-[24px] font-bold leading-[28px] text-text-strong-1000"
        style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
      >
        {title}
      </h2>

      <LegalMarkdown
        content={processedText}
        components={{
          h3: ({ children }) => (
            <h3
              className="mt-4 font-['Nunito_Sans',sans-serif] text-[24px] font-bold leading-[28px] text-text-strong-1000 first:mt-0"
              style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
            >
              {children}
            </h3>
          ),
        }}
      />
    </div>
  );
}

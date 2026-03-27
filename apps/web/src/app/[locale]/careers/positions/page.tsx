import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HurmaClient } from "@/modules/careers";
import { VacancyList } from "../VacancyList";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("CareersPage.positions.meta.title"),
    description: t("CareersPage.positions.meta.description"),
  };
}

export default async function PositionsPage() {
  const client = new HurmaClient();
  const vacancies = await client.getPublishedVacancies();

  return (
    <main className="flex flex-col">
      <VacancyList vacancies={vacancies} />
    </main>
  );
}

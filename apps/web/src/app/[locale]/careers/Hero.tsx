import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot } from "@grx/ui/components/button/Button";

export async function CareersHero() {
  const t = await getTranslations("CareersPage.hero");

  return (
    <section className="flex min-h-[400px] w-full items-center justify-center bg-surface-canvas py-16">
      <div className="flex w-full max-w-[500px] flex-col items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bounded text-center text-[36px] font-bold leading-[40px] text-text-strong-1000">
            {t("title")}
          </h1>
          <p className="text-center text-body-lg-medium text-text-subtle-700">
            {t("subtitle")}
          </p>
        </div>

        <ButtonRoot variant="primary" size="md" asChild>
          <Link href="/careers/positions">{t("ctaButton")}</Link>
        </ButtonRoot>
      </div>
    </section>
  );
}

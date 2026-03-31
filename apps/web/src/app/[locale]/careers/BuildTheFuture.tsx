import { getTranslations } from "next-intl/server";

export async function BuildTheFuture() {
  const t = await getTranslations("CareersPage.buildTheFuture");

  return (
    <section className="w-full bg-surface-base">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-4 py-14 md:gap-12 md:py-20 lg:flex-row lg:items-center lg:gap-20 lg:py-24">
        <h2 className="shrink-0 font-bounded text-[26px] font-bold leading-[30px] text-text-strong-1000 sm:text-[28px] sm:leading-[32px] md:text-[32px] md:leading-[36px] lg:w-[380px] lg:text-[36px] lg:leading-[40px]">
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-gold-500">{chunks}</span>
            ),
          })}
        </h2>
        <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular lg:max-w-[680px]">
          {t("body")}
        </p>
      </div>
    </section>
  );
}

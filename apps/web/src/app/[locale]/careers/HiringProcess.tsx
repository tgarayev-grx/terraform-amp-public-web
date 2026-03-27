import { getTranslations } from "next-intl/server";

const STEPS = [
  "applicationReview",
  "introCall",
  "hiringManagerInterview",
  "offer",
] as const;

export async function HiringProcess() {
  const t = await getTranslations("CareersPage.hiringProcess");

  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-14 px-4 py-20 lg:py-24">
        <h2 className="w-full font-unbounded text-[28px] font-bold leading-[32px] text-white lg:text-center lg:text-[36px] lg:leading-[40px]">
          {t("title")}
        </h2>

        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-6 z-0 h-[calc(100%-48px)] w-0.5 -translate-x-1/2 bg-[#f5a70f] sm:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-[124px] z-0 hidden h-0.5 w-[83%] bg-[#f5a70f] lg:block"
          />

          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="flex flex-col gap-10 rounded-2xl border border-[#404040] bg-[#0a0a0a] px-6 pb-6 pt-10 text-center"
              >
                <span className="font-unbounded text-[28px] font-bold leading-[32px] text-white lg:text-[36px] lg:leading-[40px]">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] font-medium leading-[24px] text-white lg:text-[20px] lg:leading-[26px]">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="text-[14px] font-normal leading-[20px] text-[#A1A1A1] lg:text-[16px] lg:leading-[24px]">
                    {t(`steps.${step}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

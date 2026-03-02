import { getTranslations } from "next-intl/server";

import { Button } from "@grx/ui/components/button";
import { ContactUsModal } from "@/modules/contact-us";

export async function BuildCtaSection() {
  const t = await getTranslations("Home.buildCta");

  return (
    <section className="flex flex-col items-center bg-gold-500 px-4 sm:px-8 py-20 sm:py-24">
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-8 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-[28px] text-neutral-1000 sm:text-[36px] leading-[32px] sm:leading-[40px]">
            {t("title")}
          </h2>
          <p className="font-medium text-[16px] text-neutral-700 sm:text-[20px] leading-[22px] sm:leading-[26px]">
            {t("subtitle")}
          </p>
        </div>

        <ContactUsModal>
          <Button
            className="min-w-[160px] sm:min-w-[280px] shrink-0"
            variant="primary"
            size="lg"
          >
            {t("getInTouch")}
          </Button>
        </ContactUsModal>
      </div>
    </section>
  );
}

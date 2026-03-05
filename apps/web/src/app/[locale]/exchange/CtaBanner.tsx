import { getTranslations } from "next-intl/server";

import { Button } from "@grx/ui/components/button";
import { ContactUsModal } from "@/modules/contact-us";
import { Theme } from "@grx/ui/theme";

export async function CtaBanner() {
  const t = await getTranslations("Exchange.cta");

  return (
    <Theme theme="light" asChild>
      <section className="flex flex-col items-center bg-primary-gold px-4 sm:px-8 py-20 sm:py-24">
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-8 mx-auto w-full max-w-[73.75rem]">
          <div className="flex flex-col gap-4">
            <h2 className="text-heading-h5 text-text-strong-1000 sm:text-heading-h3">
              {t("title")}
            </h2>
            <p className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
              {t("subtitle")}
            </p>
          </div>

          <ContactUsModal>
            <Button
              className="min-w-40 sm:min-w-[17.5rem] shrink-0"
              variant="primary"
              size="lg"
            >
              {t("contactUs")}
            </Button>
          </ContactUsModal>
        </div>
      </section>
    </Theme>
  );
}

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Button } from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";

import faqCtaIcon from "./(assets)/faqcta.png";

export async function FAQCTASection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center bg-surface-canvas px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col items-center gap-8 mx-auto w-full max-w-[580px]">
        <div className="flex justify-center items-center w-[100px] sm:w-[120px] h-[100px] sm:h-[120px]">
          <Image
            className="w-full h-full object-contain"
            src={faqCtaIcon}
            alt=""
            aria-hidden
          />
        </div>

        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-unbounded text-heading-h5 text-text-strong-1000 md:text-heading-h3">
            {t("Pay.PartnerProgram.faqCta.title")}
          </h2>

          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("Pay.PartnerProgram.faqCta.description")}
          </p>
        </div>

        <ContactUsModal
          defaultValues={{
            interestedIn: ["grxPay"],
          }}
        >
          <Button className="w-full max-w-[240px]" variant="primary" size="lg">
            {t("Pay.PartnerProgram.faqCta.contactUs")}
          </Button>
        </ContactUsModal>
      </div>
    </section>
  );
}

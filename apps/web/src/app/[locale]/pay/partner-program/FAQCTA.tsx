import { getTranslations } from "next-intl/server";
import { Button } from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";
import { MessageIcon } from "./(icons)/MessageIcon";

export async function FAQCTASection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center bg-white px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col items-center gap-8 mx-auto w-full max-w-[580px]">
        <div className="flex justify-center items-center bg-neutral-100 rounded-[10px] w-12 h-12">
          <MessageIcon className="size-6 text-neutral-500" />
        </div>

        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-bold text-[28px] text-neutral-900 sm:text-[36px] leading-[32px] sm:leading-[40px]">
            {t("Pay.PartnerProgram.faqCta.title")}
          </h2>
          <p className="font-medium text-neutral-700 text-base sm:text-xl leading-[24px] sm:leading-[26px]">
            {t("Pay.PartnerProgram.faqCta.description")}
          </p>
        </div>

        <ContactUsModal
          defaultValues={{
            interestedIn: ["grxPay"],
          }}
        >
          <Button className="min-w-[240px]" variant="primary" size="md">
            {t("Pay.PartnerProgram.faqCta.contactUs")}
          </Button>
        </ContactUsModal>
      </div>
    </section>
  );
}

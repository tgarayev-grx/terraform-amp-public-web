import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Button } from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";
import buildYourCryptoBusinessWithUsImagePng from "./(assets)/build-your-crypto-business-with-us.png";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";
import { Theme } from "@grx/ui/theme";

export async function BuildYourCryptoBusinessWithUsSection() {
  const t = await getTranslations();
  return (
    <Theme theme="light" asChild>
      <section className="flex flex-col bg-primary-gold text-text-strong-1000">
        {/* 420px + 120px + 440px = 980px */}
        <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
          <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:max-w-[420px] md:text-left text-center">
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-heading-h5 text-text-strong-1000 sm:text-heading-h3">
                {t.rich(
                  "Pay.Root.buildYourBusiness.title",
                  defaultRichComponents
                )}
              </h3>
              <h4 className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
                {t("Pay.Root.buildYourBusiness.subtitle", { brand: "GRX Pay" })}
              </h4>
            </div>

            <div className="flex justify-center mb-4">
              <ContactUsModal
                defaultValues={{
                  interestedIn: ["GRX_PAY"],
                }}
              >
                <Button className="min-w-[180px]" variant="primary" size="lg">
                  {t("Pay.Root.buildYourBusiness.contactSales")}
                </Button>
              </ContactUsModal>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={buildYourCryptoBusinessWithUsImagePng}
              alt=""
              className="w-full max-w-[420px] object-cover"
            />
          </div>
        </div>
      </section>
    </Theme>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonRoot, ButtonText, Button, Theme } from "@grx/ui/index";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ContactUsModal } from "@/modules/contact-us";
import { InfoCircleFilledIcon } from "@grx/ui/icons/InfoCircleFilledIcon";
import { CheckCircleFilledIcon } from "@grx/ui/icons/CheckCircleFilledIcon";
import goldGemPng from "./gold-gem.png";
import blackGemPng from "./black-gem.png";

export async function PricingSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-display-lg text-text-strong-1000">
            {t("Pay.Pricing.title")}
          </h3>

          <h4 className="text-body-xl-medium text-text-subtle-700">
            {t("Pay.Pricing.subtitle")}
          </h4>
        </div>

        <div className="flex flex-col">
          <div className="gap-[60px] xl:gap-6 grid grid-cols-1 xl:grid-cols-2 pt-[72px] pb-8">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 bg-surface-floating shadow-sm p-1 rounded-2xl min-h-[280px]">
              <Image
                className="-top-10 left-8 absolute"
                src={blackGemPng}
                alt=""
                aria-hidden
                width={96}
                height={96}
                style={{
                  filter: "drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.16))",
                }}
              />

              <div className="flex flex-col gap-10 p-8">
                <div className="flex flex-col flex-grow gap-4 pt-12">
                  <div className="text-heading-h5 text-text-strong-1000 md:text-heading-h3">
                    2.5%
                  </div>

                  <div className="text-body-md-medium text-text-soft-500 md:text-body-lg-medium">
                    {t("Pay.Pricing.perInvoicePayment")}
                  </div>
                </div>

                <ButtonRoot
                  className="max-w-[180px] xl:max-w-full"
                  variant="primary"
                  size="lg"
                  asChild
                >
                  <Link href="/sign-up" target="_blank">
                    <ButtonText>{t("Pay.Pricing.getStarted")}</ButtonText>
                  </Link>
                </ButtonRoot>
              </div>
              <ul className="flex flex-col gap-4 bg-bg-weak-100 p-8 rounded-xl min-h-[232px]">
                <li className="flex gap-1.5">
                  <CheckCircleFilledIcon
                    className="flex-shrink-0 text-success-subtle-500"
                    width={20}
                    height={20}
                  />
                  <span className="text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                    {t("Pay.Pricing.benefits.unlockCryptoAudience")}
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <CheckCircleFilledIcon
                    className="flex-shrink-0 text-success-subtle-500"
                    width={20}
                    height={20}
                  />
                  <span className="text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                    {t("Pay.Pricing.benefits.enhanceRevenue")}
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <CheckCircleFilledIcon
                    className="flex-shrink-0 text-success-subtle-500"
                    width={20}
                    height={20}
                  />
                  <span className="text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                    {t("Pay.Pricing.benefits.minimizeCosts")}
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <CheckCircleFilledIcon
                    className="flex-shrink-0 text-success-subtle-500"
                    width={20}
                    height={20}
                  />
                  <span className="text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                    {t("Pay.Pricing.benefits.accessGlobally")}
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <CheckCircleFilledIcon
                    className="flex-shrink-0 text-success-subtle-500"
                    width={20}
                    height={20}
                  />
                  <span className="text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                    {t("Pay.Pricing.benefits.keepUpWithTimes")}
                  </span>
                </li>
              </ul>
            </div>

            <Theme theme="light" asChild>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 bg-primary-gold shadow-sm p-1 rounded-2xl min-h-[280px]">
                <Image
                  className="-top-10 left-8 absolute"
                  src={goldGemPng}
                  alt=""
                  aria-hidden
                  width={96}
                  height={96}
                  style={{
                    filter: "drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.16))",
                  }}
                />
                <div className="flex flex-col gap-10 p-8">
                  <div className="flex flex-col flex-grow gap-4 pt-12">
                    <div className="text-heading-h5 text-text-strong-1000 md:text-heading-h3">
                      {t("Pay.Pricing.custom")}
                    </div>

                    <div className="text-body-md-medium text-text-subtle-700 md:text-body-lg-medium">
                      {t("Pay.Pricing.fromAmountPerTransaction")}
                    </div>
                  </div>

                  <ContactUsModal
                    defaultValues={{
                      interestedIn: ["GRX_PAY"],
                    }}
                  >
                    <Theme theme="light" asChild>
                      <Button
                        className="max-w-[180px] xl:max-w-full"
                        variant="primary"
                        size="lg"
                      >
                        {t("Pay.Pricing.contactSales")}
                      </Button>
                    </Theme>
                  </ContactUsModal>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 bg-gold-400 shadow-xs p-8 rounded-xl min-h-[232px] text-body-md-medium text-text-strong-1000 md:text-body-lg-medium">
                  {t("Pay.Pricing.customVolumeMessage")}
                </div>
              </div>
            </Theme>
          </div>

          <p className="flex flex-grow justify-center items-center gap-1.5 mb-14 text-neutral-500">
            <InfoCircleFilledIcon
              className="text-icon-base-500"
              width={20}
              height={20}
            />

            <span className="text-body-md-regular text-text-soft-500">
              {t("Pay.Pricing.depositFeeNote")}{" "}
              <span className="text-body-md-semibold text-text-strong-1000">
                {t("Pay.Pricing.depositFeeMin")}
              </span>
            </span>
          </p>

          <div className="gap-[56px] xl:gap-0 grid grid-cols-1 xl:grid-cols-3 bg-bg-weak-100 px-6 py-10 rounded-2xl">
            <div className="flex flex-col justify-between gap-2 text-center">
              <div className="text-text-strong-1000 text-title-lg md:text-heading-h4">
                5 EUR
              </div>

              <div className="text-body-lg-medium text-text-strong-1000 md:text-body-xl-medium">
                {t("Pay.Pricing.cryptoWithdrawalFee")}
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="text-text-strong-1000 text-title-lg md:text-heading-h4">
                0.5%
              </div>

              <div className="mb-2 text-body-md-medium text-text-soft-500 md:text-body-lg-medium">
                {t("Pay.Pricing.fiatWithdrawalFeeMin")}
              </div>

              <div className="text-body-lg-medium text-text-strong-1000 md:text-body-xl-medium">
                {t("Pay.Pricing.fiatWithdrawalFee")}
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="text-text-strong-1000 text-title-lg md:text-heading-h4">
                1%
              </div>

              <div className="mb-2 text-body-md-medium text-text-soft-500 md:text-body-lg-medium">
                {t("Pay.Pricing.massPayoutFeeMin")}
              </div>

              <div className="text-body-lg-medium text-text-strong-1000 md:text-body-xl-medium">
                {t("Pay.Pricing.massPayoutFee")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { InfoCircleFilledIcon } from "../(icons)/InfoCircleFilledIcon";
import { PricingTabsClient } from "./PricingTabs";

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
          <PricingTabsClient />

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

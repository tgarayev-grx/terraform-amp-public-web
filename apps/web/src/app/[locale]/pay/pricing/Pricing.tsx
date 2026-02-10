import { getTranslations } from "next-intl/server";
import { InfoCircleFilledIcon } from "../(icons)/InfoCircleFilledIcon";
import { PricingTabsClient } from "./PricingTabs";

export async function PricingSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            {t("Pay.Pricing.title")}
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            {t("Pay.Pricing.subtitle")}
          </h4>
        </div>

        <div className="flex flex-col">
          <PricingTabsClient />

          <p className="flex flex-grow justify-center items-center gap-1.5 mb-14 text-neutral-500">
            <InfoCircleFilledIcon width={20} height={20} />
            <span className="text-neutral-700 text-base">
              {t("Pay.Pricing.depositFeeNote")}{" "}
              <span className="font-semibold text-neutral-1000">
                {t("Pay.Pricing.depositFeeMin")}
              </span>
            </span>
          </p>

          <div className="gap-[56px] xl:gap-0 grid grid-cols-1 xl:grid-cols-3 bg-neutral-100 px-6 py-10 rounded-2xl">
            <div className="flex flex-col justify-between gap-2 text-center">
              <div className="font-bold text-[32px] leading-[36px]">5 EUR</div>
              <div className="font-medium text-[20px] leading-[26px]">
                {t("Pay.Pricing.cryptoWithdrawalFee")}
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="font-bold text-[32px] leading-[36px]">0.5%</div>
              <div className="mb-2 font-medium text-neutral-500 text-base">
                {t("Pay.Pricing.fiatWithdrawalFeeMin")}
              </div>
              <div className="font-medium text-[20px] leading-[26px]">
                {t("Pay.Pricing.fiatWithdrawalFee")}
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="font-bold text-[32px] leading-[36px]">1%</div>
              <div className="mb-2 font-medium text-neutral-500 text-base">
                {t("Pay.Pricing.massPayoutFeeMin")}
              </div>
              <div className="font-medium text-[20px] leading-[26px]">
                {t("Pay.Pricing.massPayoutFee")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

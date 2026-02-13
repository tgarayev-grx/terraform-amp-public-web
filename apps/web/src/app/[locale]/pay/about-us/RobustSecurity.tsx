import { getTranslations } from "next-intl/server";

import { FeatureCard } from "../(components)/card";
import { LockIcon } from "../(icons)/LockIcon";
import { SafeBoxIcon } from "../(icons)/SafeBoxIcon";
import { ShieldIcon } from "../(icons)/ShieldIcon";
import { TargetIcon } from "../(icons)/TargetIcon";
import { AMLIcon } from "../(icons)/AMLIcon";
import { QRScanIcon } from "../(icons)/QRScanIcon";

export async function RobustSecuritySection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="flex flex-col gap-4 mx-auto mb-6 max-w-[580px] font-unbounded font-bold text-[28px] text-neutral-900 sm:text-4xl text-center leading-[32px] sm:leading-[40px]">
          {t("Pay.AboutUs.robustSecurity.title")}
        </h2>

        <p className="mx-auto mb-14 max-w-[580px] font-medium text-[16px] text-neutral-600 sm:text-[18px] text-center leading-[24px] sm:leading-[26px]">
          {t("Pay.AboutUs.robustSecurity.description")}
        </p>

        {/* Layout: mobile + tablet — 1 col, then 2 col with 5th centered */}
        <div className="lg:hidden gap-6 grid grid-cols-1 sm:grid-cols-2">
          <FeatureCard
            title={t("Pay.AboutUs.robustSecurity.cards.1.title")}
            description={t("Pay.AboutUs.robustSecurity.cards.1.description")}
            icon={
              <LockIcon width={24} height={24} className="text-neutral-500" />
            }
          />
          <FeatureCard
            title={t("Pay.AboutUs.robustSecurity.cards.2.title")}
            description={t("Pay.AboutUs.robustSecurity.cards.2.description")}
            icon={<SafeBoxIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.AboutUs.robustSecurity.cards.3.title")}
            description={t("Pay.AboutUs.robustSecurity.cards.3.description")}
            icon={
              <ShieldIcon width={24} height={24} className="text-neutral-500" />
            }
          />
          <FeatureCard
            title={t("Pay.AboutUs.robustSecurity.cards.4.title")}
            description={t("Pay.AboutUs.robustSecurity.cards.4.description")}
            icon={<TargetIcon width={24} height={24} />}
          />
          <div className="flex justify-center sm:col-span-2">
            <div className="w-full sm:w-[calc((100%-1.5rem)/2)]">
              <FeatureCard
                title={t("Pay.AboutUs.robustSecurity.cards.5.title")}
                description={t(
                  "Pay.AboutUs.robustSecurity.cards.5.description"
                )}
                icon={
                  <QRScanIcon
                    width={24}
                    height={24}
                    className="text-neutral-500"
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Layout: lg — 3 col row, then centered 2-card row */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="gap-6 grid grid-cols-3">
            <FeatureCard
              title={t("Pay.AboutUs.robustSecurity.cards.1.title")}
              description={t("Pay.AboutUs.robustSecurity.cards.1.description")}
              icon={
                <LockIcon width={24} height={24} className="text-neutral-500" />
              }
            />
            <FeatureCard
              title={t("Pay.AboutUs.robustSecurity.cards.2.title")}
              description={t("Pay.AboutUs.robustSecurity.cards.2.description")}
              icon={<SafeBoxIcon width={24} height={24} />}
            />
            <FeatureCard
              title={t("Pay.AboutUs.robustSecurity.cards.3.title")}
              description={t("Pay.AboutUs.robustSecurity.cards.3.description")}
              icon={
                <ShieldIcon
                  width={24}
                  height={24}
                  className="text-neutral-500"
                />
              }
            />
          </div>
          <div className="flex justify-center gap-6">
            <div className="w-[calc((100%-1.5rem)/3)]">
              <FeatureCard
                title={t("Pay.AboutUs.robustSecurity.cards.4.title")}
                description={t(
                  "Pay.AboutUs.robustSecurity.cards.4.description"
                )}
                icon={<TargetIcon width={24} height={24} />}
              />
            </div>
            <div className="w-[calc((100%-1.5rem)/3)]">
              <FeatureCard
                title={t("Pay.AboutUs.robustSecurity.cards.5.title")}
                description={t(
                  "Pay.AboutUs.robustSecurity.cards.5.description"
                )}
                icon={
                  <QRScanIcon
                    width={24}
                    height={24}
                    className="text-neutral-500"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

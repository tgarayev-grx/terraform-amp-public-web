import { getTranslations } from "next-intl/server";

import { FeatureCard } from "../(components)/card";
import { LockIcon } from "@grx/ui/icons/LockIcon";
import { SafeBoxIcon } from "@grx/ui/icons/SafeBoxIcon";
import { ShieldIcon } from "@grx/ui/icons/ShieldIcon";
import { TargetIcon } from "@grx/ui/icons/TargetIcon";
import { AMLIcon } from "@grx/ui/icons/AMLIcon";
import { QRScanIcon } from "@grx/ui/icons/QRScanIcon";

export async function RobustSecuritySection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center bg-surface-canvas px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="flex flex-col gap-4 mx-auto mb-6 max-w-[580px] font-bounded text-display-sm text-text-strong-1000 sm:text-display-md text-center">
          {t("Pay.AboutUs.robustSecurity.title")}
        </h2>

        <p className="mx-auto mb-14 max-w-[580px] text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium text-center">
          {t("Pay.AboutUs.robustSecurity.description")}
        </p>

        {/* Layout: mobile + tablet — 1 col, then 2 col with 5th centered */}
        <div className="lg:hidden gap-6 grid grid-cols-1 sm:grid-cols-2">
          <FeatureCard
            title={t("Pay.AboutUs.robustSecurity.cards.1.title")}
            description={t("Pay.AboutUs.robustSecurity.cards.1.description")}
            icon={
              <LockIcon width={24} height={24} className="text-icon-base-500" />
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
                className="text-icon-base-500"
              />
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
                    className="text-icon-base-500"
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
                <LockIcon
                  width={24}
                  height={24}
                  className="text-icon-base-500"
                />
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
                  className="text-icon-base-500"
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
                    className="text-icon-base-500"
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

import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import type { ServerTranslationFn } from "@/modules/cross-cutting-concerns/i18n/types";
import { ShieldIcon } from "../(icons)/ShieldIcon";
import { GlobeIcon } from "../(icons)/GlobeIcon";
import { CheckIcon } from "../(icons)/CheckIcon";
import { AMLIcon } from "../(icons)/AMLIcon";
import { ChartWaveIcon } from "../(icons)/ChartWaveIcon";
import { ChattingIcon } from "../(icons)/ChattingIcon";
import { PuzzleIcon } from "../(icons)/PuzzleIcon";
import { FeatureCard } from "../(components)/card";

type WhatsIncludedFeatureCardProps = {
  title: string;
  items: string[];
  icon: ReactNode;
};

function WhatsIncludedFeatureCard({
  title,
  items,
  icon,
}: WhatsIncludedFeatureCardProps) {
  return (
    <FeatureCard
      classes={{
        content: "gap-4",
      }}
      title={title}
      description={
        <ul className="flex flex-col gap-2 list-inside list-none">
          {items.map((item) => (
            <li className="flex items-center gap-1.5" key={item}>
              <CheckIcon
                width={20}
                height={20}
                className="flex-shrink-0 text-green-500"
              />{" "}
              {item}
            </li>
          ))}
        </ul>
      }
      icon={icon}
    />
  );
}

function getItems(t: ServerTranslationFn, baseKey: string, count: number) {
  return Array.from({ length: count }, (_, i) =>
    t(`${baseKey}.${i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`)
  );
}

export async function WhatsIncludedSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="flex flex-col gap-4 mx-auto mb-14 max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl text-center leading-[32px] sm:leading-[40px]">
          {t("Pay.Pricing.whatsIncluded.title")}
        </h3>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.globalPayments.title")}
            items={getItems(
              t,
              "Pay.Pricing.whatsIncluded.globalPayments.items",
              4
            )}
            icon={<GlobeIcon width={24} height={24} />}
          />
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.security.title")}
            items={getItems(t, "Pay.Pricing.whatsIncluded.security.items", 4)}
            icon={<ShieldIcon width={24} height={24} />}
          />
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.aml.title")}
            items={getItems(t, "Pay.Pricing.whatsIncluded.aml.items", 3)}
            icon={<AMLIcon width={24} height={24} />}
          />
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.reporting.title")}
            items={getItems(t, "Pay.Pricing.whatsIncluded.reporting.items", 3)}
            icon={<ChartWaveIcon width={24} height={24} />}
          />
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.developer.title")}
            items={getItems(t, "Pay.Pricing.whatsIncluded.developer.items", 2)}
            icon={<PuzzleIcon width={24} height={24} />}
          />
          <WhatsIncludedFeatureCard
            title={t("Pay.Pricing.whatsIncluded.support.title")}
            items={getItems(t, "Pay.Pricing.whatsIncluded.support.items", 5)}
            icon={<ChattingIcon width={24} height={24} />}
          />
        </div>
      </div>
    </section>
  );
}

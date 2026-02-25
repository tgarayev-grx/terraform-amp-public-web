import { getTranslations } from "next-intl/server";
import { memo, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

import grxPayImg from "./(assets)/ecosystem-grx-pay.webp";
import grxExchangeImg from "./(assets)/ecosystem-grx-exchange.webp";
import grxRwaImg from "./(assets)/ecosystem-grx-rwa.webp";
import { Button, ButtonRoot, ButtonText } from "@grx/ui/components/button";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { ComingSoonBadge } from "@/modules/shared/header/components/ComingSoonBadge";

export async function EcosystemSection() {
  const t = await getTranslations("Home");
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            {t("ecosystem.title")}
          </h3>

          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            {t("ecosystem.subtitle")}
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1">
          <FeatureCard
            product={t("ecosystem.grxPay.product")}
            title={t("ecosystem.grxPay.title")}
            description={t("ecosystem.grxPay.description")}
            imageAlt={t("ecosystem.grxPay.imageAlt")}
            action={
              <ButtonRoot
                palette="secondary"
                variant="contained"
                size="md"
                asChild
              >
                <Link href={ROUTES.pay}>
                  <ButtonText>{t("ecosystem.grxPay.exploreGrxPay")}</ButtonText>
                </Link>
              </ButtonRoot>
            }
            start={grxPayImg}
          />

          <FeatureCard
            prepend={
              <ComingSoonBadge variant="yellow">
                {t("ecosystem.comingSoon")}
              </ComingSoonBadge>
            }
            product={t("ecosystem.grxExchange.product")}
            title={t("ecosystem.grxExchange.title")}
            description={t("ecosystem.grxExchange.description")}
            imageAlt={t("ecosystem.grxExchange.imageAlt")}
            action={
              <Button
                palette="secondary"
                variant="contained"
                size="md"
                disabled
              >
                {t("ecosystem.comingSoon")}
              </Button>
            }
            end={grxExchangeImg}
          />
          <FeatureCard
            prepend={
              <ComingSoonBadge variant="yellow">
                {t("ecosystem.comingSoon")}
              </ComingSoonBadge>
            }
            product={t("ecosystem.grxRwa.product")}
            title={t("ecosystem.grxRwa.title")}
            description={t("ecosystem.grxRwa.description")}
            imageAlt={t("ecosystem.grxRwa.imageAlt")}
            action={
              <Button
                palette="secondary"
                variant="contained"
                size="md"
                disabled
              >
                {t("ecosystem.comingSoon")}
              </Button>
            }
            start={grxRwaImg}
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  prepend?: ReactNode;

  product: string;
  title: string;
  description: string;
  imageAlt: string;
  start?: StaticImageData;
  end?: StaticImageData;
  action: ReactNode;
};
const FeatureCard = memo(
  ({
    prepend,
    product,
    title,
    description,
    imageAlt,
    start,
    end,
    action,
  }: FeatureCardProps) => {
    return (
      <div
        className={clsx("gap-5 grid grid-cols-1", {
          "md:grid-cols-[252fr_432fr] xl:grid-cols-[380fr_780fr]": !!start,
          "md:grid-cols-[432fr_252fr] xl:grid-cols-[780fr_380fr]": !!end,
        })}
      >
        {!!start && (
          <Image
            className="row-start-1 md:row-start-auto shadow-light-sm rounded-2xl h-full max-h-[320px] md:max-h-none object-cover"
            src={start}
            alt={imageAlt}
          />
        )}

        <div
          className={clsx(
            "flex flex-col gap-10 shadow-light-sm p-6 rounded-2xl min-h-[320px]"
          )}
        >
          <div
            className={clsx("flex flex-col flex-grow justify-between gap-4")}
          >
            <div className="flex flex-col flex-grow gap-4">
              <div className="flex flex-col gap-2">
                <div>{prepend}</div>

                <h2 className="font-bold text-[18px] text-neutral-400 md:text-[24px] leading-[22px] md:leading-[28px] tracking-[0.072px]">
                  {product}
                </h2>
              </div>
              <h3 className={clsx("font-bold text-[24px] leading-[28px]")}>
                {title}
              </h3>

              <div className={clsx("text-neutral-500 text-base")}>
                {description}
              </div>
            </div>

            <div className="flex justify-start w-full">{action}</div>
          </div>
        </div>

        {!!end && (
          <Image
            className="row-start-1 md:row-start-auto shadow-light-sm rounded-2xl h-full max-h-[320px] md:max-h-none object-cover"
            src={end}
            alt={imageAlt}
          />
        )}
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

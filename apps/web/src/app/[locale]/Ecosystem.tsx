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
import { Badge } from "@grx/ui/index";

export async function EcosystemSection() {
  const t = await getTranslations("Home");
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("ecosystem.title")}
          </h3>

          <h4 className="text-body-lg-medium text-text-subtle-700 md:text-body-lg-medium">
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
                className="min-w-[142px]"
                variant="secondary"
                size="lg"
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
              <Badge
                className="w-fit"
                palette="warning"
                variant="light"
                size="md"
              >
                {t("ecosystem.comingSoon")}
              </Badge>
            }
            product={t("ecosystem.grxExchange.product")}
            title={t("ecosystem.grxExchange.title")}
            description={t("ecosystem.grxExchange.description")}
            imageAlt={t("ecosystem.grxExchange.imageAlt")}
            action={
              <Button
                className="min-w-[142px]"
                variant="secondary"
                size="lg"
                disabled
              >
                {t("ecosystem.comingSoon")}
              </Button>
            }
            end={grxExchangeImg}
          />
          <FeatureCard
            prepend={
              <Badge
                className="w-fit"
                palette="warning"
                variant="light"
                size="md"
              >
                {t("ecosystem.comingSoon")}
              </Badge>
            }
            product={t("ecosystem.grxRwa.product")}
            title={t("ecosystem.grxRwa.title")}
            description={t("ecosystem.grxRwa.description")}
            imageAlt={t("ecosystem.grxRwa.imageAlt")}
            action={
              <Button
                className="min-w-[142px]"
                variant="secondary"
                size="lg"
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
            className="row-start-1 md:row-start-auto shadow-sm rounded-2xl h-full max-h-[320px] md:max-h-none object-cover"
            src={start}
            alt={imageAlt}
          />
        )}

        <div className="flex flex-col gap-10 bg-surface-floating shadow-sm p-6 rounded-2xl min-h-[320px]">
          <div className="flex flex-col flex-grow justify-between gap-4">
            <div className="flex flex-col flex-grow gap-4">
              <div className="flex flex-col gap-2">
                <div>{prepend}</div>

                <h2 className="text-text-disabled text-title-sm md:text-title-lg-semibold">
                  {product}
                </h2>
              </div>
              <h3 className="text-text-strong-1000 text-title-lg md:text-heading-h4">
                {title}
              </h3>

              <div className="text-body-lg-medium text-text-soft-500">
                {description}
              </div>
            </div>

            <div className="flex justify-start w-full">{action}</div>
          </div>
        </div>

        {!!end && (
          <Image
            className="row-start-1 md:row-start-auto shadow-sm rounded-2xl h-full max-h-[320px] md:max-h-none object-cover"
            src={end}
            alt={imageAlt}
          />
        )}
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

"use client";

import { useTranslations } from "next-intl";
import { memo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ButtonRoot, ButtonText, Button, Theme } from "@grx/ui/index";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ContactUsModal } from "@/modules/contact-us";
import { CheckCircleFilledIcon } from "../(icons)/CheckCircleFilledIcon";
import blackGemPng from "./black-gem.png";
import goldGemPng from "./gold-gem.png";
import Image from "next/image";
import clsx from "clsx";

function CryptoAcquiringTabContent() {
  const t = useTranslations();
  return (
    <Tabs.Content value="crypto-acquiring">
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
            <TabCardContent />
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

                <div className="text-body-md-medium text-text-soft-700 md:text-body-lg-medium">
                  {t("Pay.Pricing.fromAmountPerTransaction")}
                </div>
              </div>

              <ContactUsModal
                defaultValues={{
                  interestedIn: ["grxPay"],
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
    </Tabs.Content>
  );
}

const TabCardContent = memo(function TabCardContent() {
  const t = useTranslations();
  return (
    <>
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
    </>
  );
});

function CryptoProcessingTabContent() {
  const t = useTranslations();
  return (
    <Tabs.Content value="crypto-processing">
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
            <TabCardContent />
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

                <div className="text-body-md-medium text-text-soft-700 md:text-body-lg-medium">
                  {t("Pay.Pricing.fromAmountPerTransaction")}
                </div>
              </div>

              <ContactUsModal
                defaultValues={{
                  interestedIn: ["grxPay"],
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
    </Tabs.Content>
  );
}

export function PricingTabsClient() {
  const t = useTranslations();
  return (
    <Tabs.Root defaultValue="crypto-acquiring">
      <Tabs.List className="flex bg-bg-weak-100 mx-auto p-0.5 rounded-lg max-w-[380px]">
        <Tabs.Trigger
          className={clsx(
            "flex-grow px-4 py-1 md:min-w-[178px] text-body-md-semibold text-text-soft-500 cursor-pointer",
            "data-[state=active]:bg-surface-base data-[state=active]:rounded-md data-[state=active]:text-text-strong-1000 data-[state=active]:cursor-default"
          )}
          value="crypto-acquiring"
        >
          {t("Pay.Pricing.tabs.cryptoAcquiring")}
        </Tabs.Trigger>

        <Tabs.Trigger
          className={clsx(
            "flex-grow px-4 py-1 md:min-w-[178px] text-body-md-semibold text-text-soft-500 cursor-pointer",
            "data-[state=active]:bg-surface-base data-[state=active]:rounded-md data-[state=active]:text-text-strong-1000 data-[state=active]:cursor-default"
          )}
          value="crypto-processing"
        >
          {t("Pay.Pricing.tabs.cryptoProcessing")}
        </Tabs.Trigger>
      </Tabs.List>

      <CryptoAcquiringTabContent />
      <CryptoProcessingTabContent />
    </Tabs.Root>
  );
}

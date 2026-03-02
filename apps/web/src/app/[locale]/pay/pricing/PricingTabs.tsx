"use client";

import { useTranslations } from "next-intl";
import { memo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ButtonRoot, ButtonText, Button } from "@grx/ui/index";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ContactUsModal } from "@/modules/contact-us";
import { CheckCircleFilledIcon } from "../(icons)/CheckCircleFilledIcon";
import blackGemPng from "./black-gem.png";
import goldGemPng from "./gold-gem.png";
import Image from "next/image";

const TabCardContent = memo(function TabCardContent() {
  const t = useTranslations();
  return (
    <>
      <li className="flex gap-1.5">
        <CheckCircleFilledIcon
          className="flex-shrink-0 text-green-500"
          width={20}
          height={20}
        />
        <span className="font-medium text-base">
          {t("Pay.Pricing.benefits.unlockCryptoAudience")}
        </span>
      </li>
      <li className="flex gap-1.5">
        <CheckCircleFilledIcon
          className="flex-shrink-0 text-green-500"
          width={20}
          height={20}
        />
        <span className="font-medium text-base">
          {t("Pay.Pricing.benefits.enhanceRevenue")}
        </span>
      </li>
      <li className="flex gap-1.5">
        <CheckCircleFilledIcon
          className="flex-shrink-0 text-green-500"
          width={20}
          height={20}
        />
        <span className="font-medium text-base">
          {t("Pay.Pricing.benefits.minimizeCosts")}
        </span>
      </li>
      <li className="flex gap-1.5">
        <CheckCircleFilledIcon
          className="flex-shrink-0 text-green-500"
          width={20}
          height={20}
        />
        <span className="font-medium text-base">
          {t("Pay.Pricing.benefits.accessGlobally")}
        </span>
      </li>
      <li className="flex gap-1.5">
        <CheckCircleFilledIcon
          className="flex-shrink-0 text-green-500"
          width={20}
          height={20}
        />
        <span className="font-medium text-base">
          {t("Pay.Pricing.benefits.keepUpWithTimes")}
        </span>
      </li>
    </>
  );
});

function CryptoAcquiringTabContent() {
  const t = useTranslations();
  return (
    <Tabs.Content value="crypto-acquiring">
      <div className="gap-[60px] xl:gap-6 grid grid-cols-1 xl:grid-cols-2 pt-[72px] pb-8">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 shadow-sm p-1 rounded-2xl min-h-[280px]">
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
              <div className="font-bold text-4xl">2.5%</div>
              <div className="text-neutral-700 text-base">
                {t("Pay.Pricing.perInvoicePayment")}
              </div>
            </div>
            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              variant="primary"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>{t("Pay.Pricing.getStarted")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
          <ul className="flex flex-col gap-4 bg-neutral-50 p-8 rounded-xl min-h-[232px]">
            <TabCardContent />
          </ul>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 bg-gold-500 shadow-sm p-1 rounded-2xl min-h-[280px]">
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
              <div className="font-bold text-4xl">
                {t("Pay.Pricing.custom")}
              </div>
              <div className="text-neutral-700 text-base">
                {t("Pay.Pricing.fromAmountPerTransaction")}
              </div>
            </div>
            <ContactUsModal
              defaultValues={{
                interestedIn: ["grxPay"],
              }}
            >
              <Button
                className="max-w-[180px] xl:max-w-full"
                variant="secondary"
                size="md"
              >
                {t("Pay.Pricing.contactSales")}
              </Button>
            </ContactUsModal>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-gold-400 p-8 rounded-xl min-h-[232px]">
            {t("Pay.Pricing.customVolumeMessage")}
          </div>
        </div>
      </div>
    </Tabs.Content>
  );
}

function CryptoProcessingTabContent() {
  const t = useTranslations();
  return (
    <Tabs.Content value="crypto-processing">
      <div className="gap-[60px] xl:gap-6 grid grid-cols-1 xl:grid-cols-2 pt-[72px] pb-8">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 shadow-sm p-1 rounded-2xl min-h-[280px]">
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
              <div className="font-bold text-4xl">2.5%</div>
              <div className="text-neutral-700 text-base">
                {t("Pay.Pricing.perInvoicePayment")}
              </div>
            </div>
            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              variant="primary"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>{t("Pay.Pricing.getStarted")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
          <ul className="flex flex-col gap-4 bg-neutral-50 p-8 rounded-xl min-h-[232px]">
            <TabCardContent />
          </ul>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 bg-gold-500 shadow-sm p-1 rounded-2xl min-h-[280px]">
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
              <div className="font-bold text-4xl">
                {t("Pay.Pricing.custom")}
              </div>
              <div className="text-neutral-700 text-base">
                {t("Pay.Pricing.fromAmountPerTransaction")}
              </div>
            </div>
            <ContactUsModal
              defaultValues={{
                interestedIn: ["grxPay"],
              }}
            >
              <Button
                className="max-w-[180px] xl:max-w-full"
                variant="secondary"
                size="md"
              >
                {t("Pay.Pricing.contactSales")}
              </Button>
            </ContactUsModal>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 bg-gold-400 p-8 rounded-xl min-h-[232px]">
            {t("Pay.Pricing.customVolumeMessage")}
          </div>
        </div>
      </div>
    </Tabs.Content>
  );
}

export function PricingTabsClient() {
  const t = useTranslations();
  return (
    <Tabs.Root defaultValue="crypto-acquiring">
      <Tabs.List className="flex bg-neutral-100 mx-auto p-0.5 rounded-lg max-w-[380px]">
        <Tabs.Trigger
          className="flex-grow data-[state=active]:bg-neutral px-4 py-1 data-[state=active]:rounded-md md:min-w-[178px] font-semibold text-[16px] text-neutral-500 data-[state=active]:text-neutral-1000 leading-[20px] cursor-pointer data-[state=active]:cursor-default"
          value="crypto-acquiring"
        >
          {t("Pay.Pricing.tabs.cryptoAcquiring")}
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex-grow data-[state=active]:bg-neutral px-4 py-1 data-[state=active]:rounded-md md:min-w-[178px] font-semibold text-[16px] text-neutral-500 data-[state=active]:text-neutral-1000 leading-[20px] cursor-pointer data-[state=active]:cursor-default"
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

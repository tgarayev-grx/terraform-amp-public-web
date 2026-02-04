import { memo } from "react";
import { InfoCircleFilledIcon } from "../(icons)/InfoCircleFilledIcon";
import * as Tabs from "@radix-ui/react-tabs";
import { ButtonRoot, ButtonText } from "@grx/ui/index";
import Link from "next/link";
import { CheckCircleFilledIcon } from "../(icons)/CheckCircleFilledIcon";

import blackGemPng from "./black-gem.png";
import goldGemPng from "./gold-gem.png";
import Image from "next/image";

export const PricingSection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            Pricing
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            Transparent pricing and competitive rates for our services
          </h4>
        </div>

        <div className="flex flex-col">
          <Tabs.Root defaultValue="crypto-acquiring">
            <Tabs.List className="flex bg-neutral-100 mx-auto p-0.5 rounded-lg max-w-[380px]">
              <Tabs.Trigger
                className="flex-grow data-[state=active]:bg-neutral px-4 py-1 data-[state=active]:rounded-md md:min-w-[178px] font-semibold text-[16px] text-neutral-500 data-[state=active]:text-neutral-1000 leading-[20px] cursor-pointer data-[state=active]:cursor-default"
                value="crypto-acquiring"
              >
                Crypto Acquiring
              </Tabs.Trigger>

              <Tabs.Trigger
                className="flex-grow data-[state=active]:bg-neutral px-4 py-1 data-[state=active]:rounded-md md:min-w-[178px] font-semibold text-[16px] text-neutral-500 data-[state=active]:text-neutral-1000 leading-[20px] cursor-pointer data-[state=active]:cursor-default"
                value="crypto-processing"
              >
                Crypto Processing
              </Tabs.Trigger>
            </Tabs.List>

            <CryptoAcquiringTabContent />
            <CryptoProcessingTabContent />
          </Tabs.Root>

          <p className="flex flex-grow justify-center items-center gap-1.5 mb-14 text-neutral-500">
            <InfoCircleFilledIcon width={20} height={20} />

            <span className="text-neutral-700 text-base">
              Deposit fee depends on plan but is always{" "}
              <span className="font-semibold text-neutral-1000">
                not less than 1.5 EUR
              </span>
            </span>
          </p>

          <div className="gap-[56px] xl:gap-0 grid grid-cols-1 xl:grid-cols-3 bg-neutral-100 px-6 py-10 rounded-2xl">
            <div className="flex flex-col justify-between gap-2 text-center">
              <div className="font-bold text-[32px] leading-[36px]">5 EUR</div>

              <div className="font-medium text-[20px] leading-[26px]">
                Crypto withdrawal fee
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="font-bold text-[32px] leading-[36px]">0.5%</div>

              <div className="mb-2 font-medium text-neutral-500 text-base">
                (min 5 EUR)
              </div>

              <div className="font-medium text-[20px] leading-[26px]">
                Fiat withdrawal fee
              </div>
            </div>

            <div className="flex flex-col justify-between text-center">
              <div className="font-bold text-[32px] leading-[36px]">1%</div>

              <div className="mb-2 font-medium text-neutral-500 text-base">
                (min 5 EUR per transaction)
              </div>

              <div className="font-medium text-[20px] leading-[26px]">
                Mass payout fee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
PricingSection.displayName = "PricingSection";

const CryptoAcquiringTabContent = memo(() => {
  return (
    <Tabs.Content value="crypto-acquiring">
      <div className="gap-[60px] xl:gap-6 grid grid-cols-1 xl:grid-cols-2 pt-[72px] pb-8">
        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 p-1 rounded-2xl min-h-[280px]"
          style={{
            boxShadow:
              "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
          }}
        >
          <Image
            className="-top-10 left-8 absolute"
            src={blackGemPng}
            alt=""
            aria-hidden="true"
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
                Per successful invoice payment
              </div>
            </div>

            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              palette="primary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>Get started</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <ul className="flex flex-col gap-4 bg-neutral-50 p-8 rounded-xl min-h-[232px]">
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Unlock the vast crypto audience of 425 million
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Enhance revenue generation
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Minimize transaction costs
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Access users globally
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Keep up with the times
              </span>
            </li>
          </ul>
        </div>

        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 bg-gold-500 p-1 rounded-2xl min-h-[280px]"
          style={{
            boxShadow:
              "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
          }}
        >
          <Image
            className="-top-10 left-8 absolute"
            src={goldGemPng}
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            style={{
              filter: "drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.16))",
            }}
          />

          <div className="flex flex-col gap-10 p-8">
            <div className="flex flex-col flex-grow gap-4 pt-12">
              <div className="font-bold text-4xl">Custom</div>

              <div className="text-neutral-700 text-base">
                From 15 000 EUR per transaction
              </div>
            </div>

            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              palette="secondary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="mailto:sales@goldenratio.exchange">
                <ButtonText>Contact sales</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 bg-gold-400 p-8 rounded-xl min-h-[232px]">
            If you handle significant volumes, our personalized commission
            structure fits your needs. Contact us for details and let's enhance
            your experience!
          </div>
        </div>
      </div>
    </Tabs.Content>
  );
});
CryptoAcquiringTabContent.displayName = "CryptoAcquiringTabContent";

const CryptoProcessingTabContent = memo(() => {
  return (
    <Tabs.Content value="crypto-processing">
      <div className="gap-[60px] xl:gap-6 grid grid-cols-1 xl:grid-cols-2 pt-[72px] pb-8">
        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 p-1 rounded-2xl min-h-[280px]"
          style={{
            boxShadow:
              "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
          }}
        >
          <Image
            className="-top-10 left-8 absolute"
            src={blackGemPng}
            alt=""
            aria-hidden="true"
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
                Per successful invoice payment
              </div>
            </div>

            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              palette="primary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>Get started</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <ul className="flex flex-col gap-4 bg-neutral-50 p-8 rounded-xl min-h-[232px]">
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Unlock the vast crypto audience of 425 million
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Enhance revenue generation
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Minimize transaction costs
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Access users globally
              </span>
            </li>
            <li className="flex gap-1.5">
              <CheckCircleFilledIcon
                className="flex-shrink-0 text-green-500"
                width={20}
                height={20}
              />
              <span className="font-medium text-base">
                Keep up with the times
              </span>
            </li>
          </ul>
        </div>

        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 bg-gold-500 p-1 rounded-2xl min-h-[280px]"
          style={{
            boxShadow:
              "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
          }}
        >
          <Image
            className="-top-10 left-8 absolute"
            src={goldGemPng}
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            style={{
              filter: "drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.16))",
            }}
          />

          <div className="flex flex-col gap-10 p-8">
            <div className="flex flex-col flex-grow gap-4 pt-12">
              <div className="font-bold text-4xl">Custom</div>

              <div className="text-neutral-700 text-base">
                From 15 000 EUR per transaction
              </div>
            </div>

            <ButtonRoot
              className="max-w-[180px] xl:max-w-full"
              palette="secondary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="mailto:sales@goldenratio.exchange">
                <ButtonText>Contact sales</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 bg-gold-400 p-8 rounded-xl min-h-[232px]">
            If you handle significant volumes, our personalized commission
            structure fits your needs. Contact us for details and let's enhance
            your experience!
          </div>
        </div>
      </div>
    </Tabs.Content>
  );
});
CryptoProcessingTabContent.displayName = "CryptoProcessingTabContent";

import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";

import gdprPng from "./pay/(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./pay/(icons)/ChainAnalysisLogo";
import { FooterLogoIcon, VerticalDividerIcon } from "@/modules/shared/icons";
import { ComingSoonBadge } from "@/modules/shared/header/components/ComingSoonBadge";
import { MasterCardLogo } from "./pay/(icons)/MasterCardLogo";
import { SEPALogo } from "./pay/(icons)/SEPALogo";
import { VISALogo } from "./pay/(icons)/VISALogo";
import { ZENLogo } from "./pay/(icons)/ZENLogo";
import { ContactUsModal } from "@/modules/contact-us";

const ACCEPTED_CRYPTO_LIST = [
  "USDT",
  "BTC",
  "ETH",
  "USDC",
  "DAI",
  "XLM",
  "BCH",
  "DASH",
  "DOGE",
] as const;

type FooterT = Awaited<ReturnType<typeof getTranslations>>;

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="flex flex-col bg-neutral-100 dark:bg-neutral-900 py-16 sm:py-20">
      <div className="px-4 sm:px-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <FooterNav t={t} className="mb-10" />

          <AcceptCryptoList t={t} className="mb-10" />

          <IntegrationsList className="mb-10" />

          <div className="mb-10 text-sm font-normal leading-5 text-neutral-500 dark:text-neutral-400">
            {t("Pay.Root.footer.copyright", {
              year: String(new Date().getFullYear()),
            })}
          </div>

          <p className="w-full max-w-[1180px] text-left text-sm font-normal leading-5 tracking-normal text-neutral-500 dark:text-neutral-400">
            {t("Pay.Root.footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}

type FooterNavProps = {
  t: FooterT;
  className?: string;
};

const navHeadingClass =
  "text-base font-semibold leading-6 text-neutral-1000 dark:text-neutral";
const navLinkClass =
  "text-sm font-normal leading-5 text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-1000 dark:hover:text-neutral";
const navLinkComingSoonClass =
  "text-sm font-normal leading-5 text-neutral-400 dark:text-neutral-600";

function FooterNav({ t, className }: FooterNavProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-10",
        "lg:flex-row lg:items-start lg:justify-between lg:gap-[172px]",
        className
      )}
    >
      <Link
        href={ROUTES.home}
        className="flex items-center gap-2 shrink-0"
        aria-label="GRX - Golden Ratio Exchange"
      >
        <FooterLogoIcon className="h-9 w-auto shrink-0 text-neutral-1000 dark:text-neutral" />
        <span className="font-unbounded text-[18px] font-medium leading-[0.98] tracking-[-0.36px] text-neutral-1000 dark:text-neutral">
          <span className="block">GOLDEN RATIO</span>
          <span className="block">EXCHANGE</span>
        </span>
      </Link>

      <div className="flex flex-wrap gap-x-[53px] gap-y-10 md:justify-between lg:flex-1 lg:justify-end lg:gap-x-20">
        <div className="flex flex-col gap-4">
          <span className={navHeadingClass}>
            {t("Pay.Root.footer.products")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={ROUTES.pay} className={navLinkClass}>
                {t("Pay.Root.footer.grxPay")}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className={navLinkComingSoonClass}>
                {t("Pay.Root.footer.grxExchange")}
              </span>
              <ComingSoonBadge variant="neutral">
                {t("Pay.Root.footer.comingSoon")}
              </ComingSoonBadge>
            </li>
            <li className="flex items-center gap-2">
              <span className={navLinkComingSoonClass}>
                {t("Pay.Root.footer.grxRwa")}
              </span>
              <ComingSoonBadge variant="neutral">
                {t("Pay.Root.footer.comingSoon")}
              </ComingSoonBadge>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className={navHeadingClass}>
            {t("Pay.Root.footer.grxPaySection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={ROUTES.payPricing} className={navLinkClass}>
                {t("Pay.Root.footer.pricing")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.payPartnerProgram} className={navLinkClass}>
                {t("Pay.Root.footer.partners")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.payFaq} className={navLinkClass}>
                {t("Pay.Root.footer.faq")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.payAboutUs} className={navLinkClass}>
                {t("Pay.Root.footer.aboutGrxPay")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className={navHeadingClass}>
            {t("Pay.Root.footer.aboutSection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={ROUTES.aboutUs} className={navLinkClass}>
                {t("Pay.Root.footer.aboutGrx")}
              </Link>
            </li>
            <li>
              <ContactUsModal
                defaultValues={{
                  interestedIn: ["grxPay"],
                }}
              >
                <button
                  type="button"
                  className={clsx(navLinkClass, "cursor-pointer")}
                >
                  {t("Pay.Root.footer.contactGrx")}
                </button>
              </ContactUsModal>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className={navHeadingClass}>{t("Pay.Root.footer.legal")}</span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href={ROUTES.privacyPolicy} className={navLinkClass}>
                {t("Pay.Root.footer.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.termsOfUse} className={navLinkClass}>
                {t("Pay.Root.footer.termsOfUse")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.cookiePolicy} className={navLinkClass}>
                {t("Pay.Root.footer.cookiePolicy")}
              </Link>
            </li>
            <li>
              <Link href={ROUTES.amlPolicy} className={navLinkClass}>
                {t("Pay.Root.footer.amlPolicy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

type AcceptCryptoListProps = {
  t: FooterT;
  className?: string;
};

function AcceptCryptoList({ t, className }: AcceptCryptoListProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-x-3 gap-y-1",
        "text-xs font-normal leading-4 text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      <span>{t("Pay.Root.footer.acceptCrypto")}</span>
      {ACCEPTED_CRYPTO_LIST.map((crypto, index, array) => (
        <Fragment key={crypto}>
          <span>{crypto}</span>
          {index !== array.length - 1 && (
            <span
              className="shrink-0 text-neutral-200 dark:text-neutral-700"
              aria-hidden
            >
              <VerticalDividerIcon className="h-4 w-px" />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

type IntegrationsListProps = {
  className?: string;
};

function IntegrationsList({ className }: IntegrationsListProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-6 text-neutral-400 dark:text-neutral-600 sm:gap-8",
        className
      )}
    >
      <ChainAnalysisLogo />
      <Image src={gdprPng} alt="" width={24} height={24} />
      <VISALogo />
      <MasterCardLogo />
      <ZENLogo />
      <SEPALogo />
    </div>
  );
}

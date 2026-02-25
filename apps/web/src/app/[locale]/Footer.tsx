import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, memo } from "react";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";

import gdprPng from "./pay/(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./pay/(icons)/ChainAnalysisLogo";
import { FooterLogo } from "@/modules/shared/icons";
import { ComingSoonBadge } from "@/modules/shared/header/components/ComingSoonBadge";
import { MasterCardLogo } from "./pay/(icons)/MasterCardLogo";
import { SEPALogo } from "./pay/(icons)/SEPALogo";
import { VISALogo } from "./pay/(icons)/VISALogo";
import { ZENLogo } from "./pay/(icons)/ZENLogo";
import { ContactUsModal } from "@/modules/contact-us";

type FooterT = Awaited<ReturnType<typeof getTranslations>>;

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="flex flex-col bg-neutral-100 py-16 sm:py-20">
      <div className="mx-auto px-4 w-full max-w-[704px] lg:max-w-[1180px]">
        <FooterNav t={t} className="mb-12" />

        <AcceptCryptoList t={t} className="mb-8" />

        <IntegrationsList className="mb-8" />

        <div className="mb-6 text-neutral-500 text-sm">
          {t("Pay.Root.footer.copyright", {
            year: String(new Date().getFullYear()),
          })}
        </div>

        <p className="max-w-[1180px] text-neutral-500 text-xs leading-relaxed">
          {t("Pay.Root.footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
}

type FooterNavProps = {
  t: FooterT;
  className?: string;
};

const FooterNav = memo(({ t, className }: FooterNavProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-10",
        "lg:flex-row lg:items-start lg:justify-between lg:gap-12",
        className
      )}
    >
      <Link href={ROUTES.pay} className="shrink-0">
        <FooterLogo className="w-auto h-8 text-neutral-900" />
      </Link>

      <div className="flex flex-wrap lg:flex-1 md:justify-between lg:justify-end gap-x-12 gap-y-10 lg:gap-x-16">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-neutral-900 text-base">
            {t("Pay.Root.footer.products")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={ROUTES.pay}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.grxPay")}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-600 text-sm">
                {t("Pay.Root.footer.grxExchange")}
              </span>
              <ComingSoonBadge variant="neutral">
                {t("Pay.Root.footer.comingSoon")}
              </ComingSoonBadge>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-600 text-sm">
                {t("Pay.Root.footer.grxRwa")}
              </span>
              <ComingSoonBadge variant="neutral">
                {t("Pay.Root.footer.comingSoon")}
              </ComingSoonBadge>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-neutral-900 text-base">
            {t("Pay.Root.footer.grxPaySection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={ROUTES.payPricing}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.pricing")}
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.payPartnerProgram}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.partners")}
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.payFaq}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.faq")}
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.payAboutUs}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.aboutGrxPay")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-neutral-900 text-base">
            {t("Pay.Root.footer.aboutSection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={ROUTES.aboutUs}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.aboutGrx")}
              </Link>
            </li>
            <li>
              <ContactUsModal
                defaultValues={{
                  interestedIn: ["grxPay"],
                }}
              >
                <button className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors cursor-pointer">
                  {t("Pay.Root.footer.contactGrx")}
                </button>
              </ContactUsModal>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-neutral-900 text-base">
            {t("Pay.Root.footer.legal")}
          </span>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href={ROUTES.payTermsOfUse}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.termsOfUse")}
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.cookiePolicy}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.cookiePolicy")}
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.payAmlPolicy}
                className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.footer.amlPolicy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
FooterNav.displayName = "FooterNav";

type AcceptCryptoListProps = {
  t: FooterT;
  className?: string;
};

function AcceptCryptoList({ t, className }: AcceptCryptoListProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-500 text-sm",
        className
      )}
    >
      <span>{t("Pay.Root.footer.acceptCrypto")}</span>
      {["USDT", "BTC", "ETH", "USDC", "DAI", "XLM", "BCH", "DASH", "DOGE"].map(
        (crypto, index, array) => (
          <Fragment key={crypto}>
            <span>{crypto}</span>
            {index !== array.length - 1 && (
              <span className="text-neutral-300">|</span>
            )}
          </Fragment>
        )
      )}
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
        "flex flex-wrap items-center gap-6 sm:gap-8 text-neutral-400",
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

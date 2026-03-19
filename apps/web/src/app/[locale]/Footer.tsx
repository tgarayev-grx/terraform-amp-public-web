import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, PropsWithChildren } from "react";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { Badge } from "@grx/ui";

import gdprPng from "./pay/(assets)/gdpr.webp";
import { ChainAnalysisLogo } from "@grx/ui/icons/ChainAnalysisLogo";
import { FooterLogoIcon } from "@grx/ui/icons/FooterLogoIcon";
import { VerticalDividerIcon } from "@grx/ui/icons/VerticalDividerIcon";
import { MasterCardLogo } from "@grx/ui/icons/MasterCardLogo";
import { SEPALogo } from "@grx/ui/icons/SEPALogo";
import { VISALogo } from "@grx/ui/icons/VISALogo";
import { ZENLogo } from "@grx/ui/icons/ZENLogo";

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
    <footer className="bg-bg-weak-100 py-20 sm:py-24">
      <div className="px-4 sm:px-8 lg:px-[130px]">
        <div className="flex flex-col gap-10 mx-auto w-full max-w-[1180px]">
          <FooterNav t={t} />

          <p className="text-body-md-regular text-text-soft-500">
            {t("Pay.Root.footer.copyright", {
              year: String(new Date().getFullYear()),
            })}
          </p>

          <p className="w-full max-w-[1180px] text-body-sm-regular text-text-soft-500 sm:text-body-md-regular">
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

function FooterNav({ t, className }: FooterNavProps) {
  return (
    <div
      className={clsx(
        "flex lg:flex-row flex-col lg:justify-between lg:items-start lg:gap-10",
        className
      )}
    >
      <Link
        href={ROUTES.home}
        className="flex items-center gap-2 mb-10 lg:mb-0 shrink-0"
        aria-label="GRX - Golden Ratio Exchange"
      >
        <FooterLogoIcon className="w-auto h-9 text-text-strong-1000 shrink-0" />
        <span className="font-unbounded font-medium text-[18px] text-text-strong-1000 leading-[0.98] tracking-[-0.36px]">
          <span className="block">GOLDEN RATIO</span>
          <span className="block">EXCHANGE</span>
        </span>
      </Link>

      <div className="flex sm:flex-row flex-col sm:justify-between lg:justify-start gap-10 lg:gap-20 w-full lg:w-auto">
        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.grxPaySection")}</FooterNavTitle>
          <FooterNavList>
            <FooterNavItemLink href={ROUTES.pay}>
              {t("Pay.Root.footer.forMerchants")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.payPricing}>
              {t("Pay.Root.footer.pricing")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.payDemo}>
              {t("Pay.Root.footer.bookDemo")}
            </FooterNavItemLink>
          </FooterNavList>
        </FooterNavRoot>

        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.company")}</FooterNavTitle>
          <FooterNavList>
            <FooterNavItemLink href={ROUTES.aboutUs}>
              {t("Pay.Root.footer.aboutGrx")}
            </FooterNavItemLink>
          </FooterNavList>
        </FooterNavRoot>

        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.legal")}</FooterNavTitle>
          <FooterNavList>
            <FooterNavItemLink href={ROUTES.privacyPolicy}>
              {t("Pay.Root.footer.privacyPolicy")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.termsOfUse}>
              {t("Pay.Root.footer.termsOfUse")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.cookiePolicy}>
              {t("Pay.Root.footer.cookiePolicy")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.amlPolicy}>
              {t("Pay.Root.footer.amlPolicy")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.imprint}>
              {t("Pay.Root.footer.imprint")}
            </FooterNavItemLink>
          </FooterNavList>
        </FooterNavRoot>
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
        "text-text-soft-500 text-body-sm-regular",
        className
      )}
    >
      <span>{t("Pay.Root.footer.acceptCrypto")}</span>

      {ACCEPTED_CRYPTO_LIST.map((crypto, index, array) => (
        <Fragment key={crypto}>
          <span>{crypto}</span>

          {index !== array.length - 1 && (
            <span className="text-stroke-soft-200 shrink-0" aria-hidden>
              <VerticalDividerIcon className="w-px h-4" />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function IntegrationsList() {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-8 text-icon-disabled"
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

const FooterNavRoot = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

const FooterNavTitle = ({ children }: PropsWithChildren) => {
  return (
    <span className="text-body-lg-semibold text-text-strong-1000">
      {children}
    </span>
  );
};

const FooterNavList = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

const FooterNavItemLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  return (
    <li>
      <Link
        className="text-body-md-regular text-text-soft-500 hover:text-text-strong-1000 transition-colors"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

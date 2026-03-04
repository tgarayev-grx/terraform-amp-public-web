import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, PropsWithChildren } from "react";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { Badge } from "@grx/ui";

import gdprPng from "./pay/(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./pay/(icons)/ChainAnalysisLogo";
import { FooterLogoIcon, VerticalDividerIcon } from "@/modules/shared/icons";
import { MasterCardLogo } from "./pay/(icons)/MasterCardLogo";
import { SEPALogo } from "./pay/(icons)/SEPALogo";
import { VISALogo } from "./pay/(icons)/VISALogo";
import { ZENLogo } from "./pay/(icons)/ZENLogo";

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

const FooterNavItemComingSoon = ({
  children,
  t,
}: PropsWithChildren<{ t: FooterT }>) => {
  return (
    <li className="flex items-center gap-2">
      <span className="text-body-md-regular text-text-disabled">
        {children}
      </span>
      <Badge palette="neutral" variant="light" size="sm">
        {t("Pay.Root.footer.comingSoon")}
      </Badge>
    </li>
  );
};

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
    <footer className="bg-neutral-800 py-16 sm:py-20 lg:py-24">
      <div className="px-4 sm:px-8 lg:px-[130px]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10">
          <FooterNav t={t} />

          <AcceptCryptoList t={t} />

          <IntegrationsList />

          <p className="text-sm font-normal leading-5 text-neutral-400">
            {t("Pay.Root.footer.copyright", {
              year: String(new Date().getFullYear()),
            })}
          </p>

          <p className="w-full text-sm font-normal leading-5 tracking-normal text-neutral-400">
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
        "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between",
        className
      )}
    >
      <Link
        href={ROUTES.home}
        className="flex items-center gap-2 shrink-0"
        aria-label="GRX - Golden Ratio Exchange"
      >
        <FooterLogoIcon className="h-9 w-auto shrink-0 text-text-strong-1000" />
        <span className="font-unbounded text-[18px] font-medium leading-[0.98] tracking-[-0.36px] text-text-strong-1000">
          <span className="block">GOLDEN RATIO</span>
          <span className="block">EXCHANGE</span>
        </span>
      </Link>

      <div className="flex flex-wrap gap-x-14 gap-y-10 lg:gap-x-20">
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
            {/* <FooterNavItemLink href={ROUTES.payDocs}>
              {t("Pay.Root.footer.apiDocumentation")}
            </FooterNavItemLink> */}
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
        "text-xs font-normal leading-4 text-neutral-400",
        className
      )}
    >
      <span>{t("Pay.Root.footer.acceptCrypto")}</span>
      {ACCEPTED_CRYPTO_LIST.map((crypto, index, array) => (
        <Fragment key={crypto}>
          <span>{crypto}</span>

          {index !== array.length - 1 && (
            <span className="shrink-0 text-neutral-700" aria-hidden>
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
        "flex flex-wrap items-center gap-6 text-neutral-600 sm:gap-8",
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

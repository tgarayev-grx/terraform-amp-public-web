import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, PropsWithChildren, ReactNode } from "react";

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
    <footer className="flex flex-col bg-bg-weak-100 py-16 sm:py-20">
      <div className="px-4 sm:px-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <FooterNav t={t} className="mb-10" />

          <AcceptCryptoList t={t} className="mb-10" />

          <IntegrationsList className="mb-10" />

          <div className="mb-10 text-body-md-regular text-text-soft-500">
            {t("Pay.Root.footer.copyright", {
              year: String(new Date().getFullYear()),
            })}
          </div>

          <p className="w-full max-w-[1180px] text-body-md-regular text-text-soft-500">
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
        <FooterLogoIcon className="w-auto h-9 text-text-strong-1000 shrink-0" />
        <span className="font-unbounded font-medium text-[18px] text-text-strong-1000 leading-[0.98] tracking-[-0.36px]">
          <span className="block">GOLDEN RATIO</span>
          <span className="block">EXCHANGE</span>
        </span>
      </Link>

      <div className="flex flex-wrap lg:flex-1 md:justify-between lg:justify-end gap-x-[53px] gap-y-10 lg:gap-x-20">
        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.products")}</FooterNavTitle>

          <FooterNavList>
            <FooterNavItemLink href={ROUTES.pay}>
              {t("Pay.Root.footer.grxPay")}
            </FooterNavItemLink>

            <FooterNavItemComingSoon t={t}>
              {t("Pay.Root.footer.grxExchange")}
            </FooterNavItemComingSoon>

            <FooterNavItemComingSoon t={t}>
              {t("Pay.Root.footer.grxRwa")}
            </FooterNavItemComingSoon>
          </FooterNavList>
        </FooterNavRoot>

        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.grxPaySection")}</FooterNavTitle>

          <FooterNavList>
            <FooterNavItemLink href={ROUTES.payPricing}>
              {t("Pay.Root.footer.pricing")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.payPartnerProgram}>
              {t("Pay.Root.footer.partners")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.payFaq}>
              {t("Pay.Root.footer.faq")}
            </FooterNavItemLink>

            <FooterNavItemLink href={ROUTES.payAboutUs}>
              {t("Pay.Root.footer.aboutGrxPay")}
            </FooterNavItemLink>
          </FooterNavList>
        </FooterNavRoot>

        <FooterNavRoot>
          <FooterNavTitle>{t("Pay.Root.footer.aboutSection")}</FooterNavTitle>

          <FooterNavList>
            <FooterNavItemLink href={ROUTES.aboutUs}>
              {t("Pay.Root.footer.aboutGrx")}
            </FooterNavItemLink>

            <ContactUsModal
              defaultValues={{
                interestedIn: ["grxPay"],
              }}
            >
              <FooterNavItemButton>
                {t("Pay.Root.footer.contactGrx")}
              </FooterNavItemButton>
            </ContactUsModal>
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

type IntegrationsListProps = {
  className?: string;
};

function IntegrationsList({ className }: IntegrationsListProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-6 sm:gap-8 text-icon-disabled",
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
}: PropsWithChildren & {
  href: string;
}) => {
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

const FooterNavItemButton = ({ children }: PropsWithChildren) => {
  return (
    <li>
      <button
        className="text-body-md-regular text-text-soft-500 hover:text-text-strong-1000 transition-colors"
        type="button"
      >
        {children}
      </button>
    </li>
  );
};

const FooterNavItemComingSoon = ({
  children,
  t,
}: PropsWithChildren & {
  t: FooterT;
}) => {
  return (
    <li className="flex items-center gap-2">
      <span className="text-body-md-regular text-text-disabled">
        {children}
      </span>

      <ComingSoonBadge variant="neutral" size="sm">
        {t("Pay.Root.footer.comingSoon")}
      </ComingSoonBadge>
    </li>
  );
};

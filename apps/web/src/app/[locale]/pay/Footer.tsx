import clsx from "clsx";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Fragment, memo } from "react";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

import gdprPng from "./(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./(icons)/ChainAnalysisLogo";
import { FooterLogo } from "./(icons)/FooterLogo";
import { MasterCardLogo } from "./(icons)/MasterCardLogo";
import { SEPALogo } from "./(icons)/SEPALogo";
import { VISALogo } from "./(icons)/VISALogo";
import { ZENLogo } from "./(icons)/ZENLogo";

type FooterT = Awaited<ReturnType<typeof getTranslations>>;

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="flex flex-col items-center bg-neutral-100 px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <FooterNav t={t} className="mb-10" />

        <AcceptCryptoList t={t} className="mb-10" />

        <IntegrationsList className="mb-10" />

        <div className="text-neutral-500 text-sm">
          {t("Pay.Root.footer.copyright", {
            year: String(new Date().getFullYear()),
          })}
        </div>
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
        "flex flex-col gap-8",
        "lg:flex-row lg:items-start",
        className
      )}
    >
      <Link href="/" className="shrink-0">
        <FooterLogo />
      </Link>

      {/* Auto gap: flexible space between logo and link columns (per Figma) */}
      <div className="hidden lg:block lg:flex-1 lg:min-w-0" aria-hidden />

      <div className="flex sm:flex-row flex-col gap-8 sm:gap-[160px]">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">
            {t("Pay.Root.footer.productSection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/pricing">{t("Pay.Root.footer.pricing")}</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/partner-program">
                {t("Pay.Root.footer.partnerProgram")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">
            {t("Pay.Root.footer.aboutSection")}
          </span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/about-us">{t("Pay.Root.footer.aboutUs")}</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/faq">{t("Pay.Root.footer.faq")}</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">
            {t("Pay.Root.footer.documents")}
          </span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/terms-of-use">
                {t("Pay.Root.footer.termsOfUse")}
              </Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/privacy-policy">
                {t("Pay.Root.footer.privacyPolicy")}
              </Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/cookie-policy">
                {t("Pay.Root.footer.cookiePolicy")}
              </Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/aml-policy">
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
        "flex flex-wrap items-center gap-3 text-neutral-500 text-xs text-nowrap",
        className
      )}
    >
      {t("Pay.Root.footer.acceptCrypto")}{" "}
      {["USDT", "BTC", "ETH", "USDC", "DAI", "XLM", "BCH", "DASH", "DOGE"].map(
        (crypto, index, array) => (
          <Fragment key={crypto}>
            <span>{crypto}</span>
            {index !== array.length - 1 && (
              <span className="text-neutral-200">|</span>
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
        "flex flex-wrap items-center gap-8 text-neutral-400",
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

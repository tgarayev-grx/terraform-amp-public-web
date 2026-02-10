import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Fragment, memo } from "react";

import gdprPng from "./(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./(icons)/ChainAnalysisLogo";
import { FooterLogo } from "./(icons)/FooterLogo";
import { MasterCardLogo } from "./(icons)/MasterCardLogo";
import { SEPALogo } from "./(icons)/SEPALogo";
import { VISALogo } from "./(icons)/VISALogo";
import { ZENLogo } from "./(icons)/ZENLogo";

export const Footer = memo(() => {
  return (
    <footer className="flex flex-col items-center bg-neutral-50 px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <FooterNav className="mb-10" />

        <AcceptCryptoList className="mb-10" />

        <IntegrationsList className="mb-10" />

        <div className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} GRX. All rights reserved
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

type FooterNavProps = {
  className?: string;
};

const FooterNav = memo(({ className }: FooterNavProps) => {
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

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-[160px]">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Product</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/pricing">Pricing</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/partner-program">Partners</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">About</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/about">About Us</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Documents</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/terms-of-use">Terms of use</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/cookie-policy">Cookie policy</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/aml-policy">AML policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
FooterNav.displayName = "FooterNav";

type AcceptCryptoListProps = {
  className?: string;
};

function AcceptCryptoList({ className }: AcceptCryptoListProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-3 text-neutral-500 text-xs text-nowrap",
        className
      )}
    >
      Accept crypto:{" "}
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

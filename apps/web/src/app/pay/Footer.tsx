import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Fragment, memo } from "react";

import gdrpPng from "./(assets)/gdpr.png";
import { ChainAnalysisLogo } from "./(icons)/ChainAnalysisLogo";
import { FooterLogo } from "./(icons)/FooterLogo";
import { MasterCardLogo } from "./(icons)/MasterCardLogo";
import { SEPALogo } from "./(icons)/SEPALogo";
import { VISALogo } from "./(icons)/VISALogo";
import { ZENLogo } from "./(icons)/ZENLogo";

export const Footer = memo(() => {
  return (
    <footer className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <FooterNav className="mb-10" />

        <AcceptCryptoList className="mb-10" />

        <IntegrationsList className="mb-10" />

        <div className="flex flex-col gap-4 mb-10 text-red-500 text-xs">
          <p>
            UAB Kuna Pro is registered as a crypto currency exchange operator
            and a crypto currency wallet operator and is authorized to provide
            virtual currency services in accordance with Lithuanian legislation.
          </p>

          <p>
            The site and other components of the services are protected by
            intellectual property laws. All rights reserved. Access to the
            services and the site is provided under the KUNA trademark
            registered in the Madrid system, which covers the UK, Armenia,
            Azerbaijan, Belarus, Georgia, Kazakhstan, Turkey, Ukraine, and the
            European Union.
          </p>
        </div>

        <div className="text-neutral-500 text-sm">
          © GRX Pay {new Date().getFullYear()}. All rights reserved
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
        "lg:flex-row lg:justify-between",
        className
      )}
    >
      <Link href="/">
        <FooterLogo />
      </Link>

      <div className="lg:contents flex sm:flex-row flex-col sm:flex-wrap sm:justify-between gap-8 w-full">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Products</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/crypto-acquiring">Crypto acquiring</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/cases">Cases</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/pricing">Pricing</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Documents</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/privacy-policy">Privacy policy</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/cookie-policy">Cookie policy</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/aml-policy">AML policy</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/terms-of-use">Terms of use</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/media-kit">Media-kit</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Learn</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/partner-program">Partner program</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/faq">FAQ</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/api">API references</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold text-base">Contact us</span>
          <ul className="flex flex-col gap-4">
            <li className="text-neutral-700 text-sm">
              <Link href="/pay/about">About us</Link>
            </li>
            <li className="text-neutral-700 text-sm">
              <Link href="/pay">Telegram support</Link>
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
      {["BTC", "ETH", "USDT", "USDC", "DAI", "XLM", "BCH", "DASH", "DOGE"].map(
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

      <Image src={gdrpPng} alt="" width={24} height={24} />

      <VISALogo />

      <MasterCardLogo />

      <ZENLogo />

      <SEPALogo />
    </div>
  );
}

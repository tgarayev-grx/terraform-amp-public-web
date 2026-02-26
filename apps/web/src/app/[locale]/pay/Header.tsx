"use client";

import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocale, useTranslations } from "next-intl";
import { LogoPay } from "@grx/ui/icons/brand/pay/logo";
import { ButtonRoot, ButtonText } from "@grx/ui";
import {
  Link,
  usePathname,
} from "@/modules/cross-cutting-concerns/i18n/navigation";

import { ShevronDownIcon } from "./(icons)/ShevronDownIcon";
import { GlobeIcon } from "./(icons)/GlobeIcon";
import { FlagEn } from "./(icons)/FlagEn";
import { FlagBg } from "./(icons)/FlagBg";
import { FlagFr } from "./(icons)/FlagFr";
import { FlagEs } from "./(icons)/FlagEs";
import { MenuIcon } from "./(icons)/MenuIcon";
import { CloseIcon } from "./(icons)/CloseIcon";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";

export function Header() {
  const t = useTranslations();

  return (
    <header className="top-0 z-50 sticky bg-neutral border-neutral-200 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 max-w-[1180px] h-16">
        <Link href="/pay" className="flex items-center">
          <LogoPay className="w-auto h-8 text-neutral-900" />
        </Link>

        <nav className="hidden lg:flex justify-center items-center gap-8">
          <Link
            href="/pay/pricing"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            {t("Pay.Root.header.nav.pricing")}
          </Link>
          <Link
            href="/pay/partner-program"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            {t("Pay.Root.header.nav.partners")}
          </Link>
          <Link
            href="/pay/about-us"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            {t("Pay.Root.header.nav.aboutUs")}
          </Link>
          <Link
            href="/pay/faq"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            {t("Pay.Root.header.nav.faq")}
          </Link>
        </nav>

        <div className="hidden lg:flex justify-end items-center gap-6">
          <LocalizationSelect />

          <div className="flex items-center gap-3">
            <ButtonRoot
              asChild
              palette="secondary"
              variant="contained"
              size="sm"
            >
              <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                <ButtonText>{t("Pay.Root.header.nav.signIn")}</ButtonText>
              </Link>
            </ButtonRoot>

            <ButtonRoot asChild palette="primary" variant="contained" size="sm">
              <Link href="/create-account" target="_blank">
                <ButtonText>
                  {t("Pay.Root.header.nav.createAccount")}
                </ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="lg:hidden flex justify-end">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const t = useTranslations();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex justify-center items-center w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors">
          <MenuIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 fixed inset-0 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="top-0 right-0 z-50 fixed flex flex-col bg-neutral shadow-lg w-full max-w-[375px] h-full overflow-y-auto data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {t("Pay.Root.header.nav.menu")}
          </Dialog.Title>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center px-4 py-3 border-neutral-200 border-b">
              <LogoPay className="w-auto h-8 text-neutral-900" />
              <Dialog.Close asChild>
                <button className="flex justify-center items-center w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors">
                  <CloseIcon className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-col flex-grow px-2 pt-6">
              <Link
                href="/pay/pricing"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.header.nav.pricing")}
              </Link>
              <Link
                href="/pay/partner-program"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.header.nav.partners")}
              </Link>
              <Link
                href="/pay/about-us"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.header.nav.aboutUs")}
              </Link>
              <Link
                href="/pay/faq"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                {t("Pay.Root.header.nav.faq")}
              </Link>
            </nav>

            <div className="flex flex-col gap-6 px-2 pt-4 pb-6">
              <LocalizationSelect />

              <div className="flex flex-col gap-3">
                <ButtonRoot
                  asChild
                  palette="primary"
                  variant="contained"
                  size="md"
                >
                  <Link href="/create-account" target="_blank">
                    <ButtonText>
                      {t("Pay.Root.header.nav.createAccount")}
                    </ButtonText>
                  </Link>
                </ButtonRoot>

                <ButtonRoot
                  asChild
                  palette="secondary"
                  variant="contained"
                  size="md"
                >
                  <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                    <ButtonText>{t("Pay.Root.header.nav.signIn")}</ButtonText>
                  </Link>
                </ButtonRoot>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LocalizationSelect() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const languages = [
    { code: "en", name: t("Pay.Root.header.languages.en"), flag: <FlagEn /> },
    { code: "bg", name: t("Pay.Root.header.languages.bg"), flag: <FlagBg /> },
    { code: "fr", name: t("Pay.Root.header.languages.fr"), flag: <FlagFr /> },
    { code: "es", name: t("Pay.Root.header.languages.es"), flag: <FlagEs /> },
  ] as const;
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="group flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm transition-colors">
          <GlobeIcon className="w-6 h-6" />

          <span className="text-neutral-1000 hover:text-neutral-900 text-sm uppercase transition-colors">
            {currentLanguage.code}
          </span>

          <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 bg-neutral shadow-lg p-2 border border-neutral-200 rounded-xl min-w-[180px] [transform-origin:var(--radix-popover-content-transform-origin)] data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in"
          sideOffset={24}
          align="start"
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              className="flex items-center gap-3 hover:bg-neutral-100 p-2 rounded-lg w-full transition-colors"
              href={pathname}
              locale={lang.code}
            >
              <div className="flex justify-center items-center rounded-full w-6 h-6">
                {lang.flag}
              </div>

              <div className="flex flex-col items-center py-0.5">
                <span className="text-neutral-1000 text-sm text-left">
                  {lang.name} ({lang.code.toUpperCase()})
                </span>
              </div>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

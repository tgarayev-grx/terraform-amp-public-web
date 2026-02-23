"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { usePathname } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { useEffect, useState } from "react";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { CloseIcon, FooterLogo, MenuIcon, ShevronDownIcon } from "../../icons";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { LocalizationSelect } from "./LocalizationSelect";
import { ROUTES } from "../routes";
import clsx from "clsx";

export type HeaderTheme = "light" | "dark";

const themeClasses = {
  light: {
    navLinkMobile: "text-neutral-700 hover:text-neutral-900",
    dropdownItemDisabled: "text-neutral-500 cursor-not-allowed",
    sidebar: "bg-neutral border-neutral-200",
    logo: "text-neutral-900",
  },
  dark: {
    navLinkMobile: "text-neutral-300 hover:text-neutral",
    dropdownItemDisabled: "text-neutral-500 cursor-not-allowed",
    sidebar: "bg-neutral-900 border-neutral-800",
    logo: "text-neutral",
  },
} as const;

interface MobileMenuProps {
  theme: HeaderTheme;
}

export function MobileMenu({ theme }: MobileMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tc = themeClasses[theme];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={clsx(
            "flex justify-center items-center w-10 h-10 transition-colors",
            tc.navLinkMobile
          )}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 fixed inset-0 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={clsx(
            "top-0 right-0 z-50 fixed flex flex-col shadow-lg w-full max-w-[375px] h-full overflow-y-auto",
            "data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right",
            tc.sidebar
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {t("CommonHeader.nav.menu")}
          </Dialog.Title>
          <div className="flex flex-col flex-grow">
            <div
              className={clsx(
                "flex justify-between items-center px-4 py-3 border-b",
                theme === "light" ? "border-neutral-200" : "border-neutral-800"
              )}
            >
              <Link
                href={ROUTES.pay}
                className={clsx("flex items-center", tc.logo)}
                onClick={() => setOpen(false)}
              >
                <FooterLogo className={clsx("w-auto h-8", tc.logo)} />
              </Link>
              <Dialog.Close asChild>
                <button
                  className={clsx(
                    "flex justify-center items-center w-10 h-10 transition-colors",
                    tc.navLinkMobile
                  )}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-col flex-grow px-2 pt-6">
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="products" className="group">
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-3 font-medium text-sm transition-colors",
                        tc.navLinkMobile
                      )}
                    >
                      {t("CommonHeader.nav.products")}
                      <ShevronDownIcon className="w-4 h-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col pl-4 pb-2">
                      <Link
                        href={ROUTES.pay}
                        className={clsx(
                          "py-2 font-medium text-sm transition-colors",
                          tc.navLinkMobile
                        )}
                        onClick={() => setOpen(false)}
                      >
                        GRX Pay
                      </Link>
                      <div
                        className={clsx(
                          "flex items-center gap-2 py-2",
                          tc.dropdownItemDisabled
                        )}
                      >
                        <span className="font-medium text-sm">
                          GRX Exchange
                        </span>
                        <ComingSoonBadge>
                          {t("CommonHeader.products.comingSoon")}
                        </ComingSoonBadge>
                      </div>
                      <div
                        className={clsx(
                          "flex items-center gap-2 py-2",
                          tc.dropdownItemDisabled
                        )}
                      >
                        <span className="font-medium text-sm">GRX RWA</span>
                        <ComingSoonBadge>
                          {t("CommonHeader.products.comingSoon")}
                        </ComingSoonBadge>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <Link
                href={ROUTES.payPricing}
                className={clsx(
                  "px-2 py-3 font-medium text-sm transition-colors",
                  tc.navLinkMobile
                )}
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.pricing")}
              </Link>
              <Link
                href={ROUTES.payPartnerProgram}
                className={clsx(
                  "px-2 py-3 font-medium text-sm transition-colors",
                  tc.navLinkMobile
                )}
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.partners")}
              </Link>
              <Link
                href={ROUTES.aboutUs}
                className={clsx(
                  "px-2 py-3 font-medium text-sm transition-colors",
                  tc.navLinkMobile
                )}
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.aboutUs")}
              </Link>
              <Link
                href={ROUTES.payFaq}
                className={clsx(
                  "px-2 py-3 font-medium text-sm transition-colors",
                  tc.navLinkMobile
                )}
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.faq")}
              </Link>
            </nav>

            <div
              className={clsx(
                "flex flex-col gap-6 px-2 pt-4 pb-6 border-t",
                theme === "light" ? "border-neutral-200" : "border-neutral-800"
              )}
            >
              <LocalizationSelect theme={theme} />

              <div className="flex flex-col gap-3">
                <ButtonRoot
                  asChild
                  palette="primary"
                  variant="contained"
                  size="md"
                >
                  <Link href={ROUTES.createAccount} target="_blank">
                    <ButtonText>
                      {t("CommonHeader.nav.createAccount")}
                    </ButtonText>
                  </Link>
                </ButtonRoot>

                <ButtonRoot
                  asChild
                  palette="secondary"
                  variant="contained"
                  size="md"
                >
                  <Link href={ROUTES.signIn} target="_blank">
                    <ButtonText>{t("CommonHeader.nav.signIn")}</ButtonText>
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

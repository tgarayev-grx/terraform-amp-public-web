"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { usePathname } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { useEffect, useState } from "react";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { CloseIcon, FooterLogo, MenuIcon, ShevronDownIcon } from "../../icons";
import { LocalizationSelect } from "./LocalizationSelect";
import { ROUTES } from "../routes";
import clsx from "clsx";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import {
  ProductItem,
  ProductItemContainer,
  ProductItemRoot,
  ProductItemTitle,
  ProductItemDescription,
} from "./ProductItem";

export function MobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex justify-center items-center w-10 h-10 text-text-subtle-700 hover:text-text-strong-1000 transition-colors">
          <MenuIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-50 fixed inset-0 bg-neutral-1000/40 backdrop-blur-sm" />

        <Dialog.Content
          className={clsx(
            "top-0 right-0 z-50 fixed flex flex-col shadow-lg w-full max-w-[375px] h-full overflow-y-auto",
            "data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right",
            "bg-bg-base border-neutral-200 dark:border-neutral-800"
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {t("CommonHeader.nav.menu")}
          </Dialog.Title>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center px-4 py-3 border-neutral-200 dark:border-neutral-800 border-b">
              <Link
                href={ROUTES.pay}
                className="flex items-center text-neutral-900 dark:text-neutral"
                onClick={() => setOpen(false)}
              >
                <FooterLogo className="w-auto h-8 text-neutral-900 dark:text-neutral" />
              </Link>
              <Dialog.Close asChild>
                <button className="flex justify-center items-center w-10 h-10 text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral dark:text-neutral-300 transition-colors">
                  <CloseIcon className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-col flex-grow px-2 pt-6">
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="products" className="group">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center px-2 py-3 w-full font-medium text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral dark:text-neutral-300 text-sm transition-colors">
                      {t("CommonHeader.nav.products")}
                      <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform duration-200 shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col pb-2 pl-4">
                      <ProductItemRoot asChild>
                        <Link href={ROUTES.pay} onClick={() => setOpen(false)}>
                          <ProductItemContainer>
                            <ProductItemTitle>GRX Pay</ProductItemTitle>
                          </ProductItemContainer>

                          <ProductItemDescription>
                            {t("CommonHeader.products.grxPay.description")}
                          </ProductItemDescription>
                        </Link>
                      </ProductItemRoot>

                      <ProductItem
                        title="GRX Exchange"
                        description={t(
                          "CommonHeader.products.grxExchange.description"
                        )}
                        comingSoon
                      />

                      <ProductItem
                        title="GRX RWA (Real World Assets)"
                        description={t(
                          "CommonHeader.products.grxRwa.description"
                        )}
                        comingSoon
                      />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <Link
                href={ROUTES.payPricing}
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral dark:text-neutral-300 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.pricing")}
              </Link>
              <Link
                href={ROUTES.payPartnerProgram}
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral dark:text-neutral-300 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.partners")}
              </Link>
              <Link
                href={ROUTES.aboutUs}
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral dark:text-neutral-300 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.aboutUs")}
              </Link>
            </nav>

            <div className="flex flex-col gap-6 px-2 pt-4 pb-6">
              <LocalizationSelect />

              <div className="flex flex-col gap-3">
                <ButtonRoot asChild variant="primary" size="md">
                  <Link href={EXTERNAL_LINKS.Pay.signUp} target="_blank">
                    <ButtonText>
                      {t("CommonHeader.nav.createAccount")}
                    </ButtonText>
                  </Link>
                </ButtonRoot>

                <ButtonRoot variant="secondary" size="md" asChild>
                  <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
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

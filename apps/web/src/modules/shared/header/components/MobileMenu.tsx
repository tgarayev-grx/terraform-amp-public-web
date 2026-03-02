"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { ButtonRoot, ButtonText, Modal } from "@grx/ui";
import { usePathname } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import { ThemeSwitcher } from "@/modules/cross-cutting-concerns/theme";

import { CloseIcon, FooterLogo, MenuIcon, ShevronDownIcon } from "../../icons";
import { ROUTES } from "../routes";
import { LocalizationSelect } from "./LocalizationSelect";
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
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <button className="flex justify-center items-center w-10 h-10 text-icon-base-500 hover:text-icon-subtle-700 transition-colors">
          <MenuIcon className="w-6 h-6" />
        </button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Overlay />

        <Dialog.Content
          className={clsx(
            "top-0 right-0 z-50 fixed flex flex-col shadow-lg w-full max-w-[375px] h-full overflow-y-auto",
            "data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right",
            "bg-bg-base border-neutral-200 dark:border-neutral-800"
          )}
          aria-describedby={undefined}
        >
          <Modal.Title className="sr-only">
            {t("CommonHeader.nav.menu")}
          </Modal.Title>

          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center px-4 py-3 border-neutral-200 dark:border-neutral-800 border-b">
              <Link
                href={ROUTES.pay}
                className="flex items-center text-neutral-900 dark:text-neutral"
                onClick={() => setOpen(false)}
              >
                <FooterLogo className="w-auto h-8 text-neutral-900 dark:text-neutral" />
              </Link>

              <Modal.Close className="relative inset-0 w-10 *:w-6 h-10 *:h-6" />
            </div>

            <nav className="flex flex-col flex-grow px-2 pt-6">
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="products" className="group">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center px-2 py-3 outline-none w-full text-body-md-medium text-text-strong-1000 hover:text-text-subtle-700 transition-colors">
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
                className="px-2 py-3 text-body-md-medium text-text-strong-1000 hover:text-text-subtle-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.pricing")}
              </Link>

              <Link
                href={ROUTES.payPartnerProgram}
                className="px-2 py-3 text-body-md-medium text-text-strong-1000 hover:text-text-subtle-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.partners")}
              </Link>

              <Link
                href={ROUTES.aboutUs}
                className="px-2 py-3 text-body-md-medium text-text-strong-1000 hover:text-text-subtle-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("CommonHeader.nav.aboutUs")}
              </Link>
            </nav>

            <div className="flex flex-col gap-6 px-2 pt-4 pb-6">
              <div className="flex justify-between items-center gap-3">
                <LocalizationSelect />
              </div>

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
      </Modal.Portal>
    </Modal.Root>
  );
}

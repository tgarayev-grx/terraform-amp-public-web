"use client";

import { useTranslations } from "next-intl";
import { ContactUsForm, ContactUsFormProps } from "./ContactUsForm";
import { Modal } from "@grx/ui/components/modal";

type ContactUsModalProps = {
  children: React.ReactNode;

  defaultValues?: ContactUsFormProps["defaultValues"];
};

export function ContactUsModal({
  children,
  defaultValues,
}: ContactUsModalProps) {
  const t = useTranslations();

  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <div className="px-8 pt-8 text-center shrink-0">
            <Modal.Title className="font-bold text-[20px] text-neutral-1000 dark:text-neutral leading-[24px] tracking-[0.02px]">
              {t("ContactUs.getInTouch.title")}
            </Modal.Title>

            <Modal.Description className="mt-2 text-neutral-700 dark:text-neutral-400 text-sm">
              {t("ContactUs.getInTouch.subtitle")}
            </Modal.Description>
          </div>

          <Modal.Close aria-label={t("ContactUs.modal.closeAriaLabel")} />

          <ContactUsForm
            className="flex-1 px-8 min-w-0 min-h-0 sm:max-h-[500px]"
            classes={{
              root: "flex-1 min-h-0",
              fields: "flex-1 min-h-0 overflow-y-auto pr-8 -mr-8",
              footer: "shrink-0 pb-8",
              submit: "mt-6",
            }}
            defaultValues={defaultValues}
          />
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

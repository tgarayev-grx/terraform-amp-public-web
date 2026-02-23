"use client";

import { Button } from "@grx/ui/index";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { useTranslations } from "next-intl";
import { memo, ReactElement, useCallback, useState } from "react";
import { CloseIcon } from "@/modules/shared/icons";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";
import { CookieIcon } from "./CookieIcon";
import {
  DEFAULT_COOKIE_PREFERENCES,
  useCookiePreferences,
} from "./CookiePersist";

export const CookieBanner = memo(() => {
  const t = useTranslations();
  const cookiePreferences = useCookiePreferences();

  if (!cookiePreferences.loaded) {
    return null;
  }

  if (cookiePreferences.value) {
    return (
      <ManageCookiesModal cookiePreferences={cookiePreferences}>
        <button
          className="bottom-6 left-6 z-[3] fixed flex flex-col justify-center items-center bg-neutral-1000 hover:bg-neutral-800 active:bg-neutral-700 p-2.5 rounded-[12px] text-neutral"
          style={{
            boxShadow:
              "0 20px 48px -4px rgba(16, 24, 40, 0.08), 0 8px 16px -4px rgba(16, 24, 40, 0.03)",
          }}
        >
          <CookieIcon width={24} height={24} />
        </button>
      </ManageCookiesModal>
    );
  }

  return (
    <div
      className="right-0 sm:right-6 bottom-0 sm:bottom-6 z-[3] fixed flex flex-col bg-neutral rounded-2xl max-w-full sm:max-w-[440px]"
      style={{
        boxShadow:
          "0 20px 48px -4px rgba(16, 24, 40, 0.08), 0 8px 16px -4px rgba(16, 24, 40, 0.03)",
      }}
    >
      <div className="flex flex-col gap-4 px-8 pt-8 text-neutral-1000">
        <h6 className="font-bold text-[20px] leading-[24px] tracking-[0.02px]">
          {t("CookieBanner.banner.title")}
        </h6>

        <p className="text-neutral-700 text-sm">
          {t.rich("CookieBanner.banner.description", defaultRichComponents)}
        </p>
      </div>

      <div className="flex flex-col gap-4 px-8 py-8">
        <Button
          palette="primary"
          variant="contained"
          size="md"
          onClick={cookiePreferences.acceptAll}
        >
          {t("CookieBanner.banner.acceptAll")}
        </Button>

        <ManageCookiesModal cookiePreferences={cookiePreferences}>
          <Button palette="primary" variant="outlined" size="md">
            {t("CookieBanner.banner.manageOrReject")}
          </Button>
        </ManageCookiesModal>
      </div>
    </div>
  );
});
CookieBanner.displayName = "CookieBanner";

type ManageCookiesModalProps = {
  cookiePreferences: ReturnType<typeof useCookiePreferences>;
  children: ReactElement<{
    onClick: (...args: any) => any;
  }>;
};

const ManageCookiesModal = memo(
  ({ cookiePreferences, children }: ManageCookiesModalProps) => {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const [functional, setFunctional] = useState(
      cookiePreferences.value?.functional ??
        DEFAULT_COOKIE_PREFERENCES.functional
    );
    const [analytics, setAnalytics] = useState(
      cookiePreferences.value?.analytics ?? DEFAULT_COOKIE_PREFERENCES.analytics
    );
    const [advertisement, setAdvertisement] = useState(
      cookiePreferences.value?.advertisement ??
        DEFAULT_COOKIE_PREFERENCES.advertisement
    );

    cookiePreferences.useOnUpdate(
      useCallback((settings) => {
        setFunctional(settings.preferences.functional);
        setAnalytics(settings.preferences.analytics);
        setAdvertisement(settings.preferences.advertisement);
      }, [])
    );

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="z-[100] fixed inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content
            className="max-sm:top-8 sm:data-[state=closed]:slide-out-to-top-[48%] sm:top-1/2 right-0 bottom-0 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:bottom-auto left-0 sm:data-[state=closed]:slide-out-to-left-1/2 sm:left-1/2 z-[101] fixed flex flex-col bg-neutral sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl rounded-t-2xl focus:outline-none w-full sm:w-full sm:max-w-[600px] max-h-[100dvh] text-neutral-1000 sm:-translate-x-1/2 sm:-translate-y-1/2 data-[state=closed]:animate-out data-[state=open]:animate-in duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95"
            style={{
              boxShadow:
                "0 20px 48px -4px rgba(16, 24, 40, 0.08), 0 8px 16px -4px rgba(16, 24, 40, 0.03)",
            }}
          >
            <div className="px-8 pt-8 shrink-0">
              <Dialog.Title className="font-semibold text-lg">
                {t("CookieBanner.modal.title")}
              </Dialog.Title>
            </div>

            <div className="flex-1 px-8 min-h-0 sm:max-h-[500px] overflow-y-auto">
              <Dialog.Description className="mb-10 whitespace-pre-wrap">
                {t.rich(
                  "CookieBanner.modal.description",
                  defaultRichComponents
                )}
              </Dialog.Description>
              <div>
                <div className="mb-6 font-bold text-[18px] leading-[22px]">
                  {t("CookieBanner.modal.sectionTitle")}
                </div>

                <ul className="flex flex-col gap-4">
                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">
                        {t("CookieBanner.categories.necessary.title")}
                      </div>
                      <div className="bg-green-50 px-2 py-1 rounded text-green-600 text-xs">
                        {t("CookieBanner.categories.necessary.alwaysActive")}
                      </div>
                    </div>

                    <div className="text-neutral-700 text-base">
                      {t("CookieBanner.categories.necessary.description")}
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">
                        {t("CookieBanner.categories.functional.title")}
                      </div>
                      <Switch.Root
                        checked={functional}
                        onCheckedChange={setFunctional}
                        className="bg-neutral-300 data-[state=checked]:bg-neutral-1000 rounded-full w-10 h-6 transition-colors"
                      >
                        <Switch.Thumb className="block bg-neutral rounded-full w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px] pointer-events-none" />
                      </Switch.Root>
                    </div>

                    <div className="text-neutral-700 text-base">
                      {t("CookieBanner.categories.functional.description")}
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">
                        {t("CookieBanner.categories.analytics.title")}
                      </div>
                      <Switch.Root
                        checked={analytics}
                        onCheckedChange={setAnalytics}
                        className="bg-neutral-300 data-[state=checked]:bg-neutral-1000 rounded-full w-10 h-6 transition-colors"
                      >
                        <Switch.Thumb className="block bg-neutral rounded-full w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px] pointer-events-none" />
                      </Switch.Root>
                    </div>

                    <div className="text-neutral-700 text-base">
                      {t("CookieBanner.categories.analytics.description")}
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">
                        {t("CookieBanner.categories.advertisement.title")}
                      </div>
                      <Switch.Root
                        checked={advertisement}
                        onCheckedChange={setAdvertisement}
                        className="bg-neutral-300 data-[state=checked]:bg-neutral-1000 rounded-full w-10 h-6 transition-colors"
                      >
                        <Switch.Thumb className="block bg-neutral rounded-full w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px] pointer-events-none" />
                      </Switch.Root>
                    </div>

                    <div className="text-neutral-700 text-base">
                      {t("CookieBanner.categories.advertisement.description")}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-3 mt-6 px-8 pb-8 shrink-0">
              <Button
                className="w-full"
                palette="primary"
                variant="outlined"
                size="md"
                onClick={() => {
                  cookiePreferences.rejectAll();
                  setOpen(false);
                }}
              >
                {t("CookieBanner.buttons.rejectAll")}
              </Button>

              <Button
                className="w-full"
                palette="primary"
                variant="contained"
                size="md"
                onClick={() => {
                  cookiePreferences.savePreferences({
                    functional,
                    analytics,
                    advertisement,
                  });
                  setOpen(false);
                }}
              >
                {t("CookieBanner.buttons.saveSettings")}
              </Button>
            </div>

            <Dialog.Close asChild>
              <button className="top-4 right-4 absolute flex justify-center items-center text-neutral-700 hover:text-neutral-900 transition-colors">
                <CloseIcon className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);
ManageCookiesModal.displayName = "ManageCookiesModal";

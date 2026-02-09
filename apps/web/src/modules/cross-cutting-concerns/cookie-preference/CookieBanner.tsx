"use client";

import { Button } from "@grx/ui/index";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import Link from "next/link";
import { memo, ReactElement, useCallback, useState } from "react";
import { CloseIcon } from "../../../app/pay/(icons)/CloseIcon";
import { CookieIcon } from "./CookieIcon";
import {
  CookieSettings,
  DEFAULT_COOKIE_PREFERENCES,
  useCookiePreferences,
} from "./CookiePersist";

export const CookieBanner = memo(() => {
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
          We use cookies
        </h6>

        <p className="text-neutral-700 text-sm">
          We use cookies to enhance your browsing experience, serve personalized
          ads or content, and analyze our traffic. By clicking &quot;Accept
          аll&quot;, you consent to our use of cookies{" "}
          <Link
            className="text-blue-600 hover:text-blue-500"
            href="/cookie-policy"
            target="_blank"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-col gap-4 px-8 py-8">
        <Button
          palette="primary"
          variant="contained"
          size="md"
          onClick={cookiePreferences.acceptAll}
        >
          Accept all
        </Button>

        <ManageCookiesModal cookiePreferences={cookiePreferences}>
          <Button palette="primary" variant="outlined" size="md">
            Manage or reject cookies
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
                Cookie preferences
              </Dialog.Title>
            </div>

            <div className="flex-1 px-8 min-h-0 sm:max-h-[500px] overflow-y-auto">
              <Dialog.Description className="mb-10 whitespace-pre-wrap">
                In order to enhance your browsing experience and enable specific
                functionalities, we utilize cookies. Below, you will find
                comprehensive information about each consent category and the
                associated cookies. The cookies categorized as “Necessary” are
                essential for enabling the fundamental features of the website
                and are stored on your browser. Additionally, we utilize
                third-party cookies to analyze your usage of the website, store
                your preferences, and provide relevant content and
                advertisements based on your interests. Prior consent is
                required for storing these cookies on your browser. You have the
                option to enable or disable some or all of these cookies, but
                please note that disabling certain cookies may impact your
                browsing experience. {"\n"}Read our{" "}
                <Link
                  className="text-blue-600 hover:text-blue-500"
                  href="/cookie-policy"
                  target="_blank"
                >
                  Cookie Policy
                </Link>
                .
              </Dialog.Description>

              <div>
                <div className="mb-6 font-bold text-[18px] leading-[22px]">
                  Cookie preferences
                </div>

                <ul className="flex flex-col gap-4">
                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">Necessary</div>
                      <div className="bg-green-50 px-2 py-1 rounded text-green-600 text-xs">
                        Always active
                      </div>
                    </div>

                    <div className="text-neutral-700 text-base">
                      To utilize the essential functionalities of this website,
                      like secure log-in and customization of consent
                      preferences, it is necessary to have certain cookies
                      enabled. These cookies do not retain any personally
                      identifiable information.
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">Functional</div>
                      <Switch.Root
                        checked={functional}
                        onCheckedChange={setFunctional}
                        className="bg-neutral-300 data-[state=checked]:bg-neutral-1000 rounded-full w-10 h-6 transition-colors"
                      >
                        <Switch.Thumb className="block bg-neutral rounded-full w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px] pointer-events-none" />
                      </Switch.Root>
                    </div>

                    <div className="text-neutral-700 text-base">
                      Functional cookies aid in executing specific
                      functionalities on the website, such as sharing website
                      content on social media platforms, gathering feedback, and
                      incorporating other third-party features.
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">Analytics</div>
                      <Switch.Root
                        checked={analytics}
                        onCheckedChange={setAnalytics}
                        className="bg-neutral-300 data-[state=checked]:bg-neutral-1000 rounded-full w-10 h-6 transition-colors"
                      >
                        <Switch.Thumb className="block bg-neutral rounded-full w-[22px] h-[22px] transition-transform translate-x-[1px] data-[state=checked]:translate-x-[17px] pointer-events-none" />
                      </Switch.Root>
                    </div>

                    <div className="text-neutral-700 text-base">
                      Analytical cookies are employed to gain insights into how
                      visitors engage with the website. They assist in providing
                      information about metrics such as visitor count, bounce
                      rate, traffic source, and more.
                    </div>
                  </li>

                  <li aria-hidden>
                    <div className="bg-neutral-200 h-[1px]" />
                  </li>

                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-base">
                        Advertisement
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
                      Advertisement cookies are utilized to deliver personalized
                      advertisements to visitors, taking into account the pages
                      they have previously visited. These cookies also play a
                      role in analyzing the effectiveness of advertising
                      campaigns.
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
                Reject all
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
                Save cookie settings
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

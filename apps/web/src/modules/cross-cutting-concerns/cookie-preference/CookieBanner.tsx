"use client";

import { Button } from "@grx/ui/index";
import { useTranslations } from "next-intl";
import { memo, ReactElement, ReactNode, useCallback, useState } from "react";
import { Modal, Badge, Switch } from "@grx/ui";
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
        <button className="bottom-6 left-6 z-10 fixed flex flex-col justify-center items-center bg-primary-base-1000 hover:bg-primary-dark-700 active:bg-primary-darker-800 p-2.5 rounded-[12px] text-text-inverce shadow-md">
          <CookieIcon width={24} height={24} />
        </button>
      </ManageCookiesModal>
    );
  }

  return (
    <div className="right-0 sm:right-6 bottom-0 sm:bottom-6 z-10 fixed flex flex-col bg-surface-floating rounded-2xl max-w-full sm:max-w-[440px] shadow-md">
      <div className="flex flex-col gap-4 px-8 pt-8 text-neutral-1000">
        <h6 className="text-text-strong-1000 text-title-md">
          {t("CookieBanner.banner.title")}
        </h6>

        <p className="text-body-md-regular text-text-subtle-700">
          {t.rich("CookieBanner.banner.description", defaultRichComponents)}
        </p>
      </div>

      <div className="flex flex-col gap-4 px-8 py-8">
        <Button
          variant="primary"
          size="lg"
          onClick={cookiePreferences.acceptAll}
        >
          {t("CookieBanner.banner.acceptAll")}
        </Button>

        <ManageCookiesModal cookiePreferences={cookiePreferences}>
          <Button variant="outlined" size="lg">
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

export const ManageCookiesModal = memo(
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
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Trigger asChild>{children}</Modal.Trigger>

        <Modal.Portal>
          <Modal.Overlay />

          <Modal.Content>
            <div className="px-8 pt-8 shrink-0">
              <Modal.Title className="pb-6 text-title-md">
                {t("CookieBanner.modal.title")}
              </Modal.Title>
            </div>

            <div className="flex-1 px-8 min-h-0 sm:max-h-[500px] overflow-y-auto">
              <Modal.Description className="mb-10 text-body-lg-regular text-text-strong-1000 whitespace-pre-wrap">
                {t.rich(
                  "CookieBanner.modal.description",
                  defaultRichComponents
                )}
              </Modal.Description>

              <div>
                <div className="mb-6 text-text-strong-1000 text-title-sm">
                  {t("CookieBanner.modal.sectionTitle")}
                </div>

                <ul className="flex flex-col gap-4">
                  <CookiePreferenceItem
                    title={t("CookieBanner.categories.necessary.title")}
                    description={t(
                      "CookieBanner.categories.necessary.description"
                    )}
                    control={
                      <Badge size="md" palette="success" variant="light">
                        {t("CookieBanner.categories.necessary.alwaysActive")}
                      </Badge>
                    }
                  />

                  <CookiePreferenceItemSeparator />

                  <CookiePreferenceItem
                    title={t("CookieBanner.categories.functional.title")}
                    description={t(
                      "CookieBanner.categories.functional.description"
                    )}
                    control={
                      <Switch
                        checked={functional}
                        onCheckedChange={setFunctional}
                      />
                    }
                  />

                  <CookiePreferenceItemSeparator />

                  <CookiePreferenceItem
                    title={t("CookieBanner.categories.analytics.title")}
                    description={t(
                      "CookieBanner.categories.analytics.description"
                    )}
                    control={
                      <Switch
                        checked={analytics}
                        onCheckedChange={setAnalytics}
                      />
                    }
                  />

                  <CookiePreferenceItemSeparator />

                  <CookiePreferenceItem
                    title={t("CookieBanner.categories.advertisement.title")}
                    description={t(
                      "CookieBanner.categories.advertisement.description"
                    )}
                    control={
                      <Switch
                        checked={advertisement}
                        onCheckedChange={setAdvertisement}
                      />
                    }
                  />
                </ul>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-3 mt-6 px-8 pb-8 shrink-0">
              <Button
                className="w-full"
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
                variant="primary"
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

            <Modal.Close aria-label={t("CookieBanner.modal.closeAriaLabel")} />
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    );
  }
);
ManageCookiesModal.displayName = "ManageCookiesModal";

type CookiePreferenceItemProps = {
  title: string;
  description: string;
  control: ReactNode;
};
const CookiePreferenceItem = memo(
  ({ title, description, control }: CookiePreferenceItemProps) => {
    return (
      <li className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-body-lg-semibold text-text-strong-1000">
            {title}
          </div>

          {control}
        </div>

        <div className="text-body-lg-regular text-text-subtle-700">
          {description}
        </div>
      </li>
    );
  }
);
CookiePreferenceItem.displayName = "CookiePreferenceItem";

const CookiePreferenceItemSeparator = memo(() => {
  return (
    <li aria-hidden>
      <div className="bg-stroke-soft-200 h-[1px]" />
    </li>
  );
});
CookiePreferenceItemSeparator.displayName = "CookiePreferenceItemSeparator";

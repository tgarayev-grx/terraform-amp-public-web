"use client";

import { useCallback, useEffect } from "react";
import { useCookiePreferences } from "@/modules/cross-cutting-concerns/cookie-preference/CookiePersist";
import { updateConsent } from "./gtag";

export function GoogleAnalyticsConsentSync() {
  const cookiePreferences = useCookiePreferences();

  // Restore consent on mount if the user already made a choice
  useEffect(() => {
    if (cookiePreferences.loaded && cookiePreferences.value) {
      updateConsent(cookiePreferences.value);
    }
  }, [cookiePreferences.loaded, cookiePreferences.value]);

  // Keep consent in sync whenever preferences change
  cookiePreferences.useOnUpdate(
    useCallback((settings) => {
      updateConsent(settings.preferences);
    }, [])
  );

  return null;
}

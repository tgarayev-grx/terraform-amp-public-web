"use client";

import { useCallback, useEffect, useState } from "react";
import z from "zod";

export const DEFAULT_COOKIE_PREFERENCES: CookieSettings["preferences"] = {
  functional: false,
  analytics: false,
  advertisement: false,
};

export type CookieSettings = z.infer<typeof CookiePreferencePersist.Schema>;

export const useCookiePreferences = () => {
  const [loaded, setLoaded] = useState(false);
  const [preferences, setPreferences] = useState<CookieSettings | null>(null);

  const acceptAll = useCallback(() => {
    CookiePreferencePersist.write({
      advertisement: true,
      analytics: true,
      functional: true,
    });
    setPreferences(CookiePreferencePersist.read());
  }, []);

  const rejectAll = useCallback(() => {
    CookiePreferencePersist.write({
      advertisement: false,
      analytics: false,
      functional: false,
    });
    setPreferences(CookiePreferencePersist.read());
  }, []);

  const savePreferences = useCallback(
    (preferences: CookieSettings["preferences"]) => {
      CookiePreferencePersist.write(preferences);
      setPreferences(CookiePreferencePersist.read());
    },
    []
  );

  useEffect(() => {
    setPreferences(CookiePreferencePersist.read());
    setLoaded(true);

    const unsubscribe = CookiePreferencePersist.onUpdate(setPreferences);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    loaded,
    value: preferences ? preferences.preferences : null,
    acceptAll,
    rejectAll,
    savePreferences,
    useOnUpdate: (callback: (settings: CookieSettings) => void) => {
      useEffect(() => {
        const unsubscribe = CookiePreferencePersist.onUpdate(callback);

        return () => unsubscribe();
      }, [callback]);
    },
  };
};

export class CookiePreferencePersist {
  private static readonly STORAGE_KEY = "app:cookie-consent";

  public static Schema = z.object({
    acceptAll: z.boolean(),
    rejectAll: z.boolean(),
    preferences: z.object({
      functional: z.boolean(),
      analytics: z.boolean(),
      advertisement: z.boolean(),
    }),
  });

  public static read(): CookieSettings | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(this.STORAGE_KEY);

      if (!raw) {
        return null;
      }

      const data = JSON.parse(raw);

      if (!data) {
        return null;
      }

      const parsed = this.Schema.safeParse(data);

      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }

  public static write(args: CookieSettings["preferences"]): void {
    if (typeof window === "undefined") {
      return;
    }

    const settings = this.calculateSettingsFromPreferences(args);

    try {
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
      this.listeners.forEach((listener) => listener(settings));
    } catch {
      // ignore
    }
  }

  private static calculateSettingsFromPreferences(
    preferences: CookieSettings["preferences"]
  ): CookieSettings {
    return {
      acceptAll: Object.values(preferences).every((preference) => preference),
      rejectAll: Object.values(preferences).every((preference) => !preference),
      preferences: preferences,
    };
  }

  public static onUpdate(
    callback: (settings: CookieSettings) => void
  ): () => void {
    this.listeners.push(callback);

    const handleStorageUpdateEvent = (event: StorageEvent) => {
      if (event.key === this.STORAGE_KEY) {
        const settings =
          this.read() ??
          this.calculateSettingsFromPreferences(DEFAULT_COOKIE_PREFERENCES);

        this.listeners.forEach((listener) => listener(settings));
      }
    };

    window.addEventListener("storage", handleStorageUpdateEvent);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
      window.removeEventListener("storage", handleStorageUpdateEvent);
    };
  }

  public static reset(): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  private static listeners: ((settings: CookieSettings) => void)[] = [];
}

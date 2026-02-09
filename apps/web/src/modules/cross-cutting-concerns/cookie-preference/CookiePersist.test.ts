import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import {
  useCookiePreferences,
  DEFAULT_COOKIE_PREFERENCES,
  CookiePreferencePersist,
  CookieSettings,
} from "./CookiePersist";

const STORAGE_KEY = "app:cookie-consent";

describe("CookiePersist", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("useCookiePreferences", () => {
    it("returns value from localStorage when present", async () => {
      const stored = {
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      expect(result.current.loaded).toBe(true);
      expect(result.current.value).toEqual(stored.preferences);
    });

    it("returns null when localStorage is empty", async () => {
      const { result, rerender } = renderHook(() => useCookiePreferences());

      rerender();

      expect(result.current.value).toBe(null);
    });

    it("acceptAll writes all true and updates value", async () => {
      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      act(() => {
        result.current.acceptAll();
      });

      expect(result.current.value).toEqual({
        functional: true,
        analytics: true,
        advertisement: true,
      });

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      });
    });

    it("rejectAll writes all false and updates value", async () => {
      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      act(() => {
        result.current.rejectAll();
      });

      expect(result.current.value).toEqual({
        functional: false,
        analytics: false,
        advertisement: false,
      });

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: false,
        rejectAll: true,
        preferences: {
          functional: false,
          analytics: false,
          advertisement: false,
        },
      });
    });

    it("savePreferences writes custom preferences and updates value", async () => {
      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      const custom: CookieSettings["preferences"] = {
        functional: true,
        analytics: false,
        advertisement: true,
      };

      act(() => {
        result.current.savePreferences(custom);
      });

      expect(result.current.value).toEqual(custom);

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: false,
        rejectAll: false,
        preferences: custom,
      });
    });

    it("ignores invalid JSON in localStorage and returns null", async () => {
      window.localStorage.setItem(STORAGE_KEY, "invalid json");

      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      expect(result.current.value).toBe(null);
    });

    it("ignores data that does not match schema and returns null", async () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ wrong: "shape" })
      );

      const { result } = renderHook(() => useCookiePreferences());

      await waitFor(() => {
        expect(result.current.loaded).toBe(true);
      });

      expect(result.current.value).toBe(null);
    });
  });

  describe("CookiePreferencePersist.read", () => {
    it("returns null when no value in localStorage", () => {
      expect(CookiePreferencePersist.read()).toBe(null);
    });

    it("returns parsed settings when valid data is stored", () => {
      const stored = {
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: false,
          advertisement: true,
        },
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

      expect(CookiePreferencePersist.read()).toEqual(stored);
    });

    it("returns null when raw value is invalid JSON", () => {
      window.localStorage.setItem(STORAGE_KEY, "not valid json {");

      expect(CookiePreferencePersist.read()).toBe(null);
    });

    it("returns null when parsed data does not match schema", () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ acceptAll: true })
      );

      expect(CookiePreferencePersist.read()).toBe(null);
    });

    it("returns null when SSR", () => {
      const win = globalThis.window;
      (globalThis as unknown as { window: undefined }).window = undefined;
      try {
        expect(CookiePreferencePersist.read()).toBe(null);
      } finally {
        (globalThis as unknown as { window: typeof win }).window = win;
      }
    });
  });

  describe("CookiePreferencePersist.write", () => {
    it("writes preferences and sets acceptAll true when all true", () => {
      CookiePreferencePersist.write({
        functional: true,
        analytics: true,
        advertisement: true,
      });

      const read = CookiePreferencePersist.read();
      expect(read).toEqual({
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      });
    });

    it("writes preferences and sets rejectAll true when all false", () => {
      CookiePreferencePersist.write({
        functional: false,
        analytics: false,
        advertisement: false,
      });

      const read = CookiePreferencePersist.read();
      expect(read).toEqual({
        acceptAll: false,
        rejectAll: true,
        preferences: {
          functional: false,
          analytics: false,
          advertisement: false,
        },
      });
    });

    it("writes mixed preferences with acceptAll and rejectAll false", () => {
      CookiePreferencePersist.write({
        functional: true,
        analytics: false,
        advertisement: true,
      });

      const read = CookiePreferencePersist.read();
      expect(read).toEqual({
        acceptAll: false,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: false,
          advertisement: true,
        },
      });
    });

    it("does not throw when localStorage.setItem fails", () => {
      vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceeded");
      });

      expect(() =>
        CookiePreferencePersist.write({
          functional: true,
          analytics: true,
          advertisement: true,
        })
      ).not.toThrow();

      vi.mocked(window.localStorage.setItem).mockRestore();
    });

    it("does nothing when window is undefined (SSR)", () => {
      const existing = {
        acceptAll: false,
        rejectAll: true,
        preferences: DEFAULT_COOKIE_PREFERENCES,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      const win = globalThis.window;
      (globalThis as unknown as { window: undefined }).window = undefined;
      try {
        CookiePreferencePersist.write({
          functional: true,
          analytics: true,
          advertisement: true,
        });
      } finally {
        (globalThis as unknown as { window: typeof win }).window = win;
      }

      expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual(
        existing
      );
    });
  });

  describe("CookiePreferencePersist.reset", () => {
    it("removes stored preferences so read returns null", () => {
      CookiePreferencePersist.write({
        functional: true,
        analytics: true,
        advertisement: true,
      });
      expect(CookiePreferencePersist.read()).not.toBe(null);

      CookiePreferencePersist.reset();

      expect(CookiePreferencePersist.read()).toBe(null);
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe(null);
    });

    it("does not remove other localStorage keys", () => {
      window.localStorage.setItem("other-key", "other-value");
      CookiePreferencePersist.write({
        functional: true,
        analytics: false,
        advertisement: false,
      });

      CookiePreferencePersist.reset();

      expect(window.localStorage.getItem("other-key")).toBe("other-value");
    });

    it("does nothing when window is undefined (SSR)", () => {
      const existing = {
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      const win = globalThis.window;
      (globalThis as unknown as { window: undefined }).window = undefined;
      try {
        CookiePreferencePersist.reset();
      } finally {
        (globalThis as unknown as { window: typeof win }).window = win;
      }

      expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual(
        existing
      );
    });
  });

  describe("CookiePreferencePersist.onUpdate", () => {
    it("calls callback when write is called with new value", () => {
      const callback = vi.fn();
      const unsubscribe = CookiePreferencePersist.onUpdate(callback);

      const newPreferences = {
        functional: true,
        analytics: false,
        advertisement: true,
      };
      CookiePreferencePersist.write(newPreferences);

      expect(callback).toHaveBeenCalledWith({
        acceptAll: false,
        rejectAll: false,
        preferences: newPreferences,
      });
      unsubscribe();
    });

    it("calls callback when storage event fires for the key", () => {
      const callback = vi.fn();
      const unsubscribe = CookiePreferencePersist.onUpdate(callback);

      const newValue = {
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          newValue: JSON.stringify(newValue),
        })
      );

      expect(callback).toHaveBeenCalledWith(newValue);
      unsubscribe();
    });

    it("does not call callback when storage event is for another key", () => {
      const callback = vi.fn();
      const unsubscribe = CookiePreferencePersist.onUpdate(callback);

      window.dispatchEvent(
        new StorageEvent("storage", { key: "other-key", newValue: "x" })
      );

      expect(callback).not.toHaveBeenCalled();
      unsubscribe();
    });

    it("calls callback with default settings when key matches but read returns null", () => {
      const callback = vi.fn();
      const unsubscribe = CookiePreferencePersist.onUpdate(callback);

      window.dispatchEvent(
        new StorageEvent("storage", { key: STORAGE_KEY, newValue: null })
      );

      expect(callback).toHaveBeenCalledWith({
        acceptAll: false,
        rejectAll: true,
        preferences: DEFAULT_COOKIE_PREFERENCES,
      });
      unsubscribe();
    });

    it("unsubscribe removes listener and stops receiving events", () => {
      const callback = vi.fn();
      const unsubscribe = CookiePreferencePersist.onUpdate(callback);

      unsubscribe();

      const newValue = {
        acceptAll: true,
        rejectAll: false,
        preferences: {
          functional: true,
          analytics: true,
          advertisement: true,
        },
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          newValue: JSON.stringify(newValue),
        })
      );

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

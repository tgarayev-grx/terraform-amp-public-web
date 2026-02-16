import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { CookieBanner } from "./CookieBanner";
import {
  CookiePreferencePersist,
  DEFAULT_COOKIE_PREFERENCES,
} from "./CookiePersist";
// Use require to load actual JSON; ESM import resolves to generated .d.json.ts
const en = require("../i18n/locales/en.json") as Record<string, unknown>;

function renderWithTranslations(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("CookieBanner", () => {
  beforeEach(() => {
    CookiePreferencePersist.reset();
  });

  it("renders consent banner when loaded and no preferences set", async () => {
    renderWithTranslations(<CookieBanner />);

    expect(screen.getByRole("button", { name: /accept all/i })).toBeVisible();
    expect(
      screen.getByRole("button", { name: /manage or reject cookies/i })
    ).toBeVisible();
  });

  it("calls acceptAll when Accept all button is clicked", async () => {
    renderWithTranslations(<CookieBanner />);

    const acceptButton = await screen.findByRole("button", {
      name: /accept all/i,
    });
    fireEvent.click(acceptButton);

    expect(CookiePreferencePersist.read()).toEqual({
      acceptAll: true,
      rejectAll: false,
      preferences: {
        functional: true,
        analytics: true,
        advertisement: true,
      },
    });
    expect(
      screen.queryByRole("heading", { name: /we use cookies/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /accept all/i })
    ).not.toBeInTheDocument();
  });

  it("renders cookie icon button when preferences are already set", async () => {
    CookiePreferencePersist.write({
      functional: true,
      analytics: true,
      advertisement: true,
    });

    renderWithTranslations(<CookieBanner />);

    const manageButton = await screen.findByRole("button");
    expect(
      screen.queryByRole("heading", { name: /we use cookies/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /accept all/i })
    ).not.toBeInTheDocument();
    expect(manageButton).toBeVisible();
  });

  describe("ManageCookiesModal", () => {
    it("opens modal when Manage or reject cookies is clicked", async () => {
      renderWithTranslations(<CookieBanner />);

      const manageButton = await screen.findByRole("button", {
        name: /manage or reject cookies/i,
      });
      fireEvent.click(manageButton);

      const dialog = screen.getByRole("dialog", {
        name: /cookie preferences/i,
      });
      expect(dialog).toBeVisible();
      expect(
        within(dialog).getByRole("heading", { name: /cookie preferences/i })
      ).toBeVisible();
    });

    it("shows cookie preference toggles and calls rejectAll when Reject all is clicked", async () => {
      renderWithTranslations(<CookieBanner />);

      const manageButton = await screen.findByRole("button", {
        name: /manage or reject cookies/i,
      });
      fireEvent.click(manageButton);

      const dialog = screen.getByRole("dialog", {
        name: /cookie preferences/i,
      });
      expect(dialog).toBeVisible();
      const withinDialog = within(dialog);
      expect(withinDialog.getAllByText(/necessary/i).length).toBeGreaterThan(0);
      expect(withinDialog.getByText("Functional")).toBeVisible();
      expect(withinDialog.getByText("Analytics")).toBeVisible();
      expect(withinDialog.getByText("Advertisement")).toBeVisible();

      fireEvent.click(screen.getByRole("button", { name: /reject all/i }));

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: false,
        rejectAll: true,
        preferences: {
          functional: false,
          analytics: false,
          advertisement: false,
        },
      });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("saves current toggle state when Save button is clicked", async () => {
      renderWithTranslations(<CookieBanner />);

      const manageButton = await screen.findByRole("button", {
        name: /manage or reject cookies/i,
      });
      fireEvent.click(manageButton);

      fireEvent.click(
        screen.getByRole("button", { name: /save cookie settings/i })
      );

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: false,
        rejectAll: true,
        preferences: {
          functional: DEFAULT_COOKIE_PREFERENCES.functional,
          analytics: DEFAULT_COOKIE_PREFERENCES.analytics,
          advertisement: DEFAULT_COOKIE_PREFERENCES.advertisement,
        },
      });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens modal from cookie icon when preferences are set", async () => {
      CookiePreferencePersist.write({
        functional: true,
        analytics: false,
        advertisement: false,
      });

      renderWithTranslations(<CookieBanner />);

      const manageButton = await screen.findByRole("button");
      fireEvent.click(manageButton);

      expect(
        screen.getByRole("dialog", { name: /cookie preferences/i })
      ).toBeVisible();
    });

    it("updates settings when user toggles switches and saves from cookie icon", async () => {
      CookiePreferencePersist.write({
        functional: true,
        analytics: true,
        advertisement: true,
      });

      renderWithTranslations(<CookieBanner />);

      const manageButton = await screen.findByRole("button");
      fireEvent.click(manageButton);

      const dialog = screen.getByRole("dialog", {
        name: /cookie preferences/i,
      });
      const switches = within(dialog).getAllByRole("switch");
      expect(switches).toHaveLength(3);

      fireEvent.click(switches[0]);
      fireEvent.click(switches[2]);

      fireEvent.click(
        screen.getByRole("button", { name: /save cookie settings/i })
      );

      expect(CookiePreferencePersist.read()).toEqual({
        acceptAll: false,
        rejectAll: false,
        preferences: {
          functional: false,
          analytics: true,
          advertisement: false,
        },
      });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

"use client";

import { RecaptchaActionName } from "./constants";

type ExecuteRecaptchaResult =
  | { success: true; data: { token: string } }
  | { success: false };

export async function executeRecaptcha(
  action: RecaptchaActionName
): Promise<ExecuteRecaptchaResult> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured");
  }

  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error("reCAPTCHA script is not loaded");
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  })
    .then((token) => ({
      success: true as const,
      data: { token: token as string },
    }))
    .catch(() => ({ success: false as const }));
}

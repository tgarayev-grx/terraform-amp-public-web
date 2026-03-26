"use server";

import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { verifyRecaptchaV3 } from "@/lib/recaptcha/verify-recaptcha";
import { createWaitlistSchema, type WaitlistSchema } from "./waitlistSchema";
import { SlackWaitlistAPI } from "./slack.api";

export type SubmitWaitlistResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof z.infer<WaitlistSchema>, string>>;
    };

export async function submitWaitlist(
  args: z.infer<WaitlistSchema> & {
    recaptchaToken: string;
    source: "RWA" | "EXCHANGE";
  }
): Promise<SubmitWaitlistResult> {
  const { recaptchaToken, source, ...values } = args;

  const recaptcha = await verifyRecaptchaV3({
    token: recaptchaToken,
    expectedAction: RECAPTCHA_ACTIONS.waitlist,
  });
  if (!recaptcha.success) {
    return {
      success: false,
      error: "reCAPTCHA verification failed",
    };
  }

  const t = await getTranslations("Rwa.hero");
  const schema = createWaitlistSchema(t);
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof z.infer<WaitlistSchema>, string>> =
      {};

    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !(path in fieldErrors)) {
        fieldErrors[path as keyof z.infer<WaitlistSchema>] = issue.message;
      }
    }

    return {
      success: false,
      error: "Validation failed",
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }

  const api = new SlackWaitlistAPI();
  const { ok, status } = await api.sendWaitlistSignup({
    email: parsed.data.email,
    source,
  });

  if (!ok) {
    console.error("[submitWaitlist] Slack notification failed", status);
  }

  return { success: true };
}

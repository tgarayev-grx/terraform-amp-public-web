import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export function createWaitlistSchema(
  t:
    | Awaited<ReturnType<typeof getTranslations<"Rwa.hero">>>
    | ReturnType<typeof useTranslations<"Rwa.hero">>
) {
  return z.object({
    email: z
      .string()
      .min(1, t("field.email.errors.required"))
      .email(t("field.email.errors.invalidEmail")),
  });
}

export type WaitlistSchema = ReturnType<typeof createWaitlistSchema>;

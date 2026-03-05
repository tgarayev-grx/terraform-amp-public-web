"use server";

import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { createWaitlistSchema, type WaitlistSchema } from "./waitlistSchema";

export type SubmitWaitlistResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof z.infer<WaitlistSchema>, string>>;
    };

export async function submitWaitlist(
  values: z.infer<WaitlistSchema>
): Promise<SubmitWaitlistResult> {
  const t = await getTranslations("Exchange.hero");
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

  // TODO: Persist to DB or email service. For now we simulate success.
  await new Promise((r) => setTimeout(r, 500));

  return { success: true };
}

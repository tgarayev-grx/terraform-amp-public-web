"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import {
  type BookDemoFormSchema,
  createBookDemoFormSchema,
} from "../../bookDemoSchema";
import { SlackBookDemoAPI } from "./slack.api";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { verifyRecaptchaV3 } from "@/lib/recaptcha/verify-recaptcha";

export async function submitBookDemoForm(
  args: z.infer<BookDemoFormSchema> & { recaptchaToken: string }
): Promise<SubmitBookDemoFormResult> {
  const { recaptchaToken, ...values } = args;

  const recaptcha = await verifyRecaptchaV3({
    token: recaptchaToken,
    expectedAction: RECAPTCHA_ACTIONS.book_demo,
  });

  if (!recaptcha.success) {
    return {
      success: false,
      message: "reCAPTCHA verification failed",
      status: 403,
    };
  }

  const t = await getTranslations("ContactUs.contactForm");
  const schema = createBookDemoFormSchema(t);
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parseFieldErrors(parsed.error);
    return {
      success: false,
      message: "Validation failed",
      status: 400,
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }

  const api = new SlackBookDemoAPI();

  const { ok, status } = await api.sendBookDemoSubmission(parsed.data);

  if (!ok) {
    return {
      success: false,
      message: "Internal server error",
      status: status ?? 500,
    };
  }

  return { success: true };
}

export type SubmitBookDemoFormResult =
  | { success: true }
  | {
      success: false;
      message: string;
      status: number;
      fieldErrors?: Partial<Record<keyof BookDemoFormSchema, string>>;
    };

function parseFieldErrors(
  error: z.ZodError
): Partial<Record<keyof BookDemoFormSchema, string>> {
  const fieldErrors: Partial<Record<keyof BookDemoFormSchema, string>> = {};
  for (const issue of error.issues) {
    const path = issue.path[0];
    if (typeof path === "string" && !(path in fieldErrors)) {
      fieldErrors[path as keyof BookDemoFormSchema] = issue.message;
    }
  }
  return fieldErrors;
}

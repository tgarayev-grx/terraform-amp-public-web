"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import {
  type ContactFormSchema,
  createContactFormSchema,
} from "../../contactUsSchema";
import { SlackContactFormAPI } from "./slack.api";

export async function submitContactForm(
  values: z.infer<ContactFormSchema>
): Promise<SubmitContactFormResult> {
  const honeypot = ("honeypot" in values ? values.honeypot : "")?.trim() ?? "";
  if (honeypot !== "") {
    return { success: true };
  }

  const t = await getTranslations("ContactUs.contactForm");
  const schema = createContactFormSchema(t);
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

  const { honeypot: _h, ...formData } = parsed.data;

  const api = new SlackContactFormAPI();

  const { ok, status } = await api.sendContactFormSubmission(formData);

  if (!ok) {
    return {
      success: false,
      message: "Internal server error",
      status: status ?? 500,
    };
  }

  return { success: true };
}

export type SubmitContactFormResult =
  | { success: true }
  | {
      success: false;
      message: string;
      status: number;
      fieldErrors?: Partial<Record<keyof ContactFormSchema, string>>;
    };

function parseFieldErrors(
  error: z.ZodError
): Partial<Record<keyof ContactFormSchema, string>> {
  const fieldErrors: Partial<Record<keyof ContactFormSchema, string>> = {};
  for (const issue of error.issues) {
    const path = issue.path[0];
    if (typeof path === "string" && !(path in fieldErrors)) {
      fieldErrors[path as keyof ContactFormSchema] = issue.message;
    }
  }
  return fieldErrors;
}

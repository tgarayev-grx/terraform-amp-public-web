"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { ContactFormSchema, createContactFormSchema } from "./contactUsSchema";

export type SubmitContactFormResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormSchema, string>>;
    };

export async function submitContactForm(
  values: z.infer<ContactFormSchema>
): Promise<SubmitContactFormResult> {
  // Honeypot: silent reject if filled (bots often fill every field)
  if ("honeypot" in values) {
    const honeypot = (values.honeypot ?? "").trim();

    if (honeypot !== "") {
      console.log("[submitContactForm] honeypot", honeypot);
      return { success: true };
    }
  }

  const t = await getTranslations("ContactUs.contactForm");
  const schema = createContactFormSchema(t);
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormSchema, string>> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !(path in fieldErrors)) {
        fieldErrors[path as keyof ContactFormSchema] = issue.message;
      }
    }
    return {
      success: false,
      error: "Validation failed",
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }

  // TODO: Persist to DB or send email (e.g. Resend, SendGrid). For now we simulate success.
  await new Promise((r) => setTimeout(r, 500));

  return { success: true };
}

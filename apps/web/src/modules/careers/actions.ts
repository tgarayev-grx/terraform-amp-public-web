"use server";

import {
  careersSchema,
  submitCVSchema,
  type CareersFormValues,
  type SubmitCVFormValues,
} from "./careersSchema";
import { HurmaClient } from "./hurma.client";
import { SlackCareersAPI } from "./slack.api";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { verifyRecaptchaV3 } from "@/lib/recaptcha/verify-recaptcha";

export type SubmitCandidateResult =
  | { success: true }
  | { success: false; isDuplicate: true }
  | {
      success: false;
      isDuplicate?: false;
      error: string;
      status: number;
      fieldErrors?: Partial<Record<keyof CareersFormValues, string>>;
    };

export async function submitCandidate(
  values: CareersFormValues,
  context: { vacancyName: string; recaptchaToken: string }
): Promise<SubmitCandidateResult> {
  const recaptcha = await verifyRecaptchaV3({
    token: context.recaptchaToken,
    expectedAction: RECAPTCHA_ACTIONS.careers_apply,
  });
  if (!recaptcha.success) {
    console.error(
      "[submitCandidate] reCAPTCHA verification failed:",
      recaptcha.reason
    );
    return {
      success: false,
      error: "reCAPTCHA verification failed",
      status: 403,
    };
  }

  const parsed = careersSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parseFieldErrors(parsed.error);
    return {
      success: false,
      error: "Validation failed",
      status: 400,
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }

  const { name, email, phone, description, hurma_vacancy_id, cv } = parsed.data;

  const hurma = new HurmaClient();
  const hurmaResult = await hurma.submitCandidate({
    name,
    email,
    phone: phone || undefined,
    description: description || undefined,
    hurma_vacancy_id,
    cv: cv instanceof File ? cv : undefined,
    cvFileName: cv instanceof File ? cv.name : undefined,
  });

  if (!hurmaResult.ok) {
    if (hurmaResult.isDuplicate) return { success: false, isDuplicate: true };
    return {
      success: false,
      error: "Failed to submit application",
      status: hurmaResult.status ?? 500,
    };
  }

  const slack = new SlackCareersAPI();
  const slackResult = await slack.sendApplicationNotification({
    formValues: { name, email, phone, description },
    vacancyName: context.vacancyName,
    vacancyId: hurma_vacancy_id,
    cvFileName: cv instanceof File ? cv.name : undefined,
  });

  if (!slackResult.ok) {
    console.error(
      `[submitCandidate] Slack notification failed — status: ${slackResult.status}`
    );
  }

  return { success: true };
}

function parseFieldErrors(
  error: import("zod").ZodError
): Partial<Record<keyof CareersFormValues, string>> {
  const fieldErrors: Partial<Record<keyof CareersFormValues, string>> = {};
  for (const issue of error.issues) {
    const path = issue.path[0];
    if (typeof path === "string" && !(path in fieldErrors)) {
      fieldErrors[path as keyof CareersFormValues] = issue.message;
    }
  }
  return fieldErrors;
}

export type SubmitGeneralCVResult =
  | { success: true }
  | { success: false; isDuplicate: true }
  | {
      success: false;
      isDuplicate?: false;
      error: string;
      status: number;
      fieldErrors?: Partial<Record<keyof SubmitCVFormValues, string>>;
    };

export async function submitGeneralCV(
  args: SubmitCVFormValues & { recaptchaToken: string }
): Promise<SubmitGeneralCVResult> {
  const { recaptchaToken, ...values } = args;

  const recaptcha = await verifyRecaptchaV3({
    token: recaptchaToken,
    expectedAction: RECAPTCHA_ACTIONS.careers_apply,
  });
  if (!recaptcha.success) {
    console.error(
      "[submitGeneralCV] reCAPTCHA verification failed:",
      recaptcha.reason
    );
    return {
      success: false,
      error: "reCAPTCHA verification failed",
      status: 403,
    };
  }

  const parsed = submitCVSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof SubmitCVFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !(path in fieldErrors)) {
        fieldErrors[path as keyof SubmitCVFormValues] = issue.message;
      }
    }
    return {
      success: false,
      error: "Validation failed",
      status: 400,
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }

  const { name, email, description, cv } = parsed.data;

  const hurma = new HurmaClient();
  const hurmaResult = await hurma.submitCandidate({
    name,
    email,
    description: description || undefined,
    cv: cv instanceof File ? cv : undefined,
    cvFileName: cv instanceof File ? cv.name : undefined,
  });

  if (!hurmaResult.ok) {
    if (hurmaResult.isDuplicate) return { success: false, isDuplicate: true };
    return {
      success: false,
      error: "Failed to submit application",
      status: hurmaResult.status ?? 500,
    };
  }

  const slack = new SlackCareersAPI();
  const slackResult = await slack.sendApplicationNotification({
    formValues: { name, email, phone: "", description },
    vacancyName: "General Application",
    cvFileName: cv instanceof File ? cv.name : undefined,
  });

  if (!slackResult.ok) {
    console.error(
      `[submitGeneralCV] Slack notification failed — status: ${slackResult.status}`
    );
  }

  return { success: true };
}

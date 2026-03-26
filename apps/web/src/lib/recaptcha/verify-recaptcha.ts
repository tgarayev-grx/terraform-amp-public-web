import z from "zod";
import { RECAPTCHA_ACTIONS, RecaptchaActionName } from "./constants";

const DEFAULT_MIN_SCORE = 0.5;

const parsedMin = Number.parseFloat(
  process.env.RECAPTCHA_MIN_SCORE ?? `${DEFAULT_MIN_SCORE}`
);
const MIN_SCORE = Number.isFinite(parsedMin) ? parsedMin : DEFAULT_MIN_SCORE;

let devMissingSecretWarned = false;

type VerifyRecaptchaV3Args = {
  token: string;
  expectedAction: RecaptchaActionName;
};

type VerifyRecaptchaV3Result =
  | { success: true; score: number }
  | {
      success: false;
      reason:
        | "MISSING_SECRET"
        | "INVALID_RESPONSE"
        | "INVALID_ACTION"
        | "INVALID_SCORE";
    };

/**
 * Verifies a reCAPTCHA v3 token with Google siteverify.
 */
export async function verifyRecaptchaV3(
  args: VerifyRecaptchaV3Args
): Promise<VerifyRecaptchaV3Result> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, reason: "MISSING_SECRET" };
    }
    if (!devMissingSecretWarned) {
      devMissingSecretWarned = true;
      console.warn(
        "[recaptcha] RECAPTCHA_SECRET_KEY is unset; skipping verification in development"
      );
    }
    return { success: true, score: 1 };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", args.token);

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }
  )
    .then((res) => res.json())
    .then((json) => ({
      success: true as const,
      data: ResponseSchema.parse(json),
    }))
    .catch(() => ({ success: false as const }));

  if (!response.success) {
    return { success: false, reason: "INVALID_RESPONSE" };
  }

  const result = CaptchaResultSchema.safeParse(response.data);

  if (!result.success) {
    return { success: false, reason: "INVALID_RESPONSE" };
  }

  if (result.data.action !== args.expectedAction) {
    return { success: false, reason: "INVALID_ACTION" };
  }

  if (result.data.score < MIN_SCORE) {
    return { success: false, reason: "INVALID_SCORE" };
  }

  return { success: true, score: result.data.score };
}

const ResponseSchema = z.record(z.string(), z.unknown());

const CaptchaResultSchema = z.object({
  success: z.boolean(),
  score: z.number(),
  action: z.enum(Object.values(RECAPTCHA_ACTIONS)),
});

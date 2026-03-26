/** Stable v3 action names for Google reCAPTCHA Admin reporting. */
export const RECAPTCHA_ACTIONS = {
  contact: "contact",
  waitlist: "waitlist",
  book_demo: "book_demo",
} as const;

export type RecaptchaActionName =
  (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS];

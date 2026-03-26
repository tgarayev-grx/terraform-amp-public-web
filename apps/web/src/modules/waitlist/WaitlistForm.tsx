"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button, useAppForm, toast } from "@grx/ui";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { executeRecaptcha } from "@/lib/recaptcha/execute-recaptcha";
import { submitWaitlist } from "./actions";
import { createWaitlistSchema } from "./waitlistSchema";

export type WaitlistFormProps = {
  source: "RWA" | "EXCHANGE";
};

export function WaitlistForm({ source }: WaitlistFormProps) {
  const t = useTranslations("Rwa.hero");
  const waitlistSchema = createWaitlistSchema(t);

  const form = useAppForm({
    defaultValues: {
      email: "",
    } satisfies z.infer<typeof waitlistSchema>,
    validators: {
      onMount: waitlistSchema,
      onChange: waitlistSchema,
      onSubmit: waitlistSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const recaptchaResult = await executeRecaptcha(
          RECAPTCHA_ACTIONS.waitlist
        );
        if (!recaptchaResult.success) {
          console.error("[WaitlistForm] Recaptcha verification failed");
          toast.error(t("toast.error"));
          return;
        }

        const recaptchaToken = recaptchaResult.data.token;

        const result = await submitWaitlist({
          ...value,
          recaptchaToken,
          source,
        });

        if (result.success) {
          form.reset();
          toast.success(t("toast.success"));
          return;
        }

        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldMeta(
              field as keyof z.infer<typeof waitlistSchema>,
              (prev) => ({
                ...prev,
                errors: [message],
              })
            );
          }
          return;
        }

        console.error("[WaitlistForm] Error submitting form:", result);
        toast.error(t("toast.error"));
      } catch (error) {
        console.error("[WaitlistForm] Error submitting form:", error);
        toast.error(t("toast.error"));
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-3 w-full max-w-[380px]"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label={t("field.email.label")}
              placeholder={t("emailPlaceholder")}
              type="email"
            />
          )}
        </form.AppField>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              className="w-full"
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {t("joinWaitlist")}
            </Button>
          )}
        </form.Subscribe>
      </form.AppForm>
    </form>
  );
}

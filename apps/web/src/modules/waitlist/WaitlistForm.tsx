"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button, useAppForm, toast } from "@grx/ui";
import { submitWaitlist } from "./actions";
import { createWaitlistSchema } from "./waitlistSchema";

export function WaitlistForm() {
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
        const result = await submitWaitlist(value);

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
        }
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

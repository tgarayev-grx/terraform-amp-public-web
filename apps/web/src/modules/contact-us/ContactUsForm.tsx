"use client";

import React, { useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import z from "zod";
import { Button, Checkbox, useAppForm, Field, toast } from "@grx/ui";
import { submitContactForm } from "./actions";
import {
  createContactFormSchema,
  INTERESTED_IN_PRODUCTS,
  COUNTRY_CODES,
  ORGANIZATION_TYPE_VALUES,
} from "./contactUsSchema";
import { GlobeIcon } from "@/app/[locale]/pay/(icons)/GlobeIcon";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldError } from "@grx/ui/form/FieldError";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { MESSAGE_MAX_LENGTH } from "./contactUsSchema";

export type ContactUsFormProps = {
  className?: string;

  classes?: {
    root?: string;
    fields?: string;
    footer?: string;
    submit?: string;
  };

  defaultValues?: Partial<z.infer<ReturnType<typeof createContactFormSchema>>>;
};

export function ContactUsForm({
  className,
  classes,
  defaultValues,
}: ContactUsFormProps) {
  const t = useTranslations("ContactUs.contactForm");
  const contactFormSchema = createContactFormSchema(t);
  const honeypotCapture = useHoneypotCapture();

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      phoneNumber: "",
      companyName: "",
      country: "",
      primaryRole: "",
      organizationType: "",
      interestedIn: [] as z.infer<typeof contactFormSchema>["interestedIn"],
      message: "",
      honeypot: "" as z.infer<typeof contactFormSchema>["honeypot"],
      ...defaultValues,
    } satisfies z.infer<typeof contactFormSchema>,
    validators: {
      onMount: contactFormSchema,
      onChange: contactFormSchema,
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const payload = {
          ...value,
          honeypot: honeypotCapture.getCaptured() || value.honeypot,
        };

        const result = await submitContactForm(payload);

        if (result.success) {
          form.reset();
          toast.success(t("toast.success"));
          return;
        }

        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldMeta(
              field as keyof z.infer<typeof contactFormSchema>,
              (prev) => ({
                ...prev,
                errors: [message],
              })
            );
          }
        }
      } catch (error) {
        console.error("[ContactUsForm] Error submitting form:", error);
        toast.error(t("toast.error"));
      }
    },
  });

  return (
    <form
      className={clsx("flex flex-col", className, classes?.root)}
      id="contact-us-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        honeypotCapture.captureFromForm(e);
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className={clsx("flex flex-col gap-4", classes?.fields)}>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <form.AppField name="firstName">
              {(field) => (
                <field.TextField
                  label={t("field.firstName.label")}
                  placeholder={t("field.firstName.placeholder")}
                />
              )}
            </form.AppField>

            <form.AppField name="lastName">
              {(field) => (
                <field.TextField
                  label={t("field.lastName.label")}
                  placeholder={t("field.lastName.placeholder")}
                />
              )}
            </form.AppField>
          </div>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <form.AppField name="businessEmail">
              {(field) => (
                <field.TextField
                  label={t("field.businessEmail.label")}
                  placeholder={t("field.businessEmail.placeholder")}
                  type="email"
                />
              )}
            </form.AppField>

            <form.AppField name="phoneNumber">
              {(field) => (
                <field.TextField
                  label={t("field.phoneNumber.label")}
                  placeholder={t("field.phoneNumber.placeholder")}
                  type="tel"
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name="companyName">
            {(field) => (
              <field.TextField
                label={t("field.companyName.label")}
                placeholder={t("field.companyName.placeholder")}
              />
            )}
          </form.AppField>

          <form.AppField name="honeypot">
            {(field) => (
              <input
                className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
                type="text"
                name={HONEYPOT_INPUT_NAME}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
            )}
          </form.AppField>

          <form.AppField name="country">
            {(field) => (
              <field.SingleSelect
                label={t("field.country.label")}
                placeholder={t("field.country.placeholder")}
                options={COUNTRY_CODES.map((code) => ({
                  value: code,
                  label: t(`field.country.options.${code}`),
                }))}
                start={<GlobeIcon width={20} height={20} />}
              />
            )}
          </form.AppField>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <form.AppField name="primaryRole">
              {(field) => (
                <field.TextField
                  label={t("field.primaryRole.label")}
                  placeholder={t("field.primaryRole.placeholder")}
                />
              )}
            </form.AppField>

            <form.AppField name="organizationType">
              {(field) => (
                <field.SingleSelect
                  label={t("field.organizationType.label")}
                  placeholder={t("field.organizationType.placeholder")}
                  options={ORGANIZATION_TYPE_VALUES.map((value) => ({
                    value,
                    label: t(`field.organizationType.options.${value}`),
                  }))}
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name="interestedIn">
            {(field) => (
              <Field.Root className="flex flex-col gap-4" id={field.name}>
                <Field.Label noId>{t("field.interestedIn.label")}</Field.Label>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  {INTERESTED_IN_PRODUCTS.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        name={field.name}
                        checked={field.state.value.includes(option)}
                        onBlur={field.handleBlur}
                        onCheckedChange={() => {
                          field.setValue(
                            field.state.value.includes(option)
                              ? field.state.value.filter((x) => x !== option)
                              : [...field.state.value, option]
                          );
                        }}
                      />

                      <span className="font-medium text-neutral-1000 text-sm">
                        {t(`field.interestedIn.options.${option}`)}
                      </span>
                    </label>
                  ))}
                </div>

                <FieldError>
                  {({ message, hasError }) => (
                    <Field.HelperText isError={hasError}>
                      {message}
                    </Field.HelperText>
                  )}
                </FieldError>
              </Field.Root>
            )}
          </form.AppField>

          <form.AppField name="message">
            {(field) => (
              <field.TextAreaField
                label={t("field.message.label")}
                placeholder={t("field.message.placeholder")}
                rows={4}
              />
            )}
          </form.AppField>
        </div>

        <div className={clsx(classes?.footer)}>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className={twMerge("mt-14 w-full", classes?.submit)}
                type="submit"
                palette="primary"
                variant="contained"
                size="md"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
            )}
          </form.Subscribe>

          <p className="mt-4 font-medium text-neutral-500 text-xs text-center">
            {t.rich("footer", {
              linkTerms: (chunks) => (
                <Link
                  href={ROUTES.payTermsOfUse}
                  className="text-blue-600 hover:text-blue-500"
                >
                  {chunks}
                </Link>
              ),
              linkPrivacy: (chunks) => (
                <Link
                  href={ROUTES.payPrivacyPolicy}
                  className="text-blue-600 hover:text-blue-500"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </form.AppForm>
    </form>
  );
}

const HONEYPOT_INPUT_NAME = "companyFax";

function useHoneypotCapture() {
  const ref = useRef<string>("");

  const captureFromForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const input = e.currentTarget.querySelector<HTMLInputElement>(
      `input[name="${HONEYPOT_INPUT_NAME}"]`
    );
    ref.current = input?.value?.trim() ?? "";
  }, []);

  const getCaptured = useCallback(() => {
    const value = ref.current;
    ref.current = "";
    return value;
  }, []);

  return { captureFromForm, getCaptured };
}

"use client";

import { useEffect, type ComponentType, type SVGProps } from "react";
import { useTranslations } from "next-intl";
import z from "zod";
import { Button, Checkbox, useAppForm, Field, toast } from "@grx/ui";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { executeRecaptcha } from "@/lib/recaptcha/execute-recaptcha";
import { submitBookDemoForm } from "./actions/book-demo/actions";
import { getUserCountryCode } from "./actions/detect-user-location/actions";
import { createBookDemoFormSchema, MESSAGE_MAX_LENGTH } from "./bookDemoSchema";
import { GlobeIcon } from "@grx/ui/icons/GlobeIcon";
import * as CountryFlagIcons from "@grx/ui/icons/country-flag";
import clsx from "clsx";
import { FieldError } from "@grx/ui/form/FieldError";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { COUNTRY_CODES } from "./config/countries";

function getCountryFlagIcon(
  code: (typeof COUNTRY_CODES)[number]
): ComponentType<SVGProps<SVGSVGElement>> | undefined {
  return CountryFlagIcons[
    `IconCountryFlag${code}` as keyof typeof CountryFlagIcons
  ];
}

export type BookDemoFormProps = {
  className?: string;

  classes?: {
    root?: string;
    fields?: string;
    footer?: string;
    submit?: string;
  };

  defaultValues?: Partial<z.infer<ReturnType<typeof createBookDemoFormSchema>>>;
};

export function BookDemoForm({
  className,
  classes,
  defaultValues,
}: BookDemoFormProps) {
  const t = useTranslations("BookDemo.contactForm");
  const tCommon = useTranslations("Common");
  const bookDemoFormSchema = createBookDemoFormSchema(t);

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      phoneNumber: "",
      country: "",
      primaryRole: "",
      message: "",
      ...defaultValues,
    } satisfies z.infer<typeof bookDemoFormSchema>,
    validators: {
      onMount: bookDemoFormSchema,
      onChange: bookDemoFormSchema,
      onSubmit: bookDemoFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const recaptchaResult = await executeRecaptcha(
          RECAPTCHA_ACTIONS.book_demo
        );

        if (!recaptchaResult.success) {
          console.error("[BookDemoForm] Recaptcha verification failed");
          toast.error(t("toast.error"));
          return;
        }

        const recaptchaToken = recaptchaResult.data.token;

        const result = await submitBookDemoForm({
          ...value,
          recaptchaToken,
        });

        if (result.success) {
          form.reset();
          toast.success(t("toast.success"));
          return;
        }

        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldMeta(
              field as keyof z.infer<typeof bookDemoFormSchema>,
              (prev) => ({
                ...prev,
                errors: [message],
              })
            );
          }

          return;
        }

        console.error("[BookDemoForm] Error submitting form:", result);
        toast.error(t("toast.error"));
      } catch (error) {
        console.error("[BookDemoForm] Error submitting form:", error);
        toast.error(t("toast.error"));
      }
    },
  });

  useEffect(() => {
    let mounted = true;

    getUserCountryCode().then((code) => {
      if (!mounted) {
        return;
      }

      if (!code) {
        return;
      }

      if (!form.getFieldValue("country")) {
        form.setFieldValue("country", code);
      }
    });

    return () => {
      mounted = false;
    };
  }, [form]);

  return (
    <form
      className={clsx("flex flex-col", className, classes?.root)}
      id="contact-us-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className={clsx("flex flex-col gap-4", classes?.fields)}>
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
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

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
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

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
            <form.AppField name="primaryRole">
              {(field) => (
                <field.TextField
                  label={t("field.primaryRole.label")}
                  placeholder={t("field.primaryRole.placeholder")}
                />
              )}
            </form.AppField>

            <form.AppField name="country">
              {(field) => (
                <field.SingleSelect
                  label={t("field.country.label")}
                  placeholder={t("field.country.placeholder")}
                  options={COUNTRY_CODES.map((code) => {
                    const Icon = getCountryFlagIcon(code);
                    return {
                      value: code,
                      label: tCommon(`countries.${code}`),
                      start: Icon ? <Icon width={20} height={20} /> : undefined,
                    };
                  })}
                  start={<GlobeIcon width={20} height={20} />}
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name="message">
            {(field) => (
              <div className="flex flex-col gap-1">
                <field.TextAreaField
                  label={t("field.message.label")}
                  placeholder={t("field.message.placeholder")}
                  rows={4}
                  maxLength={MESSAGE_MAX_LENGTH}
                />
                <div className="flex justify-end">
                  <span
                    className="text-body-sm-regular text-text-soft-500"
                    aria-live="polite"
                  >
                    {field.state.value?.length ?? 0}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>
              </div>
            )}
          </form.AppField>
        </div>

        <div className={clsx(classes?.footer)}>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                className={clsx("mt-14 w-full", classes?.submit)}
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
            )}
          </form.Subscribe>

          <p className="mt-4 text-body-sm-medium text-text-soft-500 text-center">
            {t.rich("footer", {
              linkTerms: (chunks) => (
                <Link
                  href={ROUTES.termsOfUse}
                  className="text-info-base-600 hover:text-info-subtle-500"
                  target="_blank"
                >
                  {chunks}
                </Link>
              ),
              linkPrivacy: (chunks) => (
                <Link
                  href={ROUTES.privacyPolicy}
                  className="text-info-base-600 hover:text-info-subtle-500"
                  target="_blank"
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

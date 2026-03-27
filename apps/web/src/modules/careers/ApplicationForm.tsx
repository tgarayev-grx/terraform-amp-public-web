"use client";

import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { Button, useAppForm, toast } from "@grx/ui";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { executeRecaptcha } from "@/lib/recaptcha/execute-recaptcha";
import { careersSchema, type CareersFormValues } from "./careersSchema";
import { submitCandidate } from "./actions";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";

type SubmissionState = "idle" | "success" | "duplicate";

type ApplicationFormProps = {
  vacancyId: number;
  vacancyName: string;
};

export function ApplicationForm({
  vacancyId,
  vacancyName,
}: ApplicationFormProps) {
  const t = useTranslations();
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      hurma_vacancy_id: vacancyId,
      cv: null as unknown as File,
    } as CareersFormValues,
    validators: {
      onMount: careersSchema,
      onChange: careersSchema,
      onSubmit: careersSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const recaptchaResult = await executeRecaptcha(
          RECAPTCHA_ACTIONS.careers_apply
        );
        if (!recaptchaResult.success) {
          console.error("[ApplicationForm] Recaptcha verification failed");
          toast.error(t("CareersPage.applicationForm.toast.error"));
          return;
        }

        const result = await submitCandidate(value, {
          vacancyName,
          recaptchaToken: recaptchaResult.data.token,
        });

        if (result.success) {
          form.reset();
          setSubmissionState("success");
          return;
        }

        if ("isDuplicate" in result && result.isDuplicate) {
          setSubmissionState("duplicate");
          return;
        }

        if ("fieldErrors" in result && result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldMeta(field as keyof CareersFormValues, (prev) => ({
              ...prev,
              errors: [message],
            }));
          }
          return;
        }

        toast.error(t("CareersPage.applicationForm.toast.error"));
      } catch (error) {
        console.error(
          "[ApplicationForm] Unexpected error during submission:",
          error
        );
        toast.error(t("CareersPage.applicationForm.toast.error"));
      }
    },
  });

  if (submissionState === "success") {
    return (
      <div className="flex flex-col gap-10">
        <SuccessAlert
          title={t("CareersPage.applicationForm.successAlert.title")}
          description={t(
            "CareersPage.applicationForm.successAlert.description"
          )}
          exploreLink={t(
            "CareersPage.applicationForm.successAlert.exploreLink"
          )}
        />
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className="flex flex-wrap gap-x-5 gap-y-10">
          <div className="w-full">
            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label={t("CareersPage.applicationForm.fields.name.label")}
                  placeholder={t(
                    "CareersPage.applicationForm.fields.name.placeholder"
                  )}
                />
              )}
            </form.AppField>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  label={t("CareersPage.applicationForm.fields.email.label")}
                  placeholder={t(
                    "CareersPage.applicationForm.fields.email.placeholder"
                  )}
                  type="email"
                />
              )}
            </form.AppField>

            <form.AppField name="phone">
              {(field) => (
                <field.TextField
                  label={t("CareersPage.applicationForm.fields.phone.label")}
                  placeholder={t(
                    "CareersPage.applicationForm.fields.phone.placeholder"
                  )}
                  type="tel"
                />
              )}
            </form.AppField>
          </div>

          <div className="w-full">
            <form.AppField name="cv">
              {(field) => (
                <field.FileUpload
                  label={t("CareersPage.applicationForm.fields.cv.label")}
                  triggerLabel={t(
                    "CareersPage.applicationForm.fields.cv.triggerLabel"
                  )}
                  helperText={t(
                    "CareersPage.applicationForm.fields.cv.helperText"
                  )}
                  invalidTypeMessage={t(
                    "CareersPage.applicationForm.errors.cv.invalidType"
                  )}
                  maxSizeBytes={5 * 1024 * 1024}
                />
              )}
            </form.AppField>
          </div>

          <div className="w-full">
            <form.AppField name="description">
              {(field) => (
                <field.TextAreaField
                  label={t(
                    "CareersPage.applicationForm.fields.coverLetter.label"
                  )}
                  placeholder={t(
                    "CareersPage.applicationForm.fields.coverLetter.placeholder"
                  )}
                  rows={5}
                  maxLength={1000}
                />
              )}
            </form.AppField>
          </div>
        </div>

        {submissionState === "duplicate" && (
          <DuplicateAlert
            title={t("CareersPage.applicationForm.duplicateAlert.title")}
            description={t(
              "CareersPage.applicationForm.duplicateAlert.description"
            )}
            exploreLink={t(
              "CareersPage.applicationForm.duplicateAlert.exploreLink"
            )}
          />
        )}

        <div className="flex flex-col gap-[var(--400,16px)]">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="self-start"
              >
                {isSubmitting
                  ? t("CareersPage.applicationForm.submitting")
                  : t("CareersPage.applicationForm.submit")}
              </Button>
            )}
          </form.Subscribe>

          <p
            className="font-['Nunito_Sans',sans-serif] text-[12px] font-medium leading-[16px] text-text-soft-500"
            style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}
          >
            <PrivacyNote />
          </p>
        </div>
      </form.AppForm>
    </form>
  );
}

function PrivacyNote() {
  const t = useTranslations();
  return t.rich(
    "CareersPage.applicationForm.privacyNote",
    defaultRichComponents
  );
}

function SuccessAlert({
  title,
  description,
  exploreLink,
}: {
  title: string;
  description: string;
  exploreLink: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-2 rounded-xl border border-success-soft-400 bg-success-muted-50 px-3 py-3"
    >
      <span className="shrink-0 text-success-base-600" aria-hidden="true">
        <CheckCircleFilledIcon />
      </span>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-body-md-medium text-text-strong-1000">{title}</p>
          <p className="text-body-md-regular text-text-subtle-700">
            {description}
          </p>
        </div>
        <ExploreLink>{exploreLink}</ExploreLink>
      </div>
    </div>
  );
}

function DuplicateAlert({
  title,
  description,
  exploreLink,
}: {
  title: string;
  description: string;
  exploreLink: string;
}) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-warning-soft-400 bg-warning-muted-50 px-3 py-3"
    >
      <span className="shrink-0 text-warning-base-600" aria-hidden="true">
        <WarningFilledIcon />
      </span>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-body-md-medium text-text-strong-1000">{title}</p>
          <p className="text-body-md-regular text-text-subtle-700">
            {description}
          </p>
        </div>
        <ExploreLink>{exploreLink}</ExploreLink>
      </div>
    </div>
  );
}

function ExploreLink({ children }: { children: ReactNode }) {
  return (
    <Link
      href="/careers/positions"
      className="group inline-flex items-center gap-1.5"
    >
      <span className="text-body-md-semibold text-text-strong-1000 group-hover:underline">
        {children}
      </span>
      <ArrowRightIcon className="text-icon-strong-1000" />
    </Link>
  );
}

function CheckCircleFilledIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningFilledIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.029 0l6.381 11.054c.674 1.168-.168 2.629-1.514 2.629H3.619c-1.346 0-2.188-1.461-1.514-2.629L8.485 2.495ZM10 7a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 10 7Zm1 6.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path
        d="M4.167 10h11.666M10.833 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

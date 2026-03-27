"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, useAppForm, toast } from "@grx/ui";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/constants";
import { executeRecaptcha } from "@/lib/recaptcha/execute-recaptcha";
import {
  submitCVSchema,
  type SubmitCVFormValues,
} from "@/modules/careers/careersSchema";
import { submitGeneralCV } from "@/modules/careers/actions";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";

type ModalState = "idle" | "duplicate";

interface SubmitCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitCVModal({ isOpen, onClose }: SubmitCVModalProps) {
  const t = useTranslations("CareersPage");
  const [modalState, setModalState] = useState<ModalState>("idle");

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
      cv: null as unknown as File,
    } as SubmitCVFormValues,
    validators: {
      onMount: submitCVSchema,
      onChange: submitCVSchema,
      onSubmit: submitCVSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const recaptchaResult = await executeRecaptcha(
          RECAPTCHA_ACTIONS.careers_apply
        );
        if (!recaptchaResult.success) {
          console.error("[SubmitCVModal] Recaptcha verification failed");
          toast.error(t("submitCVModal.errorToast"));
          return;
        }

        const result = await submitGeneralCV({
          ...value,
          recaptchaToken: recaptchaResult.data.token,
        });

        if (result.success) {
          form.reset();
          setModalState("idle");
          onClose();
          toast.success(t("submitCVModal.successToast"));
          return;
        }

        if ("isDuplicate" in result && result.isDuplicate) {
          setModalState("duplicate");
          return;
        }

        if ("fieldErrors" in result && result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            form.setFieldMeta(field as keyof SubmitCVFormValues, (prev) => ({
              ...prev,
              errors: [message],
            }));
          }
          return;
        }

        toast.error(t("submitCVModal.errorToast"));
      } catch (error) {
        console.error(
          "[SubmitCVModal] Unexpected error during submission:",
          error
        );
        toast.error(t("submitCVModal.errorToast"));
      }
    },
  });

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset();
      setModalState("idle");
      onClose();
    }
  }

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          {/* Header */}
          <div className="px-8 pt-8 pb-6 shrink-0">
            <Modal.Title className="text-title-md font-bold text-text-strong-1000">
              {t("submitCVModal.title")}
            </Modal.Title>
            <p className="mt-2 text-body-md-regular text-text-subtle-700">
              {t("submitCVModal.description")}
            </p>
          </div>

          <Modal.Close aria-label={t("submitCVModal.close")} />

          {/* Form */}
          <div className="px-8 pb-8 overflow-y-auto">
            {modalState === "duplicate" && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-2xl border border-stroke-base-300 bg-bg-weak-100 p-5"
              >
                <span className="mt-0.5 shrink-0" aria-hidden="true">
                  <WarningFilledIcon />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-body-md-medium text-text-strong-1000">
                    {t("submitCVModal.duplicateAlert.title")}
                  </p>
                  <p className="text-body-md-regular text-text-subtle-700">
                    {t("submitCVModal.duplicateAlert.description")}
                  </p>
                  <Link
                    href="/careers/positions"
                    className="text-body-md-medium text-text-strong-1000 hover:underline"
                    onClick={onClose}
                  >
                    {t("submitCVModal.duplicateAlert.exploreLink")}
                  </Link>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.AppForm>
                <div className="flex flex-wrap gap-5">
                  <div className="w-full sm:w-[calc(50%-10px)]">
                    <form.AppField name="name">
                      {(field) => (
                        <field.TextField
                          label={t("submitCVModal.fields.name.label")}
                          placeholder={t(
                            "submitCVModal.fields.name.placeholder"
                          )}
                        />
                      )}
                    </form.AppField>
                  </div>

                  <div className="w-full sm:w-[calc(50%-10px)]">
                    <form.AppField name="email">
                      {(field) => (
                        <field.TextField
                          label={t("submitCVModal.fields.email.label")}
                          placeholder={t(
                            "submitCVModal.fields.email.placeholder"
                          )}
                          type="email"
                        />
                      )}
                    </form.AppField>
                  </div>

                  <div className="w-full">
                    <form.AppField name="cv">
                      {(field) => (
                        <field.FileUpload
                          label={t("submitCVModal.fields.cv.label")}
                          triggerLabel={t(
                            "submitCVModal.fields.cv.triggerLabel"
                          )}
                          helperText={t("submitCVModal.fields.cv.helperText")}
                          invalidTypeMessage={t(
                            "submitCVModal.fields.cv.invalidType"
                          )}
                        />
                      )}
                    </form.AppField>
                  </div>

                  <div className="w-full">
                    <form.AppField name="description">
                      {(field) => (
                        <field.TextAreaField
                          label={t("submitCVModal.fields.coverLetter.label")}
                          placeholder={t(
                            "submitCVModal.fields.coverLetter.placeholder"
                          )}
                          rows={5}
                          maxLength={1000}
                        />
                      )}
                    </form.AppField>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-6">
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting
                          ? t("submitCVModal.submitting")
                          : t("submitCVModal.submit")}
                      </Button>
                    )}
                  </form.Subscribe>

                  <p className="text-center text-body-sm-medium text-text-soft-500">
                    <PrivacyNote />
                  </p>
                </div>
              </form.AppForm>
            </form>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

function PrivacyNote() {
  const t = useTranslations("CareersPage");
  return t.rich("submitCVModal.privacyNote", defaultRichComponents);
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
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="#f59e0b"
      />
    </svg>
  );
}

"use client";

import {
  FileUpload,
  ACCEPTED_CV_MIME_TYPES,
} from "../components/file-upload/FileUpload";
import { useFieldContext } from "./formContext";
import { useFormContext } from "./formContext";
import type { FileUploadProps } from "../components/file-upload/FileUpload";

export type FormFileUploadProps = Omit<
  FileUploadProps,
  "value" | "onChange" | "onBlur" | "name" | "errorText"
> & {
  invalidTypeMessage?: string;
};

export function FormFileUpload({
  invalidTypeMessage,
  ...props
}: FormFileUploadProps) {
  const field = useFieldContext<File | null>();
  const form = useFormContext();

  const shouldShowError =
    form.state.submissionAttempts > 0 || field.state.meta.isBlurred;

  const errorText = shouldShowError
    ? (field.state.meta.errors[0]?.message ?? null)
    : null;

  return (
    <FileUpload
      {...props}
      name={field.name}
      value={field.state.value}
      errorText={errorText}
      onChange={(file) => {
        if (file && !ACCEPTED_CV_MIME_TYPES.includes(file.type)) {
          field.setMeta((prev) => ({
            ...prev,
            errors: [
              {
                message:
                  invalidTypeMessage ??
                  "Only PDF, DOC, and DOCX files are accepted.",
              },
            ],
          }));
          return;
        }
        field.handleChange(file);
      }}
      onBlur={field.handleBlur}
    />
  );
}

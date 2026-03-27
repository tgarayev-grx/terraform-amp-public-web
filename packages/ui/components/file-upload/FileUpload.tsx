"use client";

import { useRef, type ChangeEvent } from "react";
import { Button } from "../button/Button";
import { Field } from "../field/Field";
import { FileFormatIcon } from "./FileFormatIcon";

export const ACCEPTED_CV_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type FileUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  maxSizeBytes?: number;
  name?: string;
  disabled?: boolean;
  helperText?: string;
  errorText?: string | null;
  label?: string;
  triggerLabel?: string;
};

export function FileUpload({
  value,
  onChange,
  onBlur,
  maxSizeBytes = 5 * 1024 * 1024,
  name,
  disabled = false,
  helperText,
  errorText,
  label = "Resume / CV",
  triggerLabel = "Attach document",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError = !!errorText;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    if (file) {
      onChange(file);
    }
  }

  function handleRemove() {
    onChange(null);
    onBlur?.();
  }

  return (
    <Field.Root id={name}>
      <Field.Label noId>{label}</Field.Label>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={ACCEPTED_EXTENSIONS}
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only"
        disabled={disabled}
        onChange={handleInputChange}
        onBlur={onBlur}
      />

      {value ? (
        <div
          className={[
            "relative flex items-center gap-3 rounded-2xl border p-4",
            hasError ? "border-red-400" : "border-neutral-600",
          ].join(" ")}
        >
          <FileFormatIcon filename={value.name} />

          <div className="min-w-0 flex-1 flex flex-col gap-1.5">
            <p className="truncate text-sm font-medium text-white">
              {value.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">
                {formatBytes(value.size)} of {formatBytes(maxSizeBytes)}
              </span>
              <span
                className="w-px h-3 bg-neutral-600 shrink-0"
                aria-hidden="true"
              />
              {hasError ? (
                <div className="flex items-center gap-1">
                  <ErrorCircleIcon className="shrink-0 text-red-500" />
                  <span className="text-xs text-red-500">Error</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="shrink-0 text-[#3EAD3E]" />
                  <span className="text-xs text-[#3EAD3E]">Completed</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Remove file"
            disabled={disabled}
            onClick={handleRemove}
            className="absolute top-3 right-3 shrink-0 rounded-full p-1 text-neutral-400 transition-colors hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base-1000 disabled:cursor-not-allowed"
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 w-full">
          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={disabled}
            aria-invalid={hasError}
            className={hasError ? "border border-red-400 shrink-0" : "shrink-0"}
            onClick={() => inputRef.current?.click()}
          >
            {triggerLabel}
          </Button>
          {(errorText ?? helperText) && (
            <span
              className={`text-[14px] leading-[20px] font-normal ${hasError ? "text-red-500" : "text-text-soft-500"}`}
            >
              {errorText ?? helperText}
            </span>
          )}
        </div>
      )}

      {value && (errorText ?? helperText) && (
        <Field.HelperText isError={hasError}>
          {errorText ?? helperText}
        </Field.HelperText>
      )}
    </Field.Root>
  );
}

function PaperclipIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.536 7.172L7.878 12.83a4 4 0 01-5.657-5.657l5.657-5.657a2.667 2.667 0 013.771 3.771L5.993 10.944a1.333 1.333 0 01-1.886-1.886l5.657-5.657"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 8l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5v3.5M8 10.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333a1.333 1.333 0 001.333 1.334h5.334a1.333 1.333 0 001.333-1.334L12.667 4H3.333z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import { useFieldContext } from "./formContext";
import { TextField } from "../components/text-field";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Field } from "../components/field/Field";
import { useFieldError } from "./FieldError";

export type FormTextAreaFieldProps = {
  label: ReactNode;
  placeholder?: string;
  helperText?: ReactNode;
  disabled?: boolean;
  rows?: ComponentPropsWithoutRef<typeof TextField.TextArea>["rows"];
  maxLength?: ComponentPropsWithoutRef<typeof TextField.TextArea>["maxLength"];
};

export function FormTextAreaField({
  label,
  placeholder,
  helperText,
  disabled,
  maxLength,
  rows = 4,
}: FormTextAreaFieldProps) {
  const field = useFieldContext<string>();
  const errorText = useFieldError();
  const hasHelperText = helperText || !!errorText;

  return (
    <Field.Root id={field.name}>
      <Field.Label>{label}</Field.Label>

      <TextField.Control
        hasError={!!errorText}
        hasDisabled={disabled}
        variant="textarea"
      >
        <TextField.TextArea
          name={field.name}
          rows={rows}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
        />
      </TextField.Control>
      {maxLength && (
        <div className="mt-1 flex justify-end">
          <span className="text-[12px] leading-[16px] text-text-soft-500">
            {field.state.value?.length || 0}/{maxLength}
          </span>
        </div>
      )}

      {hasHelperText && (
        <Field.HelperText isError={!!errorText}>
          {errorText ?? helperText}
        </Field.HelperText>
      )}
    </Field.Root>
  );
}

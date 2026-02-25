"use client";

import { useFieldContext } from "./formContext";
import { SingleSelect } from "../components/select";
import type { SingleSelectOption } from "../components/select";
import type { ReactNode } from "react";
import { Field } from "../components/field/Field";
import { useFieldError } from "./FieldError";

export type FormSingleSelectProps = {
  label: ReactNode;
  placeholder?: string;
  options: SingleSelectOption[];
  helperText?: ReactNode;
  start?: ReactNode;
};

export function FormSingleSelect({
  label,
  placeholder,
  options,
  helperText,
  start,
}: FormSingleSelectProps) {
  const field = useFieldContext<string>();

  const errorText = useFieldError();
  const hasHelperText = helperText || errorText;

  return (
    <Field.Root id={field.name}>
      <Field.Label>{field.state.value ? label : " "}</Field.Label>

      <SingleSelect.Root
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <SingleSelect.Trigger
          placeholder={placeholder}
          onBlur={field.handleBlur}
          hasError={!!errorText}
          start={start}
        />

        <SingleSelect.Content>
          {options.map((opt) => (
            <SingleSelect.Item key={opt.value} value={opt.value}>
              {opt.label}
            </SingleSelect.Item>
          ))}
        </SingleSelect.Content>
      </SingleSelect.Root>

      {hasHelperText && (
        <Field.HelperText isError={!!errorText}>
          {errorText ?? helperText}
        </Field.HelperText>
      )}
    </Field.Root>
  );
}

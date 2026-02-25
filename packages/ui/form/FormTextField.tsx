"use client";

import { useFieldContext } from "./formContext";
import { TextField } from "../components/text-field";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Field } from "../components/field/Field";
import { useFieldError } from "./FieldError";

export type FormTextFieldProps = {
  type?: ComponentPropsWithoutRef<typeof TextField.Input>["type"];
  label: ReactNode;
  placeholder?: string;
  helperText?: ReactNode;
  disabled?: boolean;
};

export function FormTextField({
  label,
  placeholder,
  type,
  helperText,
  disabled,
}: FormTextFieldProps) {
  const field = useFieldContext<string>();
  const errorText = useFieldError();
  const hasHelperText = helperText || !!errorText;

  return (
    <Field.Root id={field.name}>
      <Field.Label>{field.state.value ? label : " "}</Field.Label>

      <TextField.Control
        hasError={!!errorText}
        hasDisabled={disabled}
        variant="input"
      >
        <TextField.Input
          name={field.name}
          type={type}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
        />
      </TextField.Control>

      {hasHelperText && (
        <Field.HelperText isError={!!errorText}>
          {errorText ?? helperText}
        </Field.HelperText>
      )}
    </Field.Root>
  );
}

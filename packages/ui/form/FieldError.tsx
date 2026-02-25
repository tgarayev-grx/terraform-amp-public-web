import { ReactNode } from "react";
import { Field } from "../components/field/Field";
import { useFieldContext, useFormContext } from "./formContext";

export const useFieldError = () => {
  const field = useFieldContext<string>();
  const form = useFormContext();

  return getFieldError(field, form);
};

export const getFieldError = (
  field: ReturnType<typeof useFieldContext<string>>,
  form: ReturnType<typeof useFormContext>
) => {
  const errorText = FormFieldError.shouldShowError(field, form)
    ? FormFieldError.getErrorFromField(field)
    : null;

  return errorText;
};

type FieldErrorProps = {
  children: ({
    message,
    hasError,
  }: {
    message: string | undefined;
    hasError: boolean;
  }) => ReactNode;
};

export const FieldError = ({ children }: FieldErrorProps) => {
  const field = useFieldContext<string>();
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.submissionAttempts > 0}>
      {(isSubmitted) => {
        if (!FormFieldError.shouldShowError2(field, isSubmitted)) {
          return null;
        }

        const message = FormFieldError.getErrorFromField(field);

        return children({ message, hasError: !!message });
      }}
    </form.Subscribe>
  );
};

class FormFieldError {
  public static shouldShowError(
    field: ReturnType<typeof useFieldContext<string>>,
    form: ReturnType<typeof useFormContext>
  ) {
    return form.state.submissionAttempts > 0 || field.state.meta.isBlurred;
  }

  public static shouldShowError2(
    field: ReturnType<typeof useFieldContext<string>>,
    isSubmitted: boolean
  ): boolean {
    return isSubmitted || field.state.meta.isBlurred;
  }

  public static getErrorFromField(
    field: ReturnType<typeof useFieldContext<string>>
  ): string | undefined {
    return field.state.meta.errors[0]?.message;
  }
}

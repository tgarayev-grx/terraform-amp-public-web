"use client";

import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./formContext";
import { FormTextField } from "./FormTextField";
import { FormTextAreaField } from "./FormTextAreaField";
import { FormSingleSelect } from "./FormSingleSelect";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField: FormTextField,
    TextAreaField: FormTextAreaField,
    SingleSelect: FormSingleSelect,
  },
  formComponents: {},
});

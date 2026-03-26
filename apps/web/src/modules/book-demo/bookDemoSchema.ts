import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export function createBookDemoFormSchema(
  t:
    | Awaited<ReturnType<typeof getTranslations<"BookDemo.contactForm">>>
    | ReturnType<typeof useTranslations<"BookDemo.contactForm">>
) {
  return z.object({
    firstName: z
      .string()
      .min(1, t("field.firstName.errors.required"))
      .max(
        FIRST_NAME_MAX_LENGTH,
        t("field.firstName.errors.maxLength", {
          maxLength: FIRST_NAME_MAX_LENGTH.toString(),
        })
      ),
    lastName: z
      .string()
      .min(1, t("field.lastName.errors.required"))
      .max(
        LAST_NAME_MAX_LENGTH,
        t("field.lastName.errors.maxLength", {
          maxLength: LAST_NAME_MAX_LENGTH.toString(),
        })
      ),
    businessEmail: z
      .string()
      .min(1, t("field.businessEmail.errors.required"))
      .email(t("field.businessEmail.errors.invalidEmail")),
    phoneNumber: z
      .string()
      .min(1, t("field.phoneNumber.errors.required"))
      .max(
        PHONE_NUMBER_MAX_LENGTH,
        t("field.phoneNumber.errors.maxLength", {
          maxLength: PHONE_NUMBER_MAX_LENGTH.toString(),
        })
      ),
    primaryRole: z.string().max(
      PRIMARY_ROLE_MAX_LENGTH,
      t("field.primaryRole.errors.maxLength", {
        maxLength: PRIMARY_ROLE_MAX_LENGTH.toString(),
      })
    ),
    country: z
      .string()
      .min(1, t("field.country.errors.required"))
      .max(
        COUNTRY_MAX_LENGTH,
        t("field.country.errors.maxLength", {
          maxLength: COUNTRY_MAX_LENGTH.toString(),
        })
      ),

    message: z.string().max(
      MESSAGE_MAX_LENGTH,
      t("field.message.errors.maxLength", {
        maxLength: MESSAGE_MAX_LENGTH.toString(),
      })
    ),
  });
}

export type BookDemoFormSchema = ReturnType<typeof createBookDemoFormSchema>;

export const FIRST_NAME_MAX_LENGTH = 100;
export const LAST_NAME_MAX_LENGTH = 100;
export const PHONE_NUMBER_MAX_LENGTH = 50;
export const COUNTRY_MAX_LENGTH = 100;
export const PRIMARY_ROLE_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 1000;

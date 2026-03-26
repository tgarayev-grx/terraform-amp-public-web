import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export function createContactFormSchema(
  t:
    | Awaited<ReturnType<typeof getTranslations<"ContactUs.contactForm">>>
    | ReturnType<typeof useTranslations<"ContactUs.contactForm">>
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
    companyName: z
      .string()
      .min(1, t("field.companyName.errors.required"))
      .max(
        COMPANY_NAME_MAX_LENGTH,
        t("field.companyName.errors.maxLength", {
          maxLength: COMPANY_NAME_MAX_LENGTH.toString(),
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
    primaryRole: z.string().max(
      PRIMARY_ROLE_MAX_LENGTH,
      t("field.primaryRole.errors.maxLength", {
        maxLength: PRIMARY_ROLE_MAX_LENGTH.toString(),
      })
    ),
    organizationType: z.string().max(
      ORGANIZATION_TYPE_MAX_LENGTH,
      t("field.organizationType.errors.maxLength", {
        maxLength: ORGANIZATION_TYPE_MAX_LENGTH.toString(),
      })
    ),
    interestedIn: z
      .array(z.enum(INTERESTED_IN_PRODUCTS))
      .min(1, t("field.interestedIn.errors.selectAtLeastOne")),

    message: z.string().max(
      MESSAGE_MAX_LENGTH,
      t("field.message.errors.maxLength", {
        maxLength: MESSAGE_MAX_LENGTH.toString(),
      })
    ),
  });
}

export type ContactFormSchema = ReturnType<typeof createContactFormSchema>;

export const FIRST_NAME_MAX_LENGTH = 100;
export const LAST_NAME_MAX_LENGTH = 100;
export const PHONE_NUMBER_MAX_LENGTH = 50;
export const COMPANY_NAME_MAX_LENGTH = 200;
export const COUNTRY_MAX_LENGTH = 100;
export const PRIMARY_ROLE_MAX_LENGTH = 100;
export const ORGANIZATION_TYPE_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 1000;

export const INTERESTED_IN_PRODUCTS = [
  "GRX_PAY",
  "GRX_EXCHANGE",
  "GRX_RWA",
  "INSTITUTIONAL_STO",
] as const;

export const ORGANIZATION_TYPE_VALUES = [
  "startup",
  "sme",
  "enterprise",
  "financialInstitution",
  "other",
] as const;

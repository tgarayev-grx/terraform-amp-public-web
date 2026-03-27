import { z } from "zod";

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const COVER_LETTER_MAX_LENGTH = 1000;

const cvField = z
  .custom<File>((val) => {
    if (typeof window === "undefined") return true;
    return val instanceof File;
  }, "Please attach your resume")
  .refine(
    (file) => typeof window === "undefined" || file.size <= MAX_CV_SIZE_BYTES,
    "File must be smaller than 5 MB"
  )
  .refine(
    (file) =>
      typeof window === "undefined" ||
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    "Only PDF, DOC, and DOCX files are accepted"
  );

export const careersSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z.string(),
  description: z
    .string()
    .max(
      COVER_LETTER_MAX_LENGTH,
      `Cover letter must be ${COVER_LETTER_MAX_LENGTH} characters or less`
    ),
  hurma_vacancy_id: z.number().int().positive(),
  cv: cvField,
});

export type CareersFormValues = z.infer<typeof careersSchema>;

export const submitCVSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  description: z
    .string()
    .max(
      COVER_LETTER_MAX_LENGTH,
      `Cover letter must be ${COVER_LETTER_MAX_LENGTH} characters or less`
    ),
  cv: cvField,
});

export type SubmitCVFormValues = z.infer<typeof submitCVSchema>;

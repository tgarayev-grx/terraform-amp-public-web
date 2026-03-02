import { SUPPORT_EMAIL } from "@/config/emails";

const STILL_HAVE_QUESTIONS = {
  heading: "Still have questions?",
  description:
    "Can't find the answer you're looking for? Feel free to reach out, we're happy to help.",
} as const;

export function StillHaveQuestions() {
  return (
    <section
      className="px-4 sm:px-8 pt-[56px] pb-24 sm:pb-32"
      aria-labelledby="still-have-questions-heading"
    >
      <div className="bg-bg-weak-100 mx-auto p-6 sm:p-10 rounded-2xl w-full max-w-[980px]">
        <h2
          className="text-text-strong-1000 text-title-sm md:text-title-lg"
          id="still-have-questions-heading"
        >
          {STILL_HAVE_QUESTIONS.heading}
        </h2>

        <p className="mt-2 text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
          {STILL_HAVE_QUESTIONS.description}
        </p>

        <p className="mt-4">
          <a
            className="text-info-base-600 hover:text-info-subtle-500"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}

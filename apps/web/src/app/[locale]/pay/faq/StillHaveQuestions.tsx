import { SUPPORT_EMAIL } from "@/config/emails";

const STILL_HAVE_QUESTIONS = {
  heading: "Still have questions?",
  description:
    "Can't find the answer you're looking for? Feel free to reach out, we're happy to help.",
} as const;

export function StillHaveQuestions() {
  return (
    <section
      className="px-4 pt-[56px] pb-24 sm:px-8 sm:pb-32"
      aria-labelledby="still-have-questions-heading"
    >
      <div className="mx-auto w-full max-w-[980px] rounded-2xl bg-neutral-100 p-6 sm:p-10">
        <h2
          className="font-bold text-[18px] leading-[22px] tracking-[0.4px] text-neutral-1000 sm:text-[24px] sm:leading-[28px] sm:tracking-normal"
          id="still-have-questions-heading"
        >
          {STILL_HAVE_QUESTIONS.heading}
        </h2>
        <p className="mt-2 font-normal text-sm leading-5 text-neutral-700 sm:text-base sm:leading-6">
          {STILL_HAVE_QUESTIONS.description}
        </p>
        <p className="mt-4">
          <a
            className="font-normal text-sm leading-5 text-blue-600 underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded sm:text-base sm:leading-6"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}

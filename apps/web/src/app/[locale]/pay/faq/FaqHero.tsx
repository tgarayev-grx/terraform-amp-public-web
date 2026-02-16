const HERO = {
  title: "FAQ",
  subtitle: "Here are our most frequently asked questions",
} as const;

const HERO_HEADING_ID = "faq-hero-heading";

export function FaqHero() {
  return (
    <section
      className="flex flex-col items-center pt-20 pb-14 sm:pt-24"
      aria-labelledby={HERO_HEADING_ID}
    >
      <div className="mx-auto w-full max-w-[980px] px-4 text-center sm:px-8">
        <h1
          id={HERO_HEADING_ID}
          className="font-unbounded font-bold text-[28px] leading-[32px] text-neutral-1000 sm:text-[36px] sm:leading-[40px]"
        >
          {HERO.title}
        </h1>
        <p className="mt-4 font-medium text-base leading-6 text-neutral-700 sm:text-[20px] sm:leading-[26px]">
          {HERO.subtitle}
        </p>
      </div>
    </section>
  );
}

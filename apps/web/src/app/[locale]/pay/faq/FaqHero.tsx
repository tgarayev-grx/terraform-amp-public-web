const HERO = {
  title: "FAQ",
  subtitle: "Here are our most frequently asked questions",
} as const;

const HERO_HEADING_ID = "faq-hero-heading";

export function FaqHero() {
  return (
    <section
      className="flex flex-col items-center pt-20 sm:pt-24 pb-14"
      aria-labelledby={HERO_HEADING_ID}
    >
      <div className="mx-auto px-4 sm:px-8 w-full max-w-[980px] text-center">
        <h1
          id={HERO_HEADING_ID}
          className="font-unbounded text-display-sm text-text-strong-1000 md:text-display-md"
        >
          {HERO.title}
        </h1>

        <p className="mt-4 text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
          {HERO.subtitle}
        </p>
      </div>
    </section>
  );
}

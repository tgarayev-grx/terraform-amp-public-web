import type { getTranslations } from "next-intl/server";

/** Translation function from getTranslations() (server). Use for typing props when passing t from a Server Component. */
export type ServerTranslationFn = Awaited<ReturnType<typeof getTranslations>>;

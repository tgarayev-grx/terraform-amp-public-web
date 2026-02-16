export const FAQ_ARTICLES = [
  { slug: "what-are-crypto-payments", title: "What Are Crypto Payments?" },
  {
    slug: "why-should-i-pay-in-bitcoin",
    title: "Why Should I Pay in Bitcoin?",
  },
  {
    slug: "what-digital-currencies-supported",
    title: "What Are Digital Currencies Supported for Crypto Pay?",
  },
  {
    slug: "how-secure-to-pay-crypto",
    title: "How Is It Secure to Pay Crypto?",
  },
  {
    slug: "what-is-cryptocurrency-processing",
    title: "What Is Cryptocurrency Processing?",
  },
  {
    slug: "why-accept-cryptocurrency-payments",
    title: "Why Should I Accept Cryptocurrency Payments?",
  },
  {
    slug: "businesses-benefit-from-cryptocurrency-processing",
    title:
      "What Types of Businesses Can Benefit From Cryptocurrency Processing?",
  },
  {
    slug: "how-start-accepting-cryptocurrency-payments",
    title: "How do I Start Accepting Cryptocurrency Payments?",
  },
  {
    slug: "is-it-safe-to-accept-cryptocurrency-payments",
    title: "Is it Safe to Accept Cryptocurrency Payments?",
  },
] as const;

export type FAQArticle = (typeof FAQ_ARTICLES)[number];

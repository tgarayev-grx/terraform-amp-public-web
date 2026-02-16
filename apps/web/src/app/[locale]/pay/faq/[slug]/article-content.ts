import { SUPPORT_EMAIL } from "@/config/emails";

export type InlinePart =
  | { type: "text"; value: string }
  | { type: "link"; href: string; text: string }
  | { type: "bold"; text: string };

export type ArticleBlock =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; content: string | InlinePart[] }
  | { type: "list"; items: string[] };

export type ArticleSection = {
  heading: string;
  blocks: ArticleBlock[];
};

export function headingToId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const LOREM_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_SHORT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

function loremSections(count: number): ArticleSection[] {
  return Array.from({ length: count }, (_, i) => ({
    heading: `${i + 1}. ${["Introduction", "Overview", "Details", "Summary"][i % 4]}`,
    blocks: [
      { type: "paragraph", content: LOREM_PARAGRAPH },
      { type: "paragraph", content: LOREM_SHORT },
      ...(i % 2 === 0
        ? [{ type: "list" as const, items: [LOREM_SHORT, LOREM_SHORT] }]
        : []),
    ],
  }));
}

const ARTICLE_BODY_BY_SLUG: Record<string, ArticleSection[]> = {
  "what-are-crypto-payments": [
    {
      heading: "1. Introduction",
      blocks: [
        {
          type: "paragraph",
          content:
            "We take your privacy and data security seriously. KUNA is committed to transparency in the collection and use of your personal information.",
        },
        { type: "subheading", text: "Acceptance of this Privacy Policy." },
        {
          type: "paragraph",
          content:
            'By visiting, accessing or using any of our website, mobile application or cryptocurrency trading and related services, you consent to this Privacy Policy ("Policy") so please read it carefully. If you consider any term or condition of this Privacy Policy to be unacceptable, please do not visit, access or use the KUNA\'s website(s) or services.',
        },
        {
          type: "paragraph",
          content:
            "The terms in this Policy are used in accordance with the Terms of Use, Anti-Money Laundering Policy and the applicable data protection legislation.",
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value:
                "If you have any questions about this Privacy Policy, please contact us via email: ",
            },
            {
              type: "link",
              href: `mailto:${SUPPORT_EMAIL}`,
              text: SUPPORT_EMAIL,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Who we are?",
      blocks: [
        {
          type: "paragraph",
          content:
            "According to applicable data protection legislation (namely, General Data Protection Regulation and Canada Personal Information Protection and Electronic Documents Act) we are controllers of your personal data. A personal data controller is a person who determines the purposes and means of the processing of personal data. Since we are operating in several countries, for your convenience, you may find in the table below the respective details relevant to you when it comes to the exact entity which is the data controller of your personal data:",
        },
        {
          type: "paragraph",
          content:
            "If you are dissatisfied with the way we process your personal data, you have the right to lodge a complaint with the supervisory authority for data protection issues. We would, however, appreciate the chance to deal with your concerns before you approach the supervisory authority for data protection issues.",
        },
        {
          type: "paragraph",
          content:
            "If you are a resident of an EEA Member State, you may find the information about your supervisory authority here.",
        },
      ],
    },
    {
      heading: "3. Collection and use of personal data",
      blocks: [
        {
          type: "paragraph",
          content:
            'Personal data means any information relating to an identified or identifiable natural person (data subject); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person. Personal data does not include a person\'s name, title, business address or telephone number, as an employee of an organization. Where this Policy states that a list of items is "including", the lists so described are meant to be examples and not exhaustive or exclusive.',
        },
        {
          type: "paragraph",
          content:
            "We use different methods to collect personal data about our users and visitors. Usually, you personally provide us with your data by directly interacting with us when you:",
        },
        {
          type: "list",
          items: [
            "visit our website(s) or services;",
            "apply for our services;",
            "create an account;",
            "make use of any of our services;",
            "request marketing to be sent to you, for example by subscribing to our newsletters;",
            "enter a competition, promotion or survey, including through social media channels;",
            "give us feedback or contact us.",
          ],
        },
        {
          type: "paragraph",
          content:
            "We will also use third parties and/or publicly available sources to obtain data related to you. We may use the following sources:",
        },
        {
          type: "list",
          items: [
            "fraud and crime prevention agencies;",
            "publicly available information on the Internet;",
            "public blockchain.",
          ],
        },
        {
          type: "subheading",
          text: "3.1. Information you voluntarily provide to us",
        },
        {
          type: "paragraph",
          content:
            "Depending on whether and how you use our services, we'll ask you to provide us with some important information about yourself, which we have grouped in categories as follows:",
        },
        {
          type: "list",
          items: [
            "Identity and Contact data: full name (full legal name), email address, home address, work address, date of birth and gender, nationality, phone number, visual image of your face.",
            "Documents: national identity cards, passports, driving licenses or other forms of identification documents, tax ID number, visa information, utility bills, proof of legal formation (e.g. Articles of Incorporation), personal identification information for all material beneficial owners, and/or any other documents deemed necessary to comply with our legal obligations under financial or anti-money laundering laws.",
            "Financial data: bank account information, payment card primary account number (PAN), transaction history, trading data, and/or tax identification, source of funds and related documentation.",
            "Transactional data: details about payments to and from you, such as the name of the recipient, your name, the amount, and/or timestamp.",
            "Employment data: office location, job title, and/or description of role.",
            "Correspondence: chat messages with KUNA's Customer Support, chat attachments which may include screenshots, photos, videos etc., survey responses.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Please note, if you choose not to share certain information with us, we may not be able to serve you as effectively or offer you our services. As we add new features and services, you may be asked to provide additional information.",
        },
        {
          type: "subheading",
          text: "3.2. Information we collect from you automatically",
        },
        {
          type: "paragraph",
          content:
            "To the extent permitted under the applicable law, we may collect certain types of information automatically, such as whenever you interact with our website(s) or use the services. This information helps us to improve our website(s) and services, and tailor content, recommendations, and advertisements we and third parties display to you. Information collected automatically includes:",
        },
        {
          type: "list",
          items: [
            "Usage data: information about how you use the website(s) and services, and other offerings made available by us, including: device download time, install time, interaction type and time, event time, name and source.",
            "Marketing data: your preferences in receiving marketing from us or third parties.",
            "Online Identifiers: geo location/tracking details, browser fingerprint, operating system, browser name and version, and/or personal IP addresses.",
          ],
        },
        {
          type: "paragraph",
          content:
            "We may also automatically receive and record the following information on our server logs:",
        },
        {
          type: "list",
          items: [
            "how you came to our website(s) and use the services;",
            "device type and unique device identification numbers;",
            "device event information (such as crashes, system activity and hardware settings, browser type, browser language, the date and time of your request and referral URL);",
            "how your device interacts with our website(s) and services, including pages accessed and links clicked;",
            "broad geographic location (e.g. country or city-level location); and",
            "other technical data collected through cookies, pixel tags and other similar technologies that uniquely identify your browser.",
          ],
        },
      ],
    },
    {
      heading: "4. Children's personal data",
      blocks: [
        {
          type: "paragraph",
          content:
            "Our services are exclusively offered to individuals at least 18 years old. We do not process any personal data of children under this age.",
        },
      ],
    },
    {
      heading: "5. Purpose of processing personal data",
      blocks: [
        {
          type: "paragraph",
          content:
            "We will process your personal data only for the purpose of providing to you the services that you ask us to provide you, to satisfy the legal obligations stemming from regulatory obligations that arise from providing you the services and our legitimate interest (clause 6 of the GDPR for individuals who are located in the European Economic Area).",
        },
        {
          type: "paragraph",
          content: "We will use your personal data for the following purposes:",
        },
        {
          type: "list",
          items: [
            "to manage risk and crime prevention including performing anti-money laundering, counter terrorism, sanction screening, fraud and other background checks, detect, investigate, report and prevent financial crime in broad sense, obey laws and regulations which apply to us and response to complaints and resolving them;",
            "to process and deliver our services to you, including registering you as a new user, contacting you via email or calls, etc.;",
            "to manage, process, collect and transfer payments, fees and charges and to ensure good management of our payments, fees and charges;",
            "to keep our records updated and to study how customers use our products/services;",
            "to gather market data for studying customers' behavior including their preference, interest and how they use our products/services, determining our marketing campaigns and growing our business",
            "to administer and protect our website(s) and services in order to provide network security and prevention of the fraud;",
            "to deliver relevant website content and advertisements to you;",
            "to improve our website(s) and services; and",
            "or any purpose that you provide your consent.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the purpose of delivering the requested services and improving our services. However, if you choose to limit the use of your personal information, certain features or services may not be available to you.",
        },
      ],
    },
    {
      heading: "6. Data subject rights",
      blocks: [
        {
          type: "paragraph",
          content: "You have the following rights:",
        },
        {
          type: "list",
          items: [
            "receive confirmation as to whether or not personal data concerning you is being processed, and access your stored personal data, together with supplementary information;",
            "receive a copy of personal data you directly volunteer to us in a structured, commonly used and machine-readable format;",
            "request rectification of your personal data that is in our control;",
            "request erasure of your personal data;",
            "object to the processing of personal data by us;",
            "request to restrict processing of your personal data by us;",
            "lodge a complaint with a supervisory authority.",
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value:
                "However, please note that these rights are not absolute, and may be subject to our own legitimate interests and regulatory requirements. If you wish to exercise any of the aforementioned rights or receive more information, please contact us at ",
            },
            {
              type: "link",
              href: `mailto:${SUPPORT_EMAIL}`,
              text: SUPPORT_EMAIL,
            },
            { type: "text", value: "." },
          ],
        },
        {
          type: "paragraph",
          content:
            "Please note that we may request that you provide some details necessary to verify your identity when you request to exercise a legal right regarding your personal data.",
        },
      ],
    },
    {
      heading: "7. Disclosure of personal data",
      blocks: [
        {
          type: "paragraph",
          content:
            "We share your personal data with our third-party service providers, agents, subcontractors and other associated organizations, our group companies, and affiliates (as described below) in order to complete tasks and provide the Services to you on our behalf.",
        },
        {
          type: "paragraph",
          content: "We may share your personal data with:",
        },
        {
          type: "list",
          items: [
            "companies that we plan to merge with or be acquired by (should such a combination occur, we will notify you and will require that the newly combined entity follow this Privacy Policy with respect to your personal data);",
            "law enforcement, government officials, or other third parties when we are compelled to do so by a subpoena, court order, or similar legal procedure; or we believe in good faith that the disclosure of Personal Data is necessary to prevent physical harm or financial loss, to report suspected illegal activity or to investigate violations of any of our policies;",
            "identity verification agencies to undertake required verification checks;",
            "fraud or crime prevention agencies to help fight against crimes including fraud, money-laundering and terrorist financing;",
            "our vendors and agents, hired by us to provide you with the Services;",
            "transaction processors (for the purpose of ensuring transaction performance and their operation).",
          ],
        },
        {
          type: "paragraph",
          content:
            "Our website(s) may, from time to time, contain links to and from the websites or services of our partner networks, advertisers, transaction processors, etc. If you follow a link to any of these websites or services, please note that these websites and any services that may be accessible through them have their own privacy policies and that we do not accept any responsibility or liability for these policies or for any information, including personal data that may be collected through these websites or services, such as contact and location data. Please check these policies before you submit any information or personal data to these websites or use these services.",
        },
      ],
    },
    {
      heading: "8. Security of personal data",
      blocks: [
        {
          type: "paragraph",
          content:
            "Data security is of great importance to us, and to protect your personal data we have put in place suitable physical, electronic and managerial procedures to safeguard and secure data collected through our website(s). Steps we take to secure and protect your data include:",
        },
        {
          type: "list",
          items: [
            "the pseudonymization and TLS 1.2 encryption of personal data;",
            "2FA;",
            "the access control;",
            "the ability to ensure the ongoing confidentiality, integrity, availability and resilience of our processing systems and services;",
            "the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident;",
            "only authorized personnel of KUNA has access to your personal data, and this personnel is required to treat the information as confidential.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Notwithstanding the security measures that we take, it is important to remember that the transmission of data via the Internet may not be completely secure and that you are advised to take suitable precautions when transmitting to us data via the Internet. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site, and any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access.",
        },
      ],
    },
    {
      heading: "9. International transfer",
      blocks: [
        {
          type: "paragraph",
          content:
            "Our contractors and affiliates are situated at different locations and we sometimes need to transfer your personal data to third countries to provide our services to you.",
        },
        {
          type: "paragraph",
          content:
            "When transferring personal data outside of Canada, Flexy Pay inc is guided by the principles set out in PIPEDA.",
        },
        {
          type: "paragraph",
          content:
            'UAB "Kuna Pro" may transfer your personal data only in the following cases:',
        },
        {
          type: "list",
          items: [
            "if the country where we transfer your personal data provides an adequate level of personal data protection (based on the relevant decision of European Commission);",
            "if we take appropriate safeguards to ensure that your rights as a data subject are protected;",
            "if any derogations for specific situations apply (for instance, if such transfer is necessary for the establishment, exercise or defense of legal claims or for an important reason of public interest).",
          ],
        },
      ],
    },
    {
      heading: "10. Data retention",
      blocks: [
        {
          type: "paragraph",
          content:
            "We will keep your personal data for as long as it remains necessary for the identified purpose or as required by law, which may extend beyond the termination of our relationship with you. We may retain certain data as necessary to prevent fraud or future abuse, or for legitimate business purposes, such as analysis of aggregated, non-personally-identifiable data, account recovery, or if required by law.",
        },
        {
          type: "paragraph",
          content:
            "For the purposes of complying with our legal or regulatory obligations and the world industry standards for data storage, you give us consent and permission to keep records of such information throughout the term of existence a Business Relationship with you, as well as for 5 (five) years after the termination of Business Relationship.",
        },
      ],
    },
    {
      heading: "11. Changes to privacy policy",
      blocks: [
        {
          type: "paragraph",
          content:
            "We may modify this Privacy Policy from time to time which will be indicated by changing the date at the top of this page. If we make any material changes, we will notify you by email (sent to the email address specified in your account). If you do not accept a new edition of the Privacy Policy, you must stop using the website and services.",
        },
      ],
    },
  ],
};

const ARTICLE_LAST_UPDATED_BY_SLUG: Record<string, string> = {
  "what-are-crypto-payments": "February 7th, 2024",
};

function getDefaultSections(): ArticleSection[] {
  return loremSections(3);
}

export function getArticleBody(slug: string): ArticleSection[] {
  return ARTICLE_BODY_BY_SLUG[slug] ?? getDefaultSections();
}

export function getArticleLastUpdated(slug: string): string {
  return ARTICLE_LAST_UPDATED_BY_SLUG[slug] ?? "February 7th, 2024";
}

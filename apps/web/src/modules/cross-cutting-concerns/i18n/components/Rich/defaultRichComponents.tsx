import { RichTagsFunction } from "next-intl";
import { Link } from "../../navigation";
import { SALES_EMAIL, SUPPORT_EMAIL } from "@/config/emails";

const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;
const SALES_EMAIL_HREF = `mailto:${SALES_EMAIL}`;

export const defaultRichComponents = {
  b: (chunks) => <strong>{chunks}</strong>,
  strong: (chunks) => <strong>{chunks}</strong>,
  i: (chunks) => <em>{chunks}</em>,
  em: (chunks) => <em>{chunks}</em>,
  br: () => <br />,
  nowrap: (chunks) => <span className="text-nowrap">{chunks}</span>,
  span: (chunks) => <span>{chunks}</span>,
  // Specific anchors: href and link text come from config, not from message (use empty tag in .json)
  "contact-support": () => (
    <a href={SUPPORT_EMAIL_HREF} className="text-text-subtle-700">
      {SUPPORT_EMAIL}
    </a>
  ),
  "contact-sales": () => (
    <a href={SALES_EMAIL_HREF} className="text-text-subtle-700">
      {SALES_EMAIL}
    </a>
  ),
  "link-privacy-policy": (chunks) => (
    <Link href="/pay/privacy-policy" className="text-text-subtle-700">
      {chunks}
    </Link>
  ),
  "link-cookie-policy": (chunks) => (
    <Link
      href="/pay/cookie-policy"
      className="text-info-base-600 hover:text-info-strong-800"
    >
      {chunks}
    </Link>
  ),
} satisfies Record<string, RichTagsFunction>;

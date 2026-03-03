import { RichTagsFunction } from "next-intl";
import { Link } from "../../navigation";
import { SALES_EMAIL, SUPPORT_EMAIL } from "@/config/emails";
import { ROUTES } from "@/modules/shared/header/routes";

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
    <a
      className="text-text-subtle-700 hover:text-text-strong-1000"
      href={SUPPORT_EMAIL_HREF}
    >
      {SUPPORT_EMAIL}
    </a>
  ),
  "contact-sales": () => (
    <a
      className="text-text-subtle-700 hover:text-text-strong-1000"
      href={SALES_EMAIL_HREF}
    >
      {SALES_EMAIL}
    </a>
  ),
  "link-privacy-policy": (chunks) => (
    <Link
      className="text-info-base-600 hover:text-info-strong-800"
      href={ROUTES.privacyPolicy}
    >
      {chunks}
    </Link>
  ),
  "link-cookie-policy": (chunks) => (
    <Link
      className="text-info-base-600 hover:text-info-strong-800"
      href={ROUTES.cookiePolicy}
    >
      {chunks}
    </Link>
  ),
} satisfies Record<string, RichTagsFunction>;

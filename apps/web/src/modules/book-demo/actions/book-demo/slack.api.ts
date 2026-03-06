import type { z } from "zod";
import type { BookDemoFormSchema } from "../../bookDemoSchema";
import { getTranslations } from "next-intl/server";
import { CountryCode } from "../../config/countries";

type BookDemoFormPayload = Omit<z.infer<BookDemoFormSchema>, "honeypot">;

export class SlackBookDemoAPI {
  private readonly webhookUrl: string;

  public constructor() {
    this.webhookUrl =
      process.env.SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL ?? "";

    if (!this.webhookUrl) {
      console.error(
        "[SlackBookDemoAPI] SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL is not set"
      );
    }
  }

  public async sendBookDemoSubmission(
    formData: BookDemoFormPayload
  ): Promise<{ ok: boolean; status?: number }> {
    if (!this.webhookUrl) {
      console.error(
        "[SlackBookDemoAPI.sendBookDemoSubmission] webhook URL is not set"
      );
      return { ok: false, status: 500 };
    }

    const t = await getTranslations({
      locale: "en",
      namespace: "Common.countries",
    });
    const countryName = t(formData.country as CountryCode);

    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New Book Demo submission",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "plain_text", text: `*First name*\n${formData.firstName}` },
          { type: "plain_text", text: `*Last name*\n${formData.lastName}` },
          {
            type: "plain_text",
            text: `*Email*\n${formData.businessEmail}`,
          },
          {
            type: "plain_text",
            text: `*Phone*\n${formData.phoneNumber}`,
          },
          {
            type: "plain_text",
            text: countryName
              ? `*Country*\n${countryName} (${formData.country})`
              : `*Country*\n${formData.country}`,
          },
          ...(formData.primaryRole
            ? [
                {
                  type: "plain_text" as const,
                  text: `*Primary role*\n${formData.primaryRole}`,
                },
              ]
            : []),
        ],
      },
      ...(formData.message
        ? [
            {
              type: "section" as const,
              text: {
                type: "plain_text" as const,
                text: `*Message*\n${formData.message}`,
              },
            },
          ]
        : []),
    ];

    return this.sendMessage({ blocks });
  }

  private async sendMessage(body: {
    blocks: unknown[];
  }): Promise<{ ok: boolean; status?: number }> {
    const res = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const resBody = await res.text();
      console.error(
        "[SlackBookDemoAPI.sendMessage] Webhook failed",
        res.status,
        resBody
      );
      return { ok: false, status: res.status };
    }

    return { ok: true };
  }
}

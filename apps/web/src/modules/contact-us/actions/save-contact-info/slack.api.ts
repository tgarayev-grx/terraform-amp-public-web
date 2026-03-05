import type { z } from "zod";
import type { ContactFormSchema } from "../../contactUsSchema";
import { getTranslations } from "next-intl/server";
import { CountryCode } from "../../config/countries";

type ContactFormPayload = Omit<z.infer<ContactFormSchema>, "honeypot">;

export class SlackContactFormAPI {
  private readonly webhookUrl: string;

  public constructor() {
    this.webhookUrl =
      process.env.SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL ?? "";

    if (!this.webhookUrl) {
      console.error(
        "[SlackContactFormAPI] SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL is not set"
      );
    }
  }

  public async sendContactFormSubmission(
    formData: ContactFormPayload
  ): Promise<{ ok: boolean; status?: number }> {
    if (!this.webhookUrl) {
      console.error(
        "[SlackContactFormAPI.sendContactFormSubmission] webhook URL is not set"
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
          text: "New Contact Us submission",
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
          { type: "plain_text", text: `*Company*\n${formData.companyName}` },
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
          ...(formData.organizationType
            ? [
                {
                  type: "plain_text" as const,
                  text: `*Organization type*\n${formData.organizationType}`,
                },
              ]
            : []),
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: `*Interested in*\n${formData.interestedIn.sort().join(", ")}`,
          },
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
        "[SlackContactFormAPI.sendMessage] Webhook failed",
        res.status,
        resBody
      );
      return { ok: false, status: res.status };
    }

    return { ok: true };
  }
}

import type { CareersFormValues } from "./careersSchema";

export class SlackCareersAPI {
  private readonly webhookUrl: string;

  public constructor() {
    this.webhookUrl =
      process.env.SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL ?? "";

    if (!this.webhookUrl) {
      console.error(
        "[SlackCareersAPI] SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL is not set"
      );
    }
  }

  public async sendApplicationNotification(input: {
    formValues: Pick<
      CareersFormValues,
      "name" | "email" | "phone" | "description"
    >;
    vacancyName: string;
    vacancyId?: number;
    cvFileName?: string;
  }): Promise<{ ok: boolean; status?: number }> {
    if (!this.webhookUrl) {
      console.error("[SlackCareersAPI] Webhook URL is not set");
      return { ok: false, status: 500 };
    }

    const { formValues, vacancyName, vacancyId, cvFileName } = input;

    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🎯 New application: ${vacancyName}`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "plain_text", text: `*Name*\n${formValues.name}` },
          { type: "plain_text", text: `*Email*\n${formValues.email}` },
          ...(formValues.phone
            ? [
                {
                  type: "plain_text" as const,
                  text: `*Phone*\n${formValues.phone}`,
                },
              ]
            : []),
          ...(vacancyId !== undefined
            ? [
                {
                  type: "plain_text" as const,
                  text: `*Vacancy ID*\n${vacancyId}`,
                },
              ]
            : []),
          ...(cvFileName
            ? [
                {
                  type: "plain_text" as const,
                  text: `*CV file*\n${cvFileName}`,
                },
              ]
            : []),
        ],
      },
      ...(formValues.description
        ? [
            {
              type: "section" as const,
              text: {
                type: "plain_text" as const,
                text: `*Cover letter*\n${formValues.description}`,
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
      const resBody = await res.text().catch(() => "");
      console.error(
        `[SlackCareersAPI] Webhook failed — status: ${res.status}`,
        resBody
      );
      return { ok: false, status: res.status };
    }

    return { ok: true };
  }
}

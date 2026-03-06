export class SlackWaitlistAPI {
  private readonly webhookUrl: string;

  public constructor() {
    this.webhookUrl =
      process.env.SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL ?? "";

    if (!this.webhookUrl) {
      console.error(
        "[SlackWaitlistAPI] SLACK_PUBLIC_WEB_NOTIFICATIONS_CHANNEL_WEBHOOK_URL is not set"
      );
    }
  }

  public async sendWaitlistSignup(input: {
    email: string;
    source?: string;
  }): Promise<{ ok: boolean; status?: number }> {
    if (!this.webhookUrl) {
      console.error(
        "[SlackWaitlistAPI.sendWaitlistSignup] webhook URL is not set"
      );
      return { ok: false, status: 500 };
    }

    const blocks: unknown[] = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New waitlist signup",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "plain_text", text: `*Email*\n${input.email}` },
          ...(input.source
            ? [
                {
                  type: "plain_text" as const,
                  text: `*Source*\n${input.source}`,
                },
              ]
            : []),
        ],
      },
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
        "[SlackWaitlistAPI.sendMessage] Webhook failed",
        res.status,
        resBody
      );
      return { ok: false, status: res.status };
    }

    return { ok: true };
  }
}

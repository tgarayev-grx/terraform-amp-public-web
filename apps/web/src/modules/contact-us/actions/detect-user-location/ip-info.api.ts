import z from "zod";

type IPInfoResponse = z.infer<typeof ipInfoResponseSchema>;

export class IPInfoAPI {
  private readonly token: string;

  public constructor() {
    this.token = process.env.IPINFO_TOKEN ?? "";
    if (!this.token) {
      console.error("[IPInfoAPI] IPINFO_TOKEN is not set");
    }
  }

  public async detectLocation(ip: string): Promise<IPInfoResponse | null> {
    if (!this.token) {
      console.error("[IPInfoAPI.detectLocation] IPINFO_TOKEN is not set");
      return null;
    }

    const url = new URL(`/lite/${ip}`, "https://api.ipinfo.io");
    url.searchParams.set("token", this.token);

    const res = await fetch(url.toString(), { next: { revalidate: 0 } });

    if (!res.ok) {
      console.error(
        "[IPInfoAPI.detectLocation] Failed to fetch IP info",
        res.status,
        res.statusText
      );
      return null;
    }

    const parsed = ipInfoResponseSchema.safeParse(await res.json());

    if (!parsed.success) {
      console.error(
        "[IPInfoAPI.detectLocation] Invalid IP info response",
        z.treeifyError(parsed.error)
      );
      return null;
    }

    return parsed.data;
  }
}

const ipInfoResponseSchema = z.object({
  ip: z.string(),
  asn: z.string(),
  as_name: z.string(),
  as_domain: z.string(),
  country_code: z.string(),
  country: z.string(),
  continent_code: z.string(),
  continent: z.string(),
});

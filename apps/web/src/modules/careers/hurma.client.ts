import type { HurmaVacancy, HurmaVacancyListResponse } from "./hurma.types";
import { HURMA_VACANCY_STATUS } from "./hurma.types";

function getHurmaBaseUrl(): string {
  const url = process.env.HURMA_API_URL ?? "https://hurma.work/api/v1";
  return url.replace(/\/$/, "");
}

function getHurmaToken(): string {
  const token = process.env.HURMA_API_TOKEN ?? "";
  if (!token) {
    console.error("[HurmaClient] HURMA_API_TOKEN env var is not set.");
  }
  return token;
}

export class HurmaClient {
  private readonly baseUrl: string;
  private readonly token: string;

  public constructor() {
    this.baseUrl = getHurmaBaseUrl();
    this.token = getHurmaToken();
  }

  private get headers(): HeadersInit {
    return {
      token: this.token,
      Accept: "application/json",
    };
  }

  private async fetchVacancyPage(
    page: number
  ): Promise<HurmaVacancyListResponse | null> {
    const url = `${this.baseUrl}/vacancy?page=${page}`;
    const res = await fetch(url, {
      headers: this.headers,
    });

    if (!res.ok) {
      console.error(
        `[HurmaClient] Failed to fetch vacancy list — status: ${res.status}, page: ${page}`
      );
      return null;
    }

    return (await res
      .json()
      .catch(() => null)) as HurmaVacancyListResponse | null;
  }

  public async getPublishedVacancies(): Promise<HurmaVacancy[]> {
    if (!this.token) return [];

    const firstPage = await this.fetchVacancyPage(1);
    if (!firstPage) return [];

    const { last_page } = firstPage.result;
    let allVacancies = [...firstPage.result.data];

    if (last_page > 1) {
      const remainingPages = Array.from(
        { length: last_page - 1 },
        (_, i) => i + 2
      );
      const results = await Promise.all(
        remainingPages.map((page) => this.fetchVacancyPage(page))
      );
      for (const result of results) {
        if (result) allVacancies = allVacancies.concat(result.result.data);
      }
    }

    // Deduplicate by id to guard against offset-pagination duplicates
    const seen = new Map<number, HurmaVacancy>();
    for (const v of allVacancies) {
      if (!seen.has(v.id)) seen.set(v.id, v);
    }

    return Array.from(seen.values()).filter(
      (v) => v.published && v.status === HURMA_VACANCY_STATUS.OPEN
    );
  }

  public async submitCandidate(payload: {
    name: string;
    email?: string;
    phone?: string;
    description?: string;
    hurma_vacancy_id?: number;
    cv?: File | Blob;
    cvFileName?: string;
  }): Promise<{ ok: boolean; status?: number; isDuplicate?: boolean }> {
    const form = new FormData();
    form.append("name", payload.name);
    if (payload.email) form.append("email", payload.email);
    if (payload.phone) form.append("phone", payload.phone);
    if (payload.description) form.append("description", payload.description);
    if (payload.hurma_vacancy_id !== undefined) {
      form.append("hurma_vacancy_id", String(payload.hurma_vacancy_id));
    }
    if (payload.cv) {
      form.append("cv", payload.cv, payload.cvFileName ?? "cv");
    }

    const res = await fetch(`${this.baseUrl}/candidate`, {
      method: "POST",
      headers: {
        token: this.token,
        Accept: "application/json",
      },
      body: form,
    });

    if (res.status === 409)
      return { ok: false, status: 409, isDuplicate: true };

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[HurmaClient] Candidate submission failed — status: ${res.status}`,
        body
      );
      return { ok: false, status: res.status };
    }

    return { ok: true };
  }
}

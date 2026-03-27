export interface HurmaWorkType {
  type: number;
  name: string;
}
export interface HurmaSalary {
  from: number;
  to: number;
  currency: string;
}

export interface HurmaResponsible {
  id: number;
  name: string;
}

export interface HurmaVacancy {
  id: number;
  name: string;
  description: string | null;
  demand: string | null;
  addition: string | null;
  responsibility: string | null;
  working_conditions: string | null;
  number_of_positions: number;
  residence: string | null;
  department?: string | null;
  hot_flag: boolean;
  published: boolean;
  status: number;
  work_types: HurmaWorkType[];
  salary: HurmaSalary | null;
  responsible: HurmaResponsible[];
  created_at: string;
  close_date: string | null;
}

export interface HurmaVacancyListResponse {
  result: {
    data: HurmaVacancy[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page_url: string | null;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: number;
    path: string | null;
  };
  error: boolean;
  code: number;
  messages: string[];
}

export interface HurmaCandidatePayload {
  name: string;
  email?: string;
  phone?: string;
  description?: string;
  hurma_vacancy_id?: number;
  cv?: File | Blob;
}

export const HURMA_VACANCY_STATUS = {
  OPEN: 1,
  PAUSE: 2,
  CLOSE: 3,
  IN_PROGRESS: 4,
  CANCELED: 5,
} as const;

export type HurmaVacancyStatus =
  (typeof HURMA_VACANCY_STATUS)[keyof typeof HURMA_VACANCY_STATUS];

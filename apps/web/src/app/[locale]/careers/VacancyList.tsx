"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import type { HurmaVacancy } from "@/modules/careers/hurma.types";
import { SingleSelect, Button } from "@grx/ui";
import { SubmitCVModal } from "./SubmitCVModal";
import emptyStateIllustration from "@/app/[locale]/careers/(assets)/empty-state-illustration.webp";

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.73342 2.20713C10.0656 1.92033 10.555 1.93136 10.873 2.24023C11.3123 2.66675 11.7053 3.13739 12.0839 3.61539C12.5662 4.22209 13.1449 5.02365 13.7022 5.97598C13.8879 5.72595 14.0594 5.50533 14.2094 5.31781C14.2487 5.27001 14.288 5.21853 14.3273 5.16705C14.6095 4.80672 14.9596 4.35446 15.4275 4.35446C15.9062 4.35446 16.242 4.79201 16.5278 5.16705C16.5742 5.22956 16.6207 5.28839 16.6671 5.34355C17.0351 5.79949 17.5244 6.45765 18.0138 7.27025C18.9855 8.88442 20 11.1825 20 13.7637C20 18.312 16.4171 22 11.9982 22C7.57937 22 4 18.3157 4 13.7674C4 10.4177 5.46818 7.51661 6.87564 5.4943C7.58651 4.47579 8.29382 3.65952 8.82608 3.10063C9.119 2.79176 9.41549 2.48658 9.73699 2.21081L9.73342 2.20713ZM12.0625 18.4738C12.9663 18.4738 13.7665 18.2164 14.5202 17.7017C16.0241 16.6207 16.4278 14.4586 15.524 12.7599C15.3632 12.429 14.9524 12.4069 14.7202 12.6864L13.82 13.7637C13.5843 14.0431 13.1592 14.0358 12.9377 13.7453C12.3197 12.9327 11.1837 11.4509 10.605 10.6935C10.4121 10.4398 10.0621 10.3993 9.83702 10.6236C9.1833 11.2781 7.99732 12.7121 7.99732 14.4586C7.99732 16.981 9.80487 18.4738 12.0589 18.4738H12.0625Z"
        fill="#F5A70F"
      />
    </svg>
  );
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: FilterSelectProps) {
  return (
    <div className="min-w-0 flex-1">
      <SingleSelect.Root value={value} onValueChange={onChange}>
        <SingleSelect.Trigger placeholder={placeholder} />
        <SingleSelect.Content>
          {options.map((opt) => (
            <SingleSelect.Item key={opt} value={opt}>
              {opt}
            </SingleSelect.Item>
          ))}
        </SingleSelect.Content>
      </SingleSelect.Root>
    </div>
  );
}

function JobCard({ vacancy }: { vacancy: HurmaVacancy }) {
  const isHot = vacancy.hot_flag;

  const metaItems: string[] = [];
  if (vacancy.department?.trim()) metaItems.push(vacancy.department.trim());
  if (vacancy.residence?.trim()) metaItems.push(vacancy.residence.trim());
  vacancy.work_types?.forEach((wt) => {
    if (wt.name) metaItems.push(wt.name);
  });

  return (
    <Link
      href={`/careers/${vacancy.id}`}
      className="group flex items-center gap-2 rounded-2xl border border-[#525252] bg-[#171717] px-6 py-6 transition-colors hover:border-[#a0a0a0] hover:bg-[#2e2e2e]"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-white">
            {vacancy.name}
          </span>
          {isHot && (
            <span className="shrink-0 rounded-[6px] bg-[#404040] px-[6px] py-[2px] text-[12px] font-medium leading-[16px] text-white">
              HOT
            </span>
          )}
        </div>

        {metaItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {metaItems.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="size-[4px] shrink-0 rounded-full bg-[#525252]"
                  />
                )}
                <span className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[#a1a1a1]">
                  {item}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-[#2e2e2e] group-hover:bg-[#404040]">
        <ArrowRightIcon />
      </div>
    </Link>
  );
}

function CardGroup({
  title,
  isHot,
  vacancies,
}: {
  title: string;
  isHot?: boolean;
  vacancies: HurmaVacancy[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <div className="flex items-center gap-2 pb-4">
          <h2 className="text-[20px] font-bold leading-[24px] text-white">
            {title}
          </h2>
          {isHot && <FireIcon />}
        </div>
      )}
      {vacancies.map((vacancy) => (
        <JobCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  );
}

function FilteredEmptyState({
  onReset,
  onSubmitCV,
}: {
  onReset: () => void;
  onSubmitCV: () => void;
}) {
  const t = useTranslations("CareersPage");

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-10 text-center">
      <Image
        src={emptyStateIllustration}
        alt=""
        width={320}
        height={160}
        className="mx-auto"
      />

      <div className="flex w-full flex-col gap-2">
        <p className="text-[18px] font-semibold leading-[22px] text-white">
          {t("openPositions.noRolesTitle")}
        </p>
        <p className="text-[14px] font-normal leading-[20px] text-[#a1a1a1]">
          {t("openPositions.noRolesDescription")}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-[10px] border border-white px-4 py-[10px] text-[14px] font-semibold leading-[20px] text-white transition-opacity hover:opacity-80"
        >
          {t("openPositions.seeAllOpportunities")}
        </button>
        <button
          type="button"
          onClick={onSubmitCV}
          className="flex-1 rounded-[10px] border border-white px-4 py-[10px] text-[14px] font-semibold leading-[20px] text-white transition-opacity hover:opacity-80"
        >
          {t("openPositions.submitCV")}
        </button>
      </div>
    </div>
  );
}

function NoPositionsState({ onSubmitCV }: { onSubmitCV: () => void }) {
  const t = useTranslations("CareersPage");

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <p className="text-[20px] font-medium leading-[26px] text-[#a0a0a0]">
        {t("openPositions.noPositions")}
      </p>
      <button
        type="button"
        onClick={onSubmitCV}
        className="inline-flex items-center rounded-[10px] bg-white px-4 py-[10px] text-[14px] font-semibold leading-[20px] text-[#0a0a0a] transition-opacity hover:opacity-90"
      >
        {t("openPositions.submitCV")}
      </button>
    </div>
  );
}

interface VacancyListProps {
  vacancies: HurmaVacancy[];
}

export function VacancyList({ vacancies }: VacancyListProps) {
  const t = useTranslations("CareersPage");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locations = useMemo(() => {
    const set = new Set<string>();
    vacancies.forEach((v) => {
      if (v.residence?.trim()) set.add(v.residence.trim());
    });
    return Array.from(set).sort();
  }, [vacancies]);

  const employmentTypes = useMemo(() => {
    const set = new Set<string>();
    vacancies.forEach((v) =>
      v.work_types?.forEach((wt) => {
        if (wt.name) set.add(wt.name);
      })
    );
    return Array.from(set).sort();
  }, [vacancies]);

  const filtered = useMemo(() => {
    return vacancies.filter((v) => {
      if (locationFilter && v.residence?.trim() !== locationFilter)
        return false;
      if (typeFilter && !v.work_types?.some((wt) => wt.name === typeFilter))
        return false;
      return true;
    });
  }, [vacancies, locationFilter, typeFilter]);

  const hotVacancies = filtered.filter((v) => v.hot_flag);
  const regularVacancies = filtered.filter((v) => !v.hot_flag);

  const groupedByDepartment = useMemo(() => {
    const map = new Map<string, HurmaVacancy[]>();
    regularVacancies.forEach((v) => {
      const dept = v.department?.trim() ?? "";
      if (!map.has(dept)) map.set(dept, []);
      map.get(dept)!.push(v);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [regularVacancies]);

  const hasFilters = Boolean(locationFilter || typeFilter);

  function resetFilters() {
    setLocationFilter("");
    setTypeFilter("");
  }

  return (
    <>
      <SubmitCVModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="w-full bg-[#171717]">
        <div className="mx-auto flex max-w-[780px] flex-col gap-10 px-4 py-14 md:gap-14 md:py-20 lg:py-24">
          {/* Header */}
          <div className="flex flex-col gap-10">
            {/* Top row: title + submit CV button */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-bounded text-center text-[28px] font-bold leading-[32px] text-white sm:text-left sm:text-[32px] sm:leading-[36px] md:text-[36px] md:leading-[40px]">
                {t("openPositions.title")}
              </h1>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                {t("positions.submitCV")}
              </Button>
            </div>

            {/* Actions: filters + results count */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                <FilterSelect
                  value={locationFilter}
                  onChange={setLocationFilter}
                  placeholder={t("positions.filters.location")}
                  options={locations}
                />
                <FilterSelect
                  value={typeFilter}
                  onChange={setTypeFilter}
                  placeholder={t("positions.filters.employmentType")}
                  options={employmentTypes}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[14px] leading-[20px] text-[#525252]">
                  {t("positions.resultsFound", {
                    count: String(filtered.length),
                  })}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="shrink-0 rounded-[6px] px-2 py-1 text-[12px] font-semibold leading-[16px] text-white transition-opacity hover:opacity-70"
                  >
                    {t("positions.resetFilters")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Card list or empty state */}
          {filtered.length === 0 ? (
            hasFilters ? (
              <FilteredEmptyState
                onReset={resetFilters}
                onSubmitCV={() => setIsModalOpen(true)}
              />
            ) : (
              <NoPositionsState onSubmitCV={() => setIsModalOpen(true)} />
            )
          ) : (
            <div className="flex flex-col gap-14">
              {hotVacancies.length > 0 && (
                <CardGroup title="HOT" isHot vacancies={hotVacancies} />
              )}
              {groupedByDepartment.map(([dept, deptVacancies]) => (
                <CardGroup
                  key={dept || "_ungrouped"}
                  title={dept}
                  vacancies={deptVacancies}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

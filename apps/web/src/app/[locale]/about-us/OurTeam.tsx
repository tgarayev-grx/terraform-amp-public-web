import { getTranslations } from "next-intl/server";

import { memo } from "react";

import Image, { StaticImageData } from "next/image";

import johnDoeImg from "./(assets)/team/placeholder.png";
import clsx from "clsx";

export async function OurTeamSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded font-bold text-[28px] lg:text-4xl leading-[32px]">
            {t("AboutUsPage.ourTeam.title")}
          </h3>
          <h4 className="font-medium text-neutral-700 lg:text-[20px] text-base lg:leading-[26px]">
            {t("AboutUsPage.ourTeam.subtitle")}
          </h4>
        </div>

        <div className="justify-center items-center gap-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <OurTeamCard
            name="Kai Renning"
            role={t("AboutUsPage.ourTeam.roles.founder")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Ramona Ciocea"
            role={t("AboutUsPage.ourTeam.roles.managingPartner")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Joseph Little"
            role={t("AboutUsPage.ourTeam.roles.managingPartner")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Olga Dovgopolyi"
            role={t("AboutUsPage.ourTeam.roles.coo")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Amir Babovic"
            role={t("AboutUsPage.ourTeam.roles.cmo")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Arvid Paeglit"
            role={t("AboutUsPage.ourTeam.roles.cto")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Sergej Skaro"
            role={t("AboutUsPage.ourTeam.roles.securityAdvisor")}
            img={johnDoeImg}
          />

          <OurTeamCard
            name="Maksym Liashko"
            role={t("AboutUsPage.ourTeam.roles.boardAdvisor")}
            img={johnDoeImg}
          />

          <div className="flex sm:justify-center xl:justify-start sm:items-center xl:items-start sm:col-span-2 xl:col-span-1">
            <OurTeamCard
              className="xl:flex-grow"
              name="John Doe"
              role={t("AboutUsPage.ourTeam.roles.boardAdvisor")}
              img={johnDoeImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type OurTeamCardProps = {
  className?: string;
  name: string;
  role: string;
  img: StaticImageData;
};

const OurTeamCard = memo(({ className, name, role, img }: OurTeamCardProps) => {
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <Image
        className="bg-neutral-100 rounded-2xl w-full sm:h-[280px] object-cover"
        src={img}
        alt={name}
      />

      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-[20px] leading-[24px] tracking-[-0.08px]">
          {name}
        </h4>

        <h5 className="text-[16px] text-neutral-500 leading-[20px]">{role}</h5>
      </div>
    </div>
  );
});

OurTeamCard.displayName = "OurTeamCard";

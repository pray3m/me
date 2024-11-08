import React, { FC } from "react";

const Introduction: FC = () => {
  const currentYear = new Date().getFullYear();
  const workStart = 2023; // TODO : update this
  const codingStart = 2022;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl lg:text-3xl font-semibold">
        Hey, I&apos;m Prem 👋
      </h2>
      <>
        <ul className="flex flex-col lg:flex-row gap-1 lg:gap-8 ml-5 list-disc text-neutral-700 dark:text-neutral-400">
          <li>life-long learner</li>
          <li>
            Based in Butwal , Nepal <span className="ml-1">🇳🇵</span>
          </li>
        </ul>
      </>
      <p className="leading-loose">
        a dedicated full-stack developer with {currentYear - workStart} years of
        professional experience and {currentYear - codingStart} years in web
        development since {codingStart}. I excel in building dynamic and
        responsive user interfaces using React.js and Next.js, and crafting
        robust backend systems with Node.js, NestJS, MongoDB , MysQL via Prisma
        ORM. Additionally, I am enhancing my DevOps expertise to ensure
        efficient deployment and scalable, reliable applications. I&apos;m
        committed to continuous learning and evolving as a well-rounded
        developer.
      </p>
    </div>
  );
};

export default Introduction;

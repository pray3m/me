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
        I&apos;m a full-stack developer with {currentYear - workStart} year
        experience and {currentYear - codingStart} year in web development. I
        specialize in building responsive interfaces with React.js and Next.js,
        and developing robust backends using Node.js, NestJS, MongoDB, and MySQL
        via Prisma ORM. Currently expanding my DevOps skills to create scalable
        and reliable applications. Committed to continuous learning and growth.
      </p>
    </div>
  );
};

export default Introduction;

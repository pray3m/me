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
        a passionate web developer with {currentYear - workStart} years of
        professional experience and a total of {currentYear - codingStart} years
        in web development since {codingStart} .Proficient in React.js, Next.js,
        and Tailwind CSS, I create interactive and responsive UIs. I also have
        experience with Node.js and MongoDB using Prisma. I&apos;m eager to
        deepen my backend knowledge and become a well-rounded full-stack
        developer.
      </p>
    </div>
  );
};

export default Introduction;

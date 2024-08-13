import React, { FC } from "react";

const Introduction: FC = () => {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl lg:text-3xl font-semibold">
        Hey, I&apos;m Prem 👋
      </h2>
      <>
        <ul className="flex flex-col lg:flex-row gap-1 lg:gap-8 ml-5 list-disc text-neutral-700 dark:text-neutral-400">
          <li>life-long learner</li>
          <li>
            Butwal , Nepal <span className="ml-1">🇳🇵</span>
          </li>
        </ul>
      </>
      <p className="leading-relaxed font-medium">
        a passionate web developer with 3 years of experience focusing on
        frontend technologies. Proficient in React.js, Next.js, and Tailwind
        CSS, I create interactive and responsive UIs. I also have experience
        with Node.js and MongoDB using Prisma. I&apos;m eager to deepen my
        backend knowledge and become a well-rounded full-stack developer.
      </p>
    </div>
  );
};

export default Introduction;

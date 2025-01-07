import Image from "@/common/components/elements/Image";
import { FC } from "react";
import ProjectLink from "./ProjectLink";

const ProjectDetail: FC<Project> = ({
  title,
  description,
  image,
  slug,
  stacks,
  link_demo,
  link_github,
  updated_at,
}) => {
  const stacksArray = stacks;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-base">Tech Stack: </span>

          {stacksArray?.map((stack: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
            >
              {stack}
            </span>
          ))}
        </div>
        <ProjectLink link_demo={link_demo} link_github={link_github} />
      </div>
      <Image
        src={image}
        width={800}
        height={400}
        alt={title}
        className="hover:scale-105"
      />
      <p>{title}</p>
    </div>
  );
};

export default ProjectDetail;

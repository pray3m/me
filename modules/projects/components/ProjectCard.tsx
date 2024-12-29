import React, { FC } from "react";
import Link from "next/link";
import Card from "@/common/components/elements/Card";
import Image from "@/common/components/elements/Image";

const ProjectCard: FC<Project> = ({
  title,
  slug,
  description,
  image,
  link_demo,
  link_github,
  stacks,
}) => {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="cursor-pointer border border-neutral-200 dark:border-neutral-800 lg:hover:scale-[102%]">
        <Image
          src={image}
          width={400}
          height={200}
          alt={title}
          className="h-48 rounded-t-xl object-cover"
        />
        <div className="space-y-2 p-5">
          <div className="flex justify-between">
            <div className="cursor-pointer text-lg font-medium text-neutral-700 dark:text-neutral-300 hover:dark:text-neutral-50">
              {title}
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-400">
            {description}
          </p>
          <div className="flex gap-2 pt-2">
            {stacks?.map((stack, index) => (
              <span
                key={index}
                className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};
export default ProjectCard;

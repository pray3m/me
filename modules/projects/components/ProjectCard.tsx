import React, { FC } from "react";
import Link from "next/link";
import Card from "@/common/components/elements/Card";
import Image from "@/common/components/elements/Image";
import { ProjectItemProps } from "@/common/utils/types";

const ProjectCard: FC<ProjectItemProps> = ({
  title,
  slug,
  description,
  image,
  links,
  stacks,
}) => {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="border border-neutral-200 dark:border-neutral-800 lg:hover:scale-[102%] cursor-pointer">
        <Image
          src={image}
          width={400}
          height={200}
          alt={title}
          className="rounded-t-xl h-48 object-cover"
        />
        <div className="p-5 space-y-2">
          <div className="flex justify-between">
            <div className="text-lg font-medium cursor-pointer text-neutral-700 dark:text-neutral-300 hover:dark:text-neutral-50">
              {title}
            </div>
          </div>
          <p className="text-neutral-700 dark:text-neutral-400 text-[15px] leading-relaxed">
            {description}
          </p>
          <div className="flex gap-2 pt-2">
            {stacks?.map((stack, index) => (
              <span
                key={index}
                className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full px-3 py-1 text-xs font-medium"
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

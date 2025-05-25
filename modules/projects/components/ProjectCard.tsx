import Card from "@/common/components/elements/Card"
import Image from "@/common/components/elements/Image"
import Link from "next/link"
import { FC } from "react"

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
        <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div className="space-y-2 p-5">
          <div className="flex justify-between">
            <div className="cursor-pointer text-lg font-medium text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-50">
              {title}
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-400">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
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
  )
}
export default ProjectCard

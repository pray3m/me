import Link from "next/link"
import { FC } from "react"
import Card from "@/components/ds/card"
import Image from "@/components/ds/image"

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
      <Card className="cursor-pointer border border-neutral-200 lg:hover:scale-[102%] dark:border-neutral-800">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
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
            <div className="cursor-pointer font-medium text-lg text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-50">
              {title}
            </div>
          </div>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {stacks?.map((stack, index) => (
              <span
                key={index}
                className="rounded-full bg-neutral-200 px-3 py-1 font-medium text-neutral-600 text-xs dark:bg-neutral-700 dark:text-neutral-400"
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

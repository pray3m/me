import Link from "next/link"
import { FC } from "react"
import Card from "@/components/ds/card"
import Image from "@/components/ds/image"

const ProjectCard: FC<Project> = ({
  title,
  slug,
  description,
  image,
  stacks,
}) => {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="cursor-pointer border border-border lg:hover:scale-[102%]">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={false}
            quality={75}
          />
        </div>
        <div className="space-y-2 p-5">
          <div className="flex justify-between">
            <div className="cursor-pointer font-medium text-lg text-muted-foreground">
              {title}
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {stacks?.map((stack, index) => (
              <span
                key={index}
                className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs"
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

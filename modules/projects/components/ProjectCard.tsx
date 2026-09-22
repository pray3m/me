import Link from "next/link"
import type { FC } from "react"
import { getStackIcon } from "@/common/constant/stack-icons"
import Card from "@/components/ds/card"
import Image from "@/components/ds/image"
import { cn } from "@/lib/utils"

type Props = Project & {
  stackVariant?: "labels" | "icons"
}

function StackLabel({ stack }: { stack: string }) {
  return (
    <span className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs">
      {stack}
    </span>
  )
}

function StackIconBadge({ stack }: { stack: string }) {
  const entry = getStackIcon(stack)

  if (!entry) return <StackLabel stack={stack} />

  const Icon = entry.icon
  return (
    <span
      title={stack}
      className="inline-flex size-7 items-center justify-center rounded-full bg-muted"
    >
      <Icon aria-hidden="true" className={cn("size-5", entry.className)} />
      <span className="sr-only">{stack}</span>
    </span>
  )
}

const ProjectCard: FC<Props> = ({
  title,
  slug,
  description,
  image,
  stacks,
  stackVariant = "labels",
}) => {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="cursor-pointer border border-border lg:hover:scale-[102%]">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 50vw"
            quality={75}
          />
        </div>
        <div className="space-y-2 p-5">
          <div className="flex justify-between">
            <h3 className="font-medium text-foreground text-lg">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {stacks?.map((stack) =>
              stackVariant === "icons" ? (
                <StackIconBadge key={stack} stack={stack} />
              ) : (
                <StackLabel key={stack} stack={stack} />
              )
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
export default ProjectCard

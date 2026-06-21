"use client"

import { Clock, Eye } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"
import type { BlogItemProps } from "@/common/lib/types"
import Card from "@/components/ds/card"
import Image from "@/components/ds/image"
import useWindowSize from "@/hooks/use-window-size"
import { formatShortDate } from "@/lib/date"

const BlogCard: FC<BlogItemProps> = ({
  title,
  image,
  views,
  date,
  content,
  slug,
}) => {
  const width = useWindowSize()
  const isMobile = width < 468
  const trimmedContent =
    content.slice(0, 100) + (content.length > 100 ? "..." : "")

  return (
    <Link href={`blog/${slug}`}>
      <Card className="flex cursor-pointer flex-col gap-6 border border-border sm:flex-row sm:p-5 lg:hover:scale-[102%]">
        <div className="w-fit">
          <Image
            src={image}
            width={isMobile ? 400 : 160}
            height={200}
            alt={title}
            className="rounded-t-xl sm:rounded-xl"
          />
        </div>
        <div className="mb-5 flex w-full grow flex-col space-y-2 px-5 sm:mb-0 sm:w-4/5 sm:p-0">
          <h3 className="font-medium text-muted-foreground md:text-lg lg:hover:text-brand">
            {title}
          </h3>
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-xs">{formatShortDate(date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span className="text-xs">{views}</span>
              <span className="text-xs">views</span>
            </div>
          </div>
          <p className="hidden text-muted-foreground text-sm leading-relaxed sm:block">
            {trimmedContent}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default BlogCard

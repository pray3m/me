"use client"

import moment from "moment"
import Link from "next/link"
import type { FC } from "react"
import Icon from "supercons"
import Card from "@/common/components/elements/Card"
import Image from "@/common/components/elements/Image"
import useWindowSize from "@/common/hooks/use-window-size"
import type { BlogItemProps } from "@/common/lib/types"

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
      <Card className="flex cursor-pointer flex-col gap-6 border border-neutral-300 dark:border-neutral-800 sm:flex-row sm:p-5 lg:hover:scale-[102%]">
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
          <h3 className="font-medium text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-50 md:text-[17px] lg:hover:text-sky-800">
            {title}
          </h3>
          <div className="flex gap-5">
            <div className="flex items-center gap-1 dark:text-neutral-400">
              <Icon glyph="clock" size={16} />
              <span className="text-xs">
                {moment(date).format("DD MMM YYYY")}
              </span>
            </div>
            <div className="flex items-center gap-1 dark:text-neutral-400">
              <Icon glyph="view" size={16} />
              <span className="text-xs">{views}</span>
              <span className="text-xs">views</span>
            </div>
          </div>
          <p className="hidden text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:block">
            {trimmedContent}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default BlogCard

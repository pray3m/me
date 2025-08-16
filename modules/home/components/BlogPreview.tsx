import Link from "next/link"
import type { FC } from "react"
import Icon from "supercons"
import SectionHeading from "@/common/components/elements/SectionHeading"
import SectionSubHeading from "@/common/components/elements/SectionSubHeading"
import BlogList from "@/modules/blog/components/BlogList"

const BlogPreview: FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Latest Articles"
          icon={<Icon glyph="rss" size={32} />}
        />
        <SectionSubHeading>
          <Link href="/blog">
            <div className="mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
              <div className="flex">
                View All <span className="ml-1 hidden sm:block"> Articles</span>
              </div>
              <Icon glyph="enter" size={22} />
            </div>
          </Link>
        </SectionSubHeading>
      </div>
      <BlogList />
    </section>
  )
}

export default BlogPreview

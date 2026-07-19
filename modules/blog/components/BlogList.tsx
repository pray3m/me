import { type FC } from "react"
import type { BlogItemProps } from "@/common/lib/types"
import BlogCard from "./BlogCard"

// No posts published yet. Add real entries here once a `blog/[slug]` route
// exists — the placeholder lorem-ipsum posts were removed.
const BLOG_DATA: BlogItemProps[] = []

const BlogList: FC = () => {
  if (BLOG_DATA.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-300 border-dashed py-16 text-center text-muted-foreground dark:border-neutral-800">
        <p className="font-medium">No posts yet — writing soon.</p>
        <p className="mt-1 text-sm">
          In the meantime, my work lives on{" "}
          <a
            href="https://github.com/pray3m"
            target="_blank"
            rel="noopener"
            className="underline hover:text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-4">
      {BLOG_DATA.map((item: BlogItemProps, index: number) => (
        <BlogCard key={index} {...item} />
      ))}
    </div>
  )
}

export default BlogList

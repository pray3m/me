import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import BlogList from "@/modules/blog/components/BlogList"

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Writing by Prem Gautam on web development, code, creativity, and continuous learning.",
  path: "/blog",
  noIndex: true,
})

const BlogPage: NextPage = () => {
  return (
    <Container>
      <Reveal>
        <PageHeading
          title="Blog"
          subtitle="Exploring the world of code, creativity, and constant learning."
        />
        <BlogList />
      </Reveal>
    </Container>
  )
}

export default BlogPage

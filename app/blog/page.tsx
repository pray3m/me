import type { Metadata, NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import BlogList from "@/modules/blog/components/BlogList"

export const metadata: Metadata = {
  title: "Blog - Prem Gautam",
}

const BlogPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Blog"
        subtitle="Exploring the world of code, creativity, and constant learning."
      />
      <BlogList />
    </Container>
  )
}

export default BlogPage

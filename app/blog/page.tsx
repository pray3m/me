import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import BlogList from "@/modules/blog/components/BlogList";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog - Prem Gautam",
};

const BlogPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Blog"
        subtitle="Exploring the world of code, creativity, and constant learning."
      />
      <BlogList />
    </Container>
  );
};

export default BlogPage;

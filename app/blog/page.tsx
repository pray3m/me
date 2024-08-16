import Container from "@/common/components/elements/Container";
import BlogList from "@/modules/blog/components/BlogList";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog - Prem Gautam",
};

const BlogPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <BlogList />
    </Container>
  );
};

export default BlogPage;

import Container from "@/common/components/elements/Container";
import BlogList from "@/modules/blog/components/BlogList";
import { NextPage } from "next";
import React from "react";

const BlogPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <BlogList />
    </Container>
  );
};

export default BlogPage;

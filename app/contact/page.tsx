import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Contact from "@/modules/contact/components/Contact";
import { NextPage } from "next";
import React from "react";

const ContactPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title="Contact" subtitle="Let's get in touch" />
      <Contact />
    </Container>
  );
};

export default ContactPage;

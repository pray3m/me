import Container from "@/common/components/elements/Container"
import PageHeading from "@/common/components/elements/PageHeading"
import Contact from "@/modules/contact/components/Contact"
import type { Metadata, NextPage } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Contact - Prem Gautam",
}

const ContactPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Contact"
        subtitle="Feel free to get in touch and let's have a discussion about how we can work together."
      />
      <Contact />
    </Container>
  )
}

export default ContactPage

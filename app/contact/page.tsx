import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import Contact from "@/modules/contact/components/Contact"

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Prem Gautam. Let's talk about building web and mobile products, freelance work, or collaborating on something new.",
  path: "/contact",
})

const ContactPage: NextPage = () => {
  return (
    <Container>
      <Reveal>
        <PageHeading
          title="Contact"
          subtitle="Feel free to get in touch and let's have a discussion about how we can work together."
        />
        <Contact />
      </Reveal>
    </Container>
  )
}

export default ContactPage

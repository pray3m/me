import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
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
      <PageHeading
        title="Contact"
        subtitle="Got a product to build, or a role to fill? Let's talk."
      />
      <Contact />
    </Container>
  )
}

export default ContactPage

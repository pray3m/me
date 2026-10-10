import { type FC, type ReactNode } from "react"
import { FaWhatsapp as WhatsappIcon } from "react-icons/fa6"
import { HiOutlineMail as EmailIcon } from "react-icons/hi"
import Button from "@/components/ds/button"
import { siteConfig } from "@/lib/seo"

const EMAIL = siteConfig.email

interface ContactLink {
  title: string
  icon: ReactNode
  link: string
  external?: boolean
}

const CONTACTS: ContactLink[] = [
  {
    title: EMAIL,
    icon: <EmailIcon size={18} />,
    link: `mailto:${EMAIL}`,
  },
  {
    title: siteConfig.whatsapp.handle,
    icon: <WhatsappIcon size={18} />,
    link: siteConfig.whatsapp.url,
    external: true,
  },
]

const Contact: FC = () => {
  return (
    <section className="space-y-5">
      <p className="leading-loose">
        The fastest way to reach me is email — I usually reply{" "}
        <strong className="font-medium text-foreground">within 24 hours</strong>
        . Currently open to freelance projects and full-time roles.
      </p>
      <p className="text-muted-foreground leading-loose">
        Building something? Tell me what it is, roughly when you need it, and
        where you&apos;re starting from. That&apos;s enough for me to say
        whether I&apos;m the right fit.
      </p>
      <div className="flex flex-wrap gap-3">
        {CONTACTS.map((contact) => (
          <Button
            key={contact.link}
            icon={contact.icon}
            nativeButton={false}
            render={
              <a
                href={contact.link}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener" }
                  : {})}
              />
            }
          >
            {contact.title}
          </Button>
        ))}
      </div>
    </section>
  )
}

export default Contact

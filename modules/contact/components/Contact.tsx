import { type FC, type ReactNode } from "react"
import { FaTelegramPlane as TelegramIcon } from "react-icons/fa"
import { HiOutlineMail as EmailIcon } from "react-icons/hi"
import Button from "@/components/ds/button"

const EMAIL = "prem.gtm9@gmail.com"

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
    title: "@onlyprems",
    icon: <TelegramIcon size={18} />,
    link: "https://t.me/onlyprems",
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

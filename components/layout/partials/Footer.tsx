import Link from "next/link"
import { type FC } from "react"
import { FaWhatsapp as WhatsappIcon } from "react-icons/fa6"
import { HiOutlineMail as EmailIcon } from "react-icons/hi"
import { SOCIAL_MEDIA } from "@/common/constant/menu"
import { siteConfig } from "@/lib/seo"

const linkStyles =
  "inline-flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"

/**
 * Closes every page. It carries the contact details and socials the sidebar
 * shows on desktop — below `lg` those live only inside the menu drawer, so
 * without this the bottom of a scrolled page is a dead end on phones.
 */
const Footer: FC = () => {
  const socials = SOCIAL_MEDIA.filter((item) => item.isShow)

  return (
    <footer className="mb-10 border-border border-t px-5 pt-8 pb-2 text-sm lg:mb-0 lg:px-8 lg:pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="font-medium text-foreground">
            Let&apos;s work together
          </p>

          <div className="flex flex-col gap-2 text-muted-foreground">
            <a href={`mailto:${siteConfig.email}`} className={linkStyles}>
              <EmailIcon aria-hidden="true" size={16} />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener"
              className={linkStyles}
            >
              <WhatsappIcon aria-hidden="true" size={16} />
              {siteConfig.whatsapp.handle}
            </a>
          </div>
        </div>

        <nav aria-label="Social media" className="-mx-2 flex items-center">
          {socials.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener"
              aria-label={item.title}
              title={item.title}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.icon}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-border border-t pt-5 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={siteConfig.repository}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
          <span aria-hidden="true">·</span>
          <span>Next.js on Vercel</span>
          <span aria-hidden="true">·</span>
          {/* A plain-text profile for agents — see app/llms.txt/route.ts. */}
          <Link
            href="/llms.txt"
            className="font-mono transition-colors hover:text-foreground"
          >
            llms.txt
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

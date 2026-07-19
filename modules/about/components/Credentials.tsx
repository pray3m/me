import Link from "next/link"
import type { FC } from "react"
import { HiOutlineAcademicCap as CredentialIcon } from "react-icons/hi"
import { LuArrowUpRight } from "react-icons/lu"
import { CREDENTIALS } from "@/common/constant/credentials"
import Card from "@/components/ds/card"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"

const Credentials: FC = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading
          title="Credentials"
          icon={<CredentialIcon className="mr-1" />}
        />
        <SectionSubHeading>
          <p className="text-muted-foreground">
            Certifications, hackathons & things I&apos;ve shipped
          </p>
        </SectionSubHeading>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {CREDENTIALS.map((credential, index) => (
          <Link
            href={credential.link || "#"}
            key={index}
            target="_blank"
            rel="noopener"
            className="group"
          >
            <Card className="h-full space-y-2 border border-border px-6 py-4 transition-all duration-300 lg:hover:scale-[102%]">
              <div className="flex items-start justify-between gap-2">
                <h6 className="font-medium">{credential.title}</h6>
                <LuArrowUpRight className="shrink-0 text-muted-foreground transition-all group-hover:text-foreground" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>{credential.issuer}</span>
                <span className="text-muted-foreground">•</span>
                <span>{credential.year}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {credential.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Credentials

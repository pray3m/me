import Image from "next/image"
import type { FC } from "react"
import { EXPERIENCES } from "@/common/constant/careers"
import type { ExperienceProps } from "@/common/lib/types"
import IconTile from "@/components/ds/icon-tile"
import ExperiencePositionItem from "./ExperiencePositionItem"

type CompanyProps = ExperienceProps & {
  /** Expand the newest role of the newest employer, nothing else. */
  openFirstPosition?: boolean
}

const ExperienceCompany: FC<CompanyProps> = ({
  company,
  logo,
  link,
  is_current,
  positions,
  openFirstPosition = false,
}) => {
  const name = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener"
      className="outline-none transition-colors hover:text-brand focus-visible:underline"
    >
      {company}
    </a>
  ) : (
    company
  )

  return (
    // space-y-5 pairs with the position items' `-top-5` hairline, so the line
    // reaches the company tile exactly.
    <li className="space-y-5">
      <div className="flex items-center gap-3">
        <IconTile className="rounded-full">
          {logo ? (
            <Image src={logo} width={28} height={28} alt="" />
          ) : (
            company.charAt(0)
          )}
        </IconTile>

        <h3 className="font-semibold text-foreground text-lg leading-snug">
          {name}
        </h3>

        {is_current && (
          <span
            aria-label="Current employer"
            className="relative flex size-2"
            role="img"
            title="Current employer"
          >
            <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      <ol>
        {positions.map((position, index) => (
          <ExperiencePositionItem
            key={position.position}
            {...position}
            defaultOpen={openFirstPosition && index === 0}
          />
        ))}
      </ol>
    </li>
  )
}

const ExperienceTimeline: FC = () => {
  return (
    <ol className="space-y-8">
      {EXPERIENCES.map((experience, index) => (
        <ExperienceCompany
          key={experience.company}
          {...experience}
          openFirstPosition={index === 0}
        />
      ))}
    </ol>
  )
}

export default ExperienceTimeline

import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import { BsBuildings as CompanyIcon } from "react-icons/bs"
import type { CareerProps } from "@/common/lib/types"
import Card from "@/components/ds/card"
import { formatDuration, formatMonthYear } from "@/lib/date"

const CareerCard: FC<CareerProps> = ({
  position,
  company,
  logo,
  location,
  location_type,
  type,
  start_date,
  end_date,
  industry,
  link,
}) => {
  const durationText = formatDuration(start_date, end_date)
  const details = [type, location_type, industry].filter(Boolean)

  return (
    <Card className="flex items-center gap-5 border border-neutral-300 px-6 py-4 dark:border-neutral-800">
      {logo ? (
        <Image src={logo} width={55} height={55} alt={`${company} logo`} />
      ) : (
        <CompanyIcon size={30} />
      )}

      <div className="space-y-1">
        <h6> {position}</h6>
        <div className="space-y-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-1 md:gap-2">
            <Link href={link || "#"} target="_blank" rel="noopener noreferrer">
              <span className="cursor-pointer underline hover:text-foreground">
                {company}
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{location}</span>
          </div>

          <div className="flex flex-col text-sm">
            <div className="flex gap-1">
              <span>{formatMonthYear(start_date)}</span> -{" "}
              <span>{end_date ? formatMonthYear(end_date) : "Present"}</span>
            </div>

            <span className="text-muted-foreground">~ {durationText}</span>
            <span className="capitalize">{details.join(" • ")}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CareerCard

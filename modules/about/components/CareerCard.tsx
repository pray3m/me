import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import { BsBuildings as CompanyIcon } from "react-icons/bs"
import type { CareerProps } from "@/common/lib/types"
import Card from "@/components/ds/card"

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
  const startDate = moment(start_date)
  const endDate = end_date ? moment(end_date) : moment()

  const durationYears = endDate.diff(startDate, "years")
  const durationMonths = endDate.diff(startDate, "months") % 12

  let durationText = ""
  if (durationYears > 0) {
    durationText = `${durationYears} year${durationYears > 1 ? "s" : ""}`
  } else {
    durationText = `${durationMonths} month${durationMonths > 1 ? "s" : ""}`
  }

  return (
    <Card className="flex items-center gap-5 border border-neutral-300 px-6 py-4 dark:border-neutral-800">
      {logo ? (
        <Image src={logo} width={55} height={55} alt={company} />
      ) : (
        <CompanyIcon size={30} />
      )}

      <div className="space-y-1">
        <h6> {position}</h6>
        <div className="space-y-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-1 md:gap-2">
            <Link href={link || "#"} target="_blank">
              <span className="cursor-pointer underline hover:text-foreground">
                {company}
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{location}</span>
          </div>

          <div className="flex flex-col text-sm">
            <div className="flex gap-1">
              <span>{startDate.format("MMM YYYY")}</span> -{" "}
              <span>{end_date ? endDate.format("MMM YYYY") : "Present"}</span>
            </div>

            <span className="text-muted-foreground">~ {durationText}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CareerCard

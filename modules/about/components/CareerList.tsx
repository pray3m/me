import Link from "next/link"
import { HiOutlineBriefcase as CareerIcon } from "react-icons/hi"
import { LuDownload } from "react-icons/lu"
import { CAREERS } from "@/common/constant/careers"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"
import CareerCard from "./CareerCard"

const CareerList = () => {
  const RESUME_URL = "https://www.linkedin.com/in/pray3m/"

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title="Career" icon={<CareerIcon className="mr-1" />} />

        <SectionSubHeading>
          <p className="text-muted-foreground">
            My professional career journey
          </p>
          <Link
            href={RESUME_URL}
            passHref
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-2 text-muted-foreground transition-colors duration-150 ease-snappy hover:text-foreground"
          >
            <LuDownload className="transition-transform duration-150 ease-snappy group-hover:-translate-x-0.5" />{" "}
            <span>Download Resume</span>
          </Link>
        </SectionSubHeading>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {CAREERS.map((career, index) => (
          <CareerCard key={index} {...career} />
        ))}
      </div>
    </section>
  )
}

export default CareerList

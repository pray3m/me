import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { type FC, Suspense } from "react"
import SectionHeading from "@/components/ds/section-heading"
import Skeleton from "@/components/ds/skeleton"
import CodingActiveSummary from "@/modules/dashboard/components/CodingActive/CodingActiveSummary"
import ContributionsSummary from "@/modules/dashboard/components/Contributions/ContributionsSummary"

const ActivitySection: FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionHeading title="Activity" />
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-1 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>
            <span className="hidden sm:inline">Full </span>dashboard
          </span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Both cards call a third-party API, so each streams in behind its own
          boundary — a slow WakaTime can't hold back the GitHub heatmap. */}
      <div className="space-y-4">
        <Suspense fallback={<Skeleton className="h-52 w-full rounded-xl" />}>
          <ContributionsSummary />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40 w-full rounded-xl" />}>
          <CodingActiveSummary />
        </Suspense>
      </div>
    </section>
  )
}

export default ActivitySection

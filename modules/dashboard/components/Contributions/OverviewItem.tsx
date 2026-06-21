import { type FC } from "react"
import AnimateCounter from "@/components/ds/animate-counter"

interface OverviewItemProps {
  label: string
  value: number
  unit?: string
}

const OverviewItem: FC<OverviewItemProps> = ({ label, value, unit = "" }) => (
  <div className="flex flex-col self-center rounded-xl border border-border bg-muted px-4 py-3">
    <span className="text-muted-foreground text-sm">{label}</span>
    <div>
      <AnimateCounter
        className="font-medium font-mono text-green-600 text-xl tabular-nums lg:text-2xl"
        total={value}
      />
      {unit && <span className="text-muted-foreground text-sm">{unit}</span>}
    </div>
  </div>
)

export default OverviewItem

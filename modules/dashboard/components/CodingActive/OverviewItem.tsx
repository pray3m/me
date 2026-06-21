import { type FC } from "react"

interface OverviewItemProps {
  label: string
  value: string
}

const OverviewItem: FC<OverviewItemProps> = ({ label, value }) => (
  <div className="flex flex-col space-y-1 rounded-xl border border-border bg-muted px-4 py-3 sm:col-span-1">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span>{value}</span>
  </div>
)

export default OverviewItem

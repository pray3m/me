import { type FC } from "react"

interface OverviewItemProps {
  label: string
  value: string
}

const OverviewItem: FC<OverviewItemProps> = ({ label, value }) => (
  <div className="flex flex-col space-y-1 rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-800 sm:col-span-1">
    <span className="text-sm dark:text-neutral-400">{label}</span>
    <span>{value}</span>
  </div>
)

export default OverviewItem

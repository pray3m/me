import type React from "react"
import type { FC } from "react"

interface Props {
  title: string
  icon?: React.ReactNode
}

const SectionHeading: FC<Props> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-1 font-medium text-foreground text-xl">
      {icon && <>{icon}</>}
      <h2 className="capitalize">{title}</h2>
    </div>
  )
}

export default SectionHeading

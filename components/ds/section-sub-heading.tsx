import { type FC, type ReactNode } from "react"

interface Props {
  children?: ReactNode
}

const SectionSubHeading: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between gap-2 text-muted-foreground lg:flex-row lg:items-center">
      {children}
    </div>
  )
}

export default SectionSubHeading

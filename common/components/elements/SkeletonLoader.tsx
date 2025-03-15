import { useTheme } from "next-themes"
import type { FC, ReactNode } from "react"
import { SkeletonTheme } from "react-loading-skeleton"

type Props = {
  children: ReactNode
}

const SkeletonLoader: FC<Props> = ({ children }) => {
  const { resolvedTheme } = useTheme()

  const baseColor = resolvedTheme === "dark" ? "#202020" : "#ebebeb"
  const highlightColor = resolvedTheme === "dark" ? "#2e2e2e" : "#f5f5f5"

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  )
}

export default SkeletonLoader

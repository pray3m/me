import type { FC, ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  [propName: string]: ReactNode | string | undefined
}

const Card: FC<CardProps> = ({ children, className = "", ...others }) => {
  return (
    <div
      className={`rounded-xl shadow-xs transition-all duration-300 lg:hover:shadow-md dark:bg-neutral-800 ${className}`}
      {...others}
    >
      {children}
    </div>
  )
}

export default Card

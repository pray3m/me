import type { FC, ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  [propName: string]: any
}

const Card: FC<CardProps> = ({ children, className = "", ...others }) => {
  return (
    <div
      className={`rounded-xl shadow-xs transition-all duration-300 dark:bg-neutral-800 lg:hover:shadow-md ${className}`}
      {...others}
    >
      {children}
    </div>
  )
}

export default Card

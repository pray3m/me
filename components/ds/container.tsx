import { type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  [propName: string]: ReactNode | string | undefined
}

const Container = ({ children, className = "", ...others }: Props) => {
  return (
    <div
      className={`mt-20 mb-10 px-4 py-8 lg:mt-0 lg:p-8 ${className} `}
      {...others}
    >
      {children}
    </div>
  )
}

export default Container

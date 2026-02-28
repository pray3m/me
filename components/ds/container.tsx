import { type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  [propName: string]: ReactNode | string | undefined
}

const Container = ({ children, className = "", ...others }: Props) => {
  return (
    <div className={`mt-20 mb-10 p-8 lg:mt-0 ${className} `} {...others}>
      {children}
    </div>
  )
}

export default Container

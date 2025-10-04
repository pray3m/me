import { ReactNode } from "react"

interface Props {
  className?: string
  [propName: string]: ReactNode | string | undefined
}

const Breakline = ({ className, ...others }: Props) => {
  return (
    <div
      className={`my-4 border-t border-gray-300 dark:border-neutral-700 ${className} `}
      {...others}
    />
  )
}

export default Breakline

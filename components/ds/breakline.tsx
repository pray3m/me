import { ReactNode } from "react"

interface Props {
  className?: string
  [propName: string]: ReactNode | string | undefined
}

const Breakline = ({ className, ...others }: Props) => {
  return (
    <div
      className={`my-4 border-gray-300 border-t dark:border-neutral-700 ${className} `}
      {...others}
    />
  )
}

export default Breakline

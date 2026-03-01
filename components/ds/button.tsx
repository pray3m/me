import * as React from "react"

import { Button as UiButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ComponentProps<typeof UiButton> {
  icon?: React.ReactNode
}

const Button = ({ icon, children, className, ...props }: ButtonProps) => {
  return (
    <UiButton
      className={cn(
        "rounded-lg bg-neutral-500 font-sora text-[15px] text-neutral-50 shadow-md transition-all duration-300 hover:scale-[101%] hover:bg-neutral-600 dark:bg-neutral-600 dark:hover:bg-neutral-700",
        className
      )}
      {...props}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {children}
    </UiButton>
  )
}

export { Button }
export default Button

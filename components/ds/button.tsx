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
        "rounded-lg bg-brand text-brand-foreground text-sm shadow-sm transition-all duration-200 ease-snappy hover:scale-[101%] hover:bg-brand-hover",
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

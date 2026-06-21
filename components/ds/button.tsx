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
        "rounded-lg bg-primary text-primary-foreground text-sm shadow-md transition-all duration-300 hover:scale-[101%] hover:bg-primary/90",
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

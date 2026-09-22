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
        "rounded-lg bg-brand text-brand-foreground text-sm shadow-sm transition-[transform,background-color] duration-150 ease-snappy hover:scale-[101%] hover:bg-brand-hover active:scale-[0.97] active:duration-100",
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

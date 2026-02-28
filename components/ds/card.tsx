import * as React from "react"

import {
  Card as UiCard,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<typeof UiCard> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <UiCard
      className={cn(
        "border-0 py-0 bg-transparent text-inherit shadow-xs transition-all duration-300 dark:bg-neutral-800",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
export default Card

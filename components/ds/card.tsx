import * as React from "react"

import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as UiCard,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<typeof UiCard> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <UiCard
      className={cn(
        "border-0 bg-transparent py-0 text-inherit shadow-xs transition-[transform,box-shadow,border-color] duration-150 ease-snappy dark:bg-neutral-800",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
export default Card

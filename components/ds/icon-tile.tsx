import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

/**
 * Square leading tile for list rows: a monogram, a lucide icon, or a logo.
 * Decorative by default — the row's text carries the meaning.
 */
const IconTile = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    data-slot="icon-tile"
    className={cn(
      "flex size-7 shrink-0 select-none items-center justify-center rounded-md border border-border bg-muted font-medium text-muted-foreground text-sm ring-1 ring-border/50 ring-offset-1 ring-offset-background [&_svg]:size-3.5",
      className
    )}
    {...props}
  />
)

export default IconTile

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

/**
 * Small mono pill for stack names and other short labels. An optional leading
 * icon (any `svg` child) is sized automatically.
 */
const Tag = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    data-slot="tag"
    className={cn(
      "inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2 font-mono text-muted-foreground text-xs [&_svg]:size-3.5 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
)

export default Tag

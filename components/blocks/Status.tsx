import Image from "next/image"
import type { FC } from "react"

// "What I'm shipping now" chip — the current product, its favicon, and a link
// out. Distinct from the hero's "Open to collabs" availability signal.
const Status: FC = () => {
  return (
    <a
      href="https://pikeah.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Currently shipping Pikeah — opens pikeah.com in a new tab"
      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 py-1 pr-2.5 pl-2 text-sm transition-colors hover:border-foreground/20 hover:bg-muted"
    >
      <span className="relative flex size-1.5" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-amber-500 opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
      </span>
      <span className="text-muted-foreground">Shipping</span>
      <Image
        src="/images/clients/pikeah.png"
        alt=""
        width={16}
        height={16}
        className="rounded-[4px]"
      />
      <span className="font-medium text-foreground">Pikeah</span>
    </a>
  )
}

export default Status

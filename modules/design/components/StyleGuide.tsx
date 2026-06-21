import { type ReactNode } from "react"
import Badge from "@/components/ds/badge"
import Button from "@/components/ds/button"
import SectionHeading from "@/components/ds/section-heading"
import { cn } from "@/lib/utils"

const SURFACES = [
  "bg-background",
  "bg-card",
  "bg-muted",
  "bg-secondary",
  "bg-primary",
  "bg-brand",
  "bg-destructive",
]

const TEXTS = [
  "text-foreground",
  "text-muted-foreground",
  "text-brand",
  "text-destructive",
]

const TYPE = [
  ["Page title", "text-2xl font-semibold"],
  ["Section title", "text-xl font-medium"],
  ["Card title", "text-lg font-medium"],
  ["Body", "text-base"],
  ["Secondary", "text-sm text-muted-foreground"],
  ["Caption", "text-xs"],
] as const

const RADII = [
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-full",
]

const SHADOWS = ["shadow-card", "shadow-popover", "shadow-modal"]

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-4">
    <SectionHeading title={title} />
    {children}
  </section>
)

const StyleGuide = () => (
  <div className="space-y-12 pt-4">
    <Block title="Color — surfaces">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SURFACES.map((c) => (
          <div key={c} className="space-y-2">
            <div className={cn("h-16 rounded-lg border border-border", c)} />
            <code className="text-muted-foreground text-xs">{c}</code>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Color — text">
      <div className="space-y-1">
        {TEXTS.map((c) => (
          <p key={c} className={cn("text-lg", c)}>
            {c} — the quick brown fox.
          </p>
        ))}
      </div>
    </Block>

    <Block title="Typography">
      <div className="space-y-3">
        {TYPE.map(([label, c]) => (
          <div
            key={label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
          >
            <span className={c}>{label}</span>
            <code className="text-muted-foreground text-xs">{c}</code>
          </div>
        ))}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-lg tabular-nums">0123456789</span>
          <code className="text-muted-foreground text-xs">
            font-mono tabular-nums
          </code>
        </div>
      </div>
    </Block>

    <Block title="Buttons & badges">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary action</Button>
        <Badge>Badge</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </div>
    </Block>

    <Block title="Radius">
      <div className="flex flex-wrap gap-4">
        {RADII.map((r) => (
          <div key={r} className="space-y-2">
            <div className={cn("size-16 border border-border bg-muted", r)} />
            <code className="text-muted-foreground text-xs">{r}</code>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Elevation">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SHADOWS.map((s) => (
          <div
            key={s}
            className={cn(
              "flex h-20 items-center justify-center rounded-xl bg-card",
              s
            )}
          >
            <code className="text-muted-foreground text-xs">{s}</code>
          </div>
        ))}
      </div>
    </Block>
  </div>
)

export default StyleGuide

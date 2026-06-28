import type { ReactElement } from "react"

/** Standard Open Graph image dimensions and type, shared by all OG routes. */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

const COLORS = {
  background: "linear-gradient(135deg, #0a0a0a 0%, #141414 100%)",
  text: "#ffffff",
  accent: "#6366f1",
  muted: "#a1a1aa",
}

/**
 * Strip symbol glyphs (★, emoji…) the default OG font can't render — they
 * otherwise trigger a failed dynamic-font fetch during image generation.
 * Applied to every line so callers don't have to remember.
 */
const sanitize = (text: string) => text.replace(/\p{S}/gu, "").trim()

interface OgCardOptions {
  /** Small accent line above the title, e.g. the domain. */
  eyebrow: string
  title: string
  subtitle?: string
}

/**
 * The shared branded OG card. Rendered by `next/og`'s `ImageResponse`, so the
 * JSX is Satori markup (inline styles only, no CSS variables).
 */
export function ogCard({
  eyebrow,
  title,
  subtitle,
}: OgCardOptions): ReactElement {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: COLORS.background,
        color: COLORS.text,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 600, color: COLORS.accent }}>
        {sanitize(eyebrow)}
      </div>
      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
          marginTop: 24,
          lineHeight: 1.05,
        }}
      >
        {sanitize(title)}
      </div>
      {subtitle ? (
        <div
          style={{
            fontSize: 34,
            color: COLORS.muted,
            marginTop: 24,
            lineHeight: 1.4,
          }}
        >
          {sanitize(subtitle)}
        </div>
      ) : null}
    </div>
  )
}

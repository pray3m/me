import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

/** Standard Open Graph image dimensions and type, shared by all OG routes. */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

const COLORS = {
  bg: "linear-gradient(135deg, #0b0b10 0%, #14141c 100%)",
  text: "#fafafa",
  muted: "#a1a1aa",
  accent: "#818cf8",
  accent2: "#c084fc",
  border: "rgba(255,255,255,0.10)",
}

/**
 * Strip symbol glyphs (★, emoji…) the bundled font can't render — they
 * otherwise trigger a failed dynamic-font fetch during image generation.
 */
const sanitize = (text: string) => text.replace(/\p{S}/gu, "").trim()

type FontWeight = 400 | 600 | 800

/**
 * Fetch a single Onest weight from Google Fonts as TTF (Satori can't read
 * woff2, hence the legacy User-Agent), subset to just the glyphs we render.
 * Returns null on any failure so image generation degrades to the default font
 * instead of breaking the build.
 */
async function loadFont(weight: FontWeight, text: string) {
  try {
    const api = `https://fonts.googleapis.com/css2?family=Onest:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await fetch(api, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)",
      },
    }).then((r) => r.text())
    const src = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(truetype|opentype)'\)/
    )?.[1]
    if (!src) return null
    const data = await fetch(src).then((r) => r.arrayBuffer())
    return { name: "Onest", data, weight, style: "normal" as const }
  } catch {
    return null
  }
}

/** Read the profile photo from disk at build time and inline it as a data URL. */
async function loadAvatar() {
  try {
    const buf = await readFile(join(process.cwd(), "public/images/prem.jpg"))
    return `data:image/jpeg;base64,${buf.toString("base64")}`
  } catch {
    return null
  }
}

interface OgOptions {
  /** Small accent line above the title, e.g. the domain. */
  eyebrow: string
  title: string
  subtitle?: string
  /** Show the profile photo (used on the site-wide card). */
  avatar?: boolean
}

/**
 * Render a branded Open Graph card with `next/og`. The JSX is Satori markup
 * (inline styles only, every multi-child node must be `display: flex`).
 */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  avatar = false,
}: OgOptions) {
  const e = sanitize(eyebrow)
  const t = sanitize(title)
  const s = subtitle ? sanitize(subtitle) : ""

  const [f400, f600, f800] = await Promise.all([
    loadFont(400, `${e}${s} `),
    loadFont(600, e),
    loadFont(800, t),
  ])
  const fonts = [f400, f600, f800].filter((f) => f !== null)
  const avatarSrc = avatar ? await loadAvatar() : null

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "Onest",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -150,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(129,140,248,0.30), transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 600, color: COLORS.muted }}>
            {e}
          </div>
        </div>
        {avatarSrc ? (
          // biome-ignore lint/performance/noImgElement: Satori renders <img>, not next/image
          <img
            src={avatarSrc}
            width={104}
            height={104}
            alt=""
            style={{ borderRadius: 9999, border: `2px solid ${COLORS.border}` }}
          />
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -1,
          }}
        >
          {t}
        </div>
        {s ? (
          <div
            style={{
              fontSize: 34,
              fontWeight: 400,
              color: COLORS.muted,
              marginTop: 22,
              lineHeight: 1.35,
            }}
          >
            {s}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          height: 8,
          width: 150,
          borderRadius: 9999,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
        }}
      />
    </div>,
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined }
  )
}

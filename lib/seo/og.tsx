import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { defaultSocialImage } from "./config"

/** Standard Open Graph image dimensions and type, shared by all OG routes. */
export const OG_SIZE = {
  width: defaultSocialImage.width,
  height: defaultSocialImage.height,
}
export const OG_CONTENT_TYPE = defaultSocialImage.type

const COLORS = {
  bg: "linear-gradient(135deg, #0b0b10 0%, #14141c 100%)",
  text: "#fafafa",
  muted: "#a1a1aa",
  accent: "#818cf8",
  accent2: "#c084fc",
  border: "rgba(255,255,255,0.10)",
}

/**
 * Strip symbol glyphs (★, emoji…).
 */
const sanitize = (text: string) => text.replace(/\p{S}/gu, "").trim()

type FontWeight = 400 | 600 | 800

async function loadFont(weight: FontWeight) {
  try {
    const data = await readFile(
      join(process.cwd(), `common/styles/fonts/og/onest-${weight}.ttf`)
    )
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
    loadFont(400),
    loadFont(600),
    loadFont(800),
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

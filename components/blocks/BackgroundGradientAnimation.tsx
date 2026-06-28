import type { CSSProperties, FC } from "react"
import { cn } from "@/lib/utils"

interface BackgroundGradientAnimationProps {
  className?: string
}

const containerVars = {
  "--gradient-start": "rgb(15, 14, 40)",
  "--gradient-end": "rgb(30, 27, 75)",
  "--first-color": "99, 102, 241",
  "--second-color": "168, 85, 247",
  "--third-color": "79, 70, 229",
  "--fourth-color": "139, 92, 246",
  "--fifth-color": "217, 70, 239",
  "--size": "80%",
  "--blending": "hard-light",
} as CSSProperties

const blobBase: CSSProperties = {
  position: "absolute",
  width: "var(--size)",
  height: "var(--size)",
  top: "calc(50% - var(--size) / 2)",
  left: "calc(50% - var(--size) / 2)",
  mixBlendMode: "var(--blending)" as CSSProperties["mixBlendMode"],
}

const radial = (color: string) =>
  `radial-gradient(circle at center, rgba(${color}, 0.8) 0, rgba(${color}, 0) 50%) no-repeat`

const BackgroundGradientAnimation: FC<BackgroundGradientAnimationProps> = ({
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      style={containerVars}
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[inherit] bg-[linear-gradient(40deg,var(--gradient-start),var(--gradient-end))]",
        className
      )}
    >
      <div className="absolute inset-0 blur-2xl">
        <div
          className="animate-first opacity-100"
          style={{
            ...blobBase,
            background: radial("var(--first-color)"),
            transformOrigin: "center center",
          }}
        />
        <div
          className="animate-second opacity-100"
          style={{
            ...blobBase,
            background: radial("var(--second-color)"),
            transformOrigin: "calc(50% - 400px)",
          }}
        />
        <div
          className="animate-third opacity-100"
          style={{
            ...blobBase,
            background: radial("var(--third-color)"),
            transformOrigin: "calc(50% + 400px)",
          }}
        />
        <div
          className="animate-fourth opacity-70"
          style={{
            ...blobBase,
            background: radial("var(--fourth-color)"),
            transformOrigin: "calc(50% - 200px)",
          }}
        />
        <div
          className="animate-fifth opacity-100"
          style={{
            ...blobBase,
            background: radial("var(--fifth-color)"),
            transformOrigin: "calc(50% - 800px) calc(50% + 800px)",
          }}
        />
      </div>
    </div>
  )
}

export default BackgroundGradientAnimation

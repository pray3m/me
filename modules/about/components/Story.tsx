import { type FC } from "react"
import { ABOUT } from "@/common/constant/about"

const Story: FC = () => {
  return (
    <section
      className="space-y-4 text-foreground leading-8"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: ABOUT }}
    />
  )
}

export default Story

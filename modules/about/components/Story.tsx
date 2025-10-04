import { type FC } from "react"
import { ABOUT } from "@/common/constant/about"

const Story: FC = () => {
  return (
    <section
      className="space-y-4 leading-loose text-neutral-800 dark:text-neutral-300"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: ABOUT }}
    />
  )
}

export default Story

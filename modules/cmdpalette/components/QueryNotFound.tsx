import { BiLogoGoogle as GoogleIcon } from "react-icons/bi"
import { HiOutlineChat as AiIcon } from "react-icons/hi"
import Button from "@/common/components/elements/Button"

interface Props {
  queryDebounce: string
  handleAskAiAssistant: () => void
  handleFindGoogle: () => void
}

const QueryNotFound = ({
  queryDebounce,
  handleAskAiAssistant,
  handleFindGoogle,
}: Props) => {
  return (
    <div className="flex flex-col items-center space-y-5 pt-5 pb-10">
      <div className="space-y-2 text-center text-neutral-500">
        <p>
          No result found about
          <span className="mr-2 ml-1 text-neutral-600 italic dark:text-neutral-400">
            `{queryDebounce}`
          </span>
          in this website.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          Ask my AI Assistant or find in Google instead?
        </p>
      </div>
      <div className="flex w-full flex-col justify-center gap-3 lg:flex-row">
        <Button
          onClick={handleAskAiAssistant}
          className="!bg-green-600 justify-center"
        >
          <AiIcon size={20} /> Ask AI Assistant
        </Button>
        <Button
          onClick={handleFindGoogle}
          className="!bg-indigo-600 justify-center"
        >
          <GoogleIcon size={20} />
          Find in Google
        </Button>
      </div>
      <p className="text-neutral-500 text-sm">
        Press `ESC` to close this window
      </p>
    </div>
  )
}

export default QueryNotFound

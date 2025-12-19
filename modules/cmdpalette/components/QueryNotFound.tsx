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
    <div className="flex flex-col pt-5 pb-10 space-y-5 items-center">
      <div className="text-neutral-500 text-center space-y-2">
        <p>
          No result found about
          <span className="italic text-neutral-600 dark:text-neutral-400 ml-1 mr-2">
            `{queryDebounce}`
          </span>
          in this website.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          Ask my AI Assistant or find in Google instead?
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 w-full justify-center">
        <Button
          onClick={handleAskAiAssistant}
          className="justify-center !bg-green-600"
        >
          <AiIcon size={20} /> Ask AI Assistant
        </Button>
        <Button
          onClick={handleFindGoogle}
          className="justify-center !bg-indigo-600"
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

import { BiLeftArrowCircle as BackButton } from "react-icons/bi"
import Typewriter from "typewriter-effect"
import Button from "@/components/ds/button"
import MarkdownRenderer from "@/components/blocks/MarkdownRenderer"

type AiResponseProps = {
  response: string
  isAiFinished: boolean
  onAiFinished: () => void
  onAiClose: () => void
}

const AiResponses = ({
  response,
  isAiFinished,
  onAiFinished,
  onAiClose,
}: AiResponseProps) => {
  return (
    <>
      {response ? (
        response.includes("```") ? (
          <MarkdownRenderer>{response}</MarkdownRenderer>
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(response)
                .callFunction(() => {
                  onAiFinished()
                })
                .start()
            }}
            options={{
              delay: 10,
            }}
          />
        )
      ) : (
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Oops! The AI seems to be lost. \u00A0 😵‍💫 \u00A0\u00A0"
              )
              .pauseFor(1000)
              .typeString("<br/><br/>")
              .typeString(
                "Looks like the AI has gone on an unscheduled vacation to the Land of Confusion. Hope it brings back some souvenirs of clarity!. \u00A0\u00A0"
              )
              .pauseFor(1000)
              .typeString("<br/><br/>")
              .typeString("Please try again later. \u00A0")
              .callFunction(() => {
                onAiFinished()
              })
              .start()
          }}
          options={{
            delay: 10,
          }}
        />
      )}

      {isAiFinished && (
        <div className="mt-6 flex justify-center transition-all duration-300">
          <Button onClick={onAiClose} aria-label="Go back">
            <BackButton />
            Back
          </Button>
        </div>
      )}
    </>
  )
}

export default AiResponses

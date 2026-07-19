import { Inbox } from "lucide-react"
import { type FC } from "react"

interface Props {
  message: string
}

const EmptyState: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 py-3 text-muted-foreground">
      <Inbox size={48} />
      <p>{message}</p>
    </div>
  )
}

export default EmptyState

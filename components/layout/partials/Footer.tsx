import { type FC } from "react"
import Copyright from "./Copyright"

const Footer: FC = () => {
  return (
    <footer className="relative bottom-0 mx-8 w-[-webkit-fill-available] max-w-[790px] space-y-5 border-gray-300 border-t py-8 text-[15px] text-muted-foreground dark:border-neutral-700">
      <div className="flex justify-between">
        <Copyright />
        <div>Made with ❤️ using Next.js</div>
      </div>
    </footer>
  )
}

export default Footer

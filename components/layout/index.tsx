import type { ReactNode } from "react"
import NowPlayingBar from "@/components/blocks/NowPlayingBar"
import NowPlayingCard from "@/components/blocks/NowPlayingCard"
import Footer from "./partials/Footer"
import Sidebar from "./partials/Sidebar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="mx-auto max-w-6xl lg:px-8 lg:py-4 xl:py-8">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <header className="lg:w-1/5">
            <Sidebar />
          </header>
          {/* `footer` sits outside `main` so it keeps its contentinfo
              landmark; the wrapper holds the column width `main` used to. */}
          <div className="max-w-[854px] lg:w-4/5">
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <NowPlayingCard />
      </div>
      <NowPlayingBar />
    </>
  )
}

export default Layout

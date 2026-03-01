"use client"

import type { ReactNode } from "react"
import { useMediaQuery } from "usehooks-ts"
import NowPlayingBar from "@/components/blocks/NowPlayingBar"
import NowPlayingCard from "@/components/blocks/NowPlayingCard"
import Sidebar from "./partials/Sidebar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isCompact = useMediaQuery("(max-width: 1023px)")
  return (
    <>
      <div className="mx-auto max-w-6xl lg:px-8 lg:py-4 xl:py-8">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <header className="lg:w-1/5">
            <Sidebar />
          </header>
          <main className="max-w-[854px] transition-all duration-300 lg:w-4/5">
            {children}
            {/* <Footer /> */}
          </main>
        </div>
      </div>
      {isCompact ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  )
}

export default Layout

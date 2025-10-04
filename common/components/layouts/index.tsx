"use client"

import clsx from "clsx"
import type { ReactNode } from "react"
import useIsMobile from "@/common/hooks/use-is-mobile"
import NowPlayingBar from "../elements/NowPlayingBar"
import NowPlayingCard from "../elements/NowPlayingCard"
import Footer from "./partials/Footer"
import Sidebar from "./partials/Sidebar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile()
  return (
    <>
      <div
        className={clsx(
          "mx-auto max-w-6xl bg-light dark:bg-dark dark:text-darkText lg:px-8 lg:py-4 xl:py-8"
        )}
      >
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
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  )
}

export default Layout

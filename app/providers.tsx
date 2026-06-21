"use client"

import { AppProgressProvider as ProgressProvider } from "@bprogress/next"
import { domAnimation, LazyMotion } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"
import { CommandPaletteProvider } from "@/common/context/CommandPaletteContext"
import { AOSInit } from "@/common/lib/aos"
import CommandPalette from "@/components/blocks/CommandPalette"

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CommandPaletteProvider>
          <SWRConfig>
            <AOSInit />
            <ProgressProvider
              height="2px"
              color="#fffd00"
              options={{ showSpinner: false }}
              shallowRouting
            >
              {children}
            </ProgressProvider>
            <CommandPalette />
          </SWRConfig>
        </CommandPaletteProvider>
      </ThemeProvider>
    </LazyMotion>
  )
}

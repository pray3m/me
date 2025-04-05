"use client"

import CommandPalette from "@/common/components/elements/CommandPalette"
import { CommandPaletteProvider } from "@/common/context/CommandPaletteContext"
import { AOSInit } from "@/common/lib/aos"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CommandPaletteProvider>
        <SWRConfig>
          <AOSInit />
          {children}
          <ProgressBar
            height="4px"
            color="#fffd00"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <CommandPalette />
        </SWRConfig>
      </CommandPaletteProvider>
    </ThemeProvider>
  )
}

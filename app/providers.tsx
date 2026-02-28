"use client"

import { AppProgressProvider as ProgressProvider } from "@bprogress/next"
import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"
import CommandPalette from "@/components/blocks/CommandPalette"
import { CommandPaletteProvider } from "@/common/context/CommandPaletteContext"
import { AOSInit } from "@/common/lib/aos"

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
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
  )
}

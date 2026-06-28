"use client"

import { AppProgressProvider as ProgressProvider } from "@bprogress/next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { CommandPaletteProvider } from "@/common/context/CommandPaletteContext"
import { AOSInit } from "@/common/lib/aos"
import CommandPalette from "@/components/blocks/CommandPalette"

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CommandPaletteProvider>
            <QueryClientProvider client={queryClient}>
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
              {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </QueryClientProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  )
}

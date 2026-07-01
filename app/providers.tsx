"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import { CommandPaletteProvider } from "@/common/context/CommandPaletteContext"
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

  // Devtools render different markup on the server, so mount them only after
  // hydration to avoid a tree-regenerating mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CommandPaletteProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <CommandPalette />
              {mounted && process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </QueryClientProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  )
}

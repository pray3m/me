"use client"

import { useEffect } from "react"
import Button from "@/components/ds/button"
import Container from "@/components/ds/container"

// A single app-wide error boundary (not one per route). Next renders this in
// place of any page below `app/` that throws during render, keeping the layout
// (sidebar) intact and offering a recovery path.
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container>
      <div className="flex max-w-md flex-col items-start gap-4">
        <h1 className="font-semibold text-2xl">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred while rendering this page. You can try
          again — if it keeps happening, it's on me, not you.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </Container>
  )
}

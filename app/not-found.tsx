import { ArrowLeft, Compass } from "lucide-react"
import type { NextPage } from "next"
import Link from "next/link"
import Button from "@/components/ds/button"
import Container from "@/components/ds/container"

const NotFoundPage: NextPage = () => {
  return (
    <Container className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="font-medium text-brand text-xs uppercase tracking-[0.18em]">
          404
        </p>
        <h1 className="font-semibold text-2xl lg:text-3xl">
          This page doesn&apos;t exist (anymore).
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground leading-relaxed">
          The link may be old or mistyped. The good stuff is still here — start
          from home or go straight to the projects.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          nativeButton={false}
          icon={<ArrowLeft size={18} />}
          render={<Link href="/" />}
        >
          Back to home
        </Button>
        <Link
          href="/projects"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 font-medium text-sm transition-colors hover:bg-muted"
        >
          <Compass size={18} />
          See projects
        </Link>
      </div>
    </Container>
  )
}

export default NotFoundPage

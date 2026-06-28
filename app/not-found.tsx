import type { NextPage } from "next"
import Container from "@/components/ds/container"
import Reveal from "@/components/ds/reveal"

const NotFoundPage: NextPage = () => {
  return (
    <Container className="flex h-full flex-col items-center justify-center">
      <Reveal>
        <h2 className="animate-pulse text-xl lg:text-2xl">
          Whoops, there doesn&apos;t seem to be anything here!
        </h2>
      </Reveal>
    </Container>
  )
}

export default NotFoundPage

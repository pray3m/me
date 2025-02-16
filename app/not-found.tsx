import Container from "@/common/components/elements/Container";
import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <Container
      className="flex h-full flex-col items-center justify-center"
      data-aos="fade-up"
    >
      <h2 className="animate-pulse text-xl lg:text-2xl">
        Whoops, there doesn&apos;t seem to be anything here!
      </h2>
    </Container>
  );
};

export default NotFoundPage;

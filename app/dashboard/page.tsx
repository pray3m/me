import type { Metadata } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Dashboard from "@/modules/dashboard/components/Dashboard"

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
}

const DashboardPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Dashboard"
        subtitle="This is my personal dashboard, built with Next.js API routes deployed as serverless functions."
      />
      <Dashboard />
    </Container>
  )
}

export default DashboardPage

import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import { createMetadata } from "@/lib/seo"
import Dashboard from "@/modules/dashboard/components/Dashboard"

export const metadata = createMetadata({
  title: "Dashboard",
  description:
    "A live look at Prem Gautam's coding activity — GitHub, WakaTime, and Spotify stats, served via Next.js serverless functions.",
  path: "/dashboard",
})

const DashboardPage = () => {
  return (
    <Container>
      <PageHeading
        title="Dashboard"
        subtitle="This is my personal dashboard, built with Next.js API routes deployed as serverless functions."
      />
      <Dashboard />
    </Container>
  )
}

export default DashboardPage

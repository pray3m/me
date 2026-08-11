import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import { createMetadata } from "@/lib/seo"
import Dashboard from "@/modules/dashboard/components/Dashboard"

export const revalidate = 3600

export const metadata = createMetadata({
  title: "Dashboard",
  description:
    "A regularly refreshed view of Prem Gautam's coding activity, contributions, and day-to-day tools.",
  path: "/dashboard",
})

const DashboardPage = () => {
  return (
    <Container>
      <PageHeading
        title="Dashboard"
        subtitle="My coding activity and contributions, refreshed throughout the day."
      />
      <Dashboard />
    </Container>
  )
}

export default DashboardPage

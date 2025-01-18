import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { Metadata } from "next";
import PageHeading from "@/common/components/elements/PageHeading";

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
};

const DashboardPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Dashboard"
        subtitle="This is my personal dashboard, built with Next.js API routes deployed as serverless functions."
      />
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;

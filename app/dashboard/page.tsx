import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { Metadata } from "next";
import { SWRProvider } from "../providers";

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
};

const DashboardPage = () => {
  return (
    <SWRProvider>
      <Container data-aos="fade-up">
        <Dashboard />
      </Container>
    </SWRProvider>
  );
};

export default DashboardPage;

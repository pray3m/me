import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
};

const DashboardPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;

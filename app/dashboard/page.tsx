import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { NextPage } from "next";
import React from "react";

const DashboardPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;

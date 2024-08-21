import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { GetGithubUser } from "@/services/github";
import { Metadata, NextPage } from "next";
import React from "react";
import { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
};

const DashboardPage = () => {
  // const { status, data: githubData } = GetGithubUser();

  return (
    <Container data-aos="fade-up">
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;

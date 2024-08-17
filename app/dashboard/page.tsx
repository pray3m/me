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
  const { status, data: githubData } = GetGithubUser();
  console.log(githubData);

  return (
    <SWRConfig value={{ fallback: { "api/github": githubData } }}>
      <Container data-aos="fade-up">
        <Dashboard />
      </Container>
    </SWRConfig>
  );
};

export default DashboardPage;

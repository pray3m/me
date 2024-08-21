import Container from "@/common/components/elements/Container";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { GetGithubUser } from "@/services/github";
import { Metadata, NextPage } from "next";
import React from "react";
import { SWRConfig } from "swr";
import { SWRProvider } from "../providers";

export const metadata: Metadata = {
  title: "Dashboard - Prem Gautam",
};

const DashboardPage = () => {
  // const { status, data: githubData } = GetGithubUser();

  return (
    <SWRProvider>
      <Container data-aos="fade-up">
        <Dashboard />
      </Container>
    </SWRProvider>
  );
};

export default DashboardPage;

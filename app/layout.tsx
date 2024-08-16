import Layout from "@/common/components/layouts";
import { AOSInit } from "@/common/utils/aos";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProvidersSandwich } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prem Gautam",
  description: "Personal website of Prem Gautam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AOSInit />
      <body className="bg-light dark:bg-dark">
        <ProvidersSandwich>
          <Layout>{children}</Layout>
        </ProvidersSandwich>
      </body>
    </html>
  );
}

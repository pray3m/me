import { AOSInit } from "@/common/utils/aos";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/common/components/layouts";

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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

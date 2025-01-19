"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import Footer from "./partials/Footer";
import Sidebar from "./partials/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-6xl bg-light dark:bg-dark dark:text-darkText lg:px-8 lg:py-4 xl:py-10",
      )}
    >
      <div className="flex flex-col lg:flex-row lg:gap-5">
        <header className="lg:w-1/5">
          <Sidebar />
        </header>
        <main className="max-w-[854px] transition-all duration-300 lg:w-4/5">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;

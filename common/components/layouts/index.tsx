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
        "max-w-6xl mx-auto lg:px-8 lg:py-4 xl:py-10 bg-light dark:bg-dark dark:text-darkText "
      )}
    >
      <div className="flex flex-col lg:flex-row lg:gap-5">
        <header className="lg:w-1/5">
          <Sidebar />
        </header>
        <main className="lg:w-4/5 transition-all duration-300 max-w-[854px]">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;

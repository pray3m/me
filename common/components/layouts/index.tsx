import React, { ReactNode } from "react";
import Sidebar from "./partials/Sidebar";
import Footer from "./partials/Footer";
import clsx from "clsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={clsx("max-w-6xl mx-auto lg:px-8 lg:py-4 xl:py-10")}>
      <div className="flex flex-col lg:flex-row lg:gap-5">
        <header className="lg:w-1/5">
          <Sidebar />
        </header>
        <main className="lg:w-4/5 transition-all duration-300">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;

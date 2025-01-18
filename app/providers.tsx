"use client";

import { AOSInit } from "@/common/utils/aos";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig>
        <AOSInit />
        {children}
        <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </SWRConfig>
    </ThemeProvider>
  );
}

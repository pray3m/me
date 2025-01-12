"use client";

import theme from "@/common/styles/fonts";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider theme={theme}>
        {children}
        <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ChakraProvider>
      ;
    </ThemeProvider>
  );
}

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig>{children}</SWRConfig>;
};

"use client";

import theme from "@/common/styles/fonts";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

export function ProvidersSandwich({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>;
    </ThemeProvider>
  );
}

import localFont from "next/font/local"

export const onestSans = localFont({
  src: "./onest-variable.woff2",
  variable: "--onestSans-font",
  display: "swap",
  weight: "100 900",
})

export const geistMono = localFont({
  src: "./geist-mono-variable.woff2",
  variable: "--geistMono-font",
  display: "swap",
  weight: "100 900",
})

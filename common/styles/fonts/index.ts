import localFont from "next/font/local"

export const geistSans = localFont({
  src: "./geist-variable.woff2",
  variable: "--geistSans-font",
  display: "swap",
  weight: "100 900",
})

export const geistMono = localFont({
  src: "./geist-mono-variable.woff2",
  variable: "--geistMono-font",
  display: "swap",
  weight: "100 900",
})

export const caveat = localFont({
  src: "./caveat-500.woff2",
  variable: "--caveat-font",
  display: "swap",
  weight: "500",
})

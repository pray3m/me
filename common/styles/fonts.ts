import { Plus_Jakarta_Sans, Sora } from "next/font/google"

export const jakartaSans = Plus_Jakarta_Sans({
  variable: "--jakartaSans-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800"],
})

export const soraSans = Sora({
  variable: "--soraSans-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800"],
})

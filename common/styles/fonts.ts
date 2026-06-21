import { Onest, Sora } from "next/font/google"

// Weights kept at 400–700. 400/500/600 are used via Tailwind utilities; 700 is
// kept for implicit bold (markdown `**` → <strong>, default bold). 300/800 are

// import { Plus_Jakarta_Sans } from "next/font/google"
// export const jakartaSans = Plus_Jakarta_Sans({
//   variable: "--jakartaSans-font",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
// })

export const soraSans = Sora({
  variable: "--soraSans-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700" /* "800" */],
})

export const onestSans = Onest({
  variable: "--onestSans-font",
  subsets: ["latin"],
  display: "swap",
  weight: [/* "300", */ "400", "500", "600", "700" /* "800" */],
})

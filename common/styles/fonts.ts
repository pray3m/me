import { Geist_Mono, Onest } from "next/font/google"

// Body/UI font. Weights 400–700: 400/500/600 are used via Tailwind utilities;
// 700 covers implicit bold (markdown `**` → <strong>). 300/800 are unused.
//
// Sora (display) was dropped — loaded but used in only a few spots and never on
// headings. Plus Jakarta Sans was likewise unused; both are left out. Re-add a
// second family here if the type system ever needs a display face.

export const onestSans = Onest({
  variable: "--onestSans-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const geistMono = Geist_Mono({
  variable: "--geistMono-font",
  subsets: ["latin"],
  display: "swap",
})

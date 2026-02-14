import {
  Fira_Code as FontMono,
  Noto_Sans as FontSans,
  Press_Start_2P as FontPixel,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontPixel = FontPixel({
  subsets: ["latin", "cyrillic"],
  variable: "--font-pixel",
  weight: ["400"],
});

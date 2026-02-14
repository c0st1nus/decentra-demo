import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { headers } from "next/headers";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontMono, fontPixel } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description[0],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Decentrathon 5.0",
    description:
      "Kazakhstan's national hackathon returns. Built for builders. Back on a national scale.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const languageIndex = parseInt(headersList.get("x-language-index") || "0", 10);

  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontPixel.variable,
        )}
      >
        <Providers
          initialLanguageIndex={languageIndex}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

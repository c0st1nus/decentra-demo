"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { LanguageProvider } from "@/context/language-provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  initialLanguageIndex?: number;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function Providers({ children, themeProps, initialLanguageIndex = 0 }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <LanguageProvider initialLanguageIndex={initialLanguageIndex}>{children}</LanguageProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

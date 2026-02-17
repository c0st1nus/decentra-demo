"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { useState } from "react";
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import Image from "next/image";

import logo from "@/public/favicon.ico";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/context/language-provider";

export const Navbar = () => {
  const { languageIndex } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar
      classNames={{
        base: "bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/5",
        wrapper: "px-4 sm:px-6 max-w-7xl mx-auto",
      }}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Brand */}
      <NavbarBrand>
        <Image alt="Logo" height={30} src={logo} width={30} />
      </NavbarBrand>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-6 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "text-sm font-medium text-default-500 hover:text-primary transition-colors duration-200 font-pixel",
                )}
                href={item.href}
              >
                {/* @ts-ignore - label is array */}
                {item.label[languageIndex]}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop CTA */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden lg:flex">
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="text-sm font-semibold glow-primary"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="sm"
            variant="shadow"
          >
            {/* @ts-ignore - register label is at index 4 of navMenuItems which is Register */}
            {siteConfig.navMenuItems[4].label[languageIndex]}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <LanguageSwitcher />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-xl pt-6">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                className="text-lg"
                color={index === 4 ? "primary" : "foreground"}
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {/* @ts-ignore - label is array */}
                {item.label[languageIndex]}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

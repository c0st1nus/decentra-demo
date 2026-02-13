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
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import Image from "next/image";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <HeroUINavbar
      classNames={{
        base: "bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/5",
        wrapper: "px-4 sm:px-6",
      }}
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image alt="Logo" height={16} src={siteConfig.favicon} width={16} />
            <p className="font-bold text-inherit tracking-wider font-pixel text-sm uppercase">
              Decentrathon
            </p>
          </NextLink>
        </NavbarBrand>

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
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop CTA */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
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
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-xl pt-6">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                className="text-lg"
                color={item.label === "Register" ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

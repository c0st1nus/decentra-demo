"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import NextLink from "next/link";
import { Instagram, Linkedin, Send, Globe } from "lucide-react";

import { useLanguage } from "@/context/language-provider";
import logoWithCaption from "@/public/images/logos/logo_with_caption.webp";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { languageIndex } = useLanguage();
  const footer = siteConfig.footer;

  const socialIcons = {
    Instagram: Instagram,
    Telegram: Send,
    LinkedIn: Linkedin,
    BAITC: Globe,
  };

  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        {/* Left Column: Logo & Description */}
        <div className="flex flex-col gap-6 max-w-md">
          <NextLink className="flex justify-start items-start" href="/">
            <Image
              alt="Decentrathon Logo"
              className="h-10 w-auto object-contain"
              src={logoWithCaption}
            />
          </NextLink>
          <p className="text-sm sm:text-base text-default-400 leading-relaxed font-sans">
            {footer.description[languageIndex]}
          </p>
        </div>

        {/* Right Column: Contact & Socials */}
        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-col gap-1 md:items-end">
            <span className="text-sm text-default-400 font-pixel lowercase">
              {footer.reachOut[languageIndex]}
            </span>
            <Link
              isExternal
              className="text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors font-sans"
              href={`mailto:${footer.email}`}
            >
              {footer.email}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {footer.socials.map((social: any) => {
              const Icon = socialIcons[social.name as keyof typeof socialIcons] || Globe;

              return (
                <Link
                  key={social.name}
                  isExternal
                  aria-label={social.name}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:text-primary text-default-400 transition-all"
                  href={social.link}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-default-400">
        <span>© 2023-{new Date().getFullYear()} Decentrathon. All rights reserved.</span>
      </div>
    </footer>
  );
}

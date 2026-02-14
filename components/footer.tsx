import { Link } from "@heroui/link";
import Image from "next/image";
import NextLink from "next/link";

import { useLanguage } from "@/context/language-provider";
import logoWithCaption from "@/public/sprites/logo_with_caption.png";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <NextLink className="flex justify-start items-center gap-2" href="/">
          <Image alt="Logo" className="h-[3vh] w-auto" src={logoWithCaption} />
        </NextLink>

        <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-default-500">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              className="hover:text-primary transition-colors font-pixel"
              href={item.href}
            >
              {item.label[useLanguage().languageIndex]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            isExternal
            className="text-sm text-default-400 hover:text-primary transition-colors"
            href={siteConfig.links.telegram}
          >
            Telegram
          </Link>
          <span className="text-xs text-default-300">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

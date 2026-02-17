"use client";

import {
  History,
  Code2,
  FolderGit2,
  MapPin,
  CalendarDays,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import partners from "@/public/images/about_us/partners.webp";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";

const STAT_ICONS = [Code2, FolderGit2, MapPin, CalendarDays];

export function AboutSection() {
  const { languageIndex } = useLanguage();
  const cfg = siteConfig.aboutSection;

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="hidden md:block absolute left-1/4 top-0 -translate-x-full -translate-y-1/2 w-24 h-24 pointer-events-none">
              <Image 
                src="/images/vectors/Vector 3.png" 
                alt="About Vector" 
                width={100} 
                height={100} 
                className="object-contain -rotate-12 opacity-60" 
              />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <span className="text-x font-pixel text-primary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight font-pixel mb-6">
            <span className="text-gradient">{cfg.title[languageIndex]}</span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-xl mx-auto font-pixel">
            {cfg.subtitle[languageIndex]}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {cfg.stats.map((stat, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];

            return (
              <div
                key={i}
                className="group bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-primary font-pixel mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-sm  text-white font-pixel">
                  {stat.label[languageIndex]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Past Editions */}
        <div className="mb-12">
          <h3 className="text-center text-sm sm:text-base font-pixel text-white mb-6">
            {cfg.pastEditionsLabel[languageIndex]}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {cfg.editions.map((edition, i) => (
              <div key={i}>
                {edition.link ? (
                  <Link
                    isExternal
                    className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.03] border border-white/10 rounded-lg hover:border-primary/40 transition-all duration-300 hover:bg-white/[0.05]"
                    href={edition.link}
                  >
                    <span className="text-xs sm:text-sm font-pixel text-white group-hover:text-white transition-colors">
                      {edition.label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-text-white group-hover:text-primary transition-colors" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.02] border border-white/5 rounded-lg opacity-50 cursor-not-allowed">
                    <span className="text-xs sm:text-sm font-pixel text-white">
                      {edition.label}
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <Image
          src={partners}
          alt={"Partners"}
          className="transition-transform duration-700 group-hover:scale-110 mx-auto mb-12"
        />
        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 auto-rows-[200px]">
          {[
            { id: 1, className: "md:col-span-2 md:row-span-2" },
            { id: 2, className: "md:col-span-2 md:row-span-1" },
            { id: 4, className: "md:col-span-1 md:row-span-2" },
            { id: 14, className: "md:col-span-1 md:row-span-1" },
            { id: 5, className: "md:col-span-1 md:row-span-1" },
            { id: 15, className: "md:col-span-1 md:row-span-1" },
            { id: 6, className: "md:col-span-1 md:row-span-1" },
            { id: 7, className: "md:col-span-2 md:row-span-2" },
            { id: 8, className: "md:col-span-1 md:row-span-1" },
            { id: 9, className: "md:col-span-1 md:row-span-1" },
            { id: 10, className: "md:col-span-1 md:row-span-2" },
            { id: 11, className: "md:col-span-1 md:row-span-1" },
            { id: 12, className: "md:col-span-2 md:row-span-1" },
            { id: 13, className: "md:col-span-1 md:row-span-1" },
          ].map((photo) => (
            <div
              key={photo.id}
              className={`relative rounded-2xl overflow-hidden group border border-white/10 ${photo.className}`}
            >
              <Image
                src={`/images/about_us/photo_${photo.id}.webp`}
                alt={`About Us Photo ${photo.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            isExternal
            as={Link}
            className="text-sm sm:text-md font-bold font-pixel px-2 h-12 sm:h-14 border-default-200/50 hover:border-primary/50 transition-colors"
            href={siteConfig.links.telegram}
            radius="full"
            size="sm"
            startContent={<MessageCircle className="w-5 h-5" />}
            variant="bordered"
          >
            {siteConfig.heroLabels.telegram[useLanguage().languageIndex]}
          </Button>
        </div>
      </div>
    </section>
  );
}

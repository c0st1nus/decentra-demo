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
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

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
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <span className="text-xs font-pixel text-primary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight font-pixel mb-6">
            <span className="text-gradient">{cfg.title[languageIndex]}</span>
          </h2>
          <p className="text-default-400 text-base sm:text-lg max-w-xl mx-auto font-pixel">
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
                <div className="text-xl sm:text-3xl font-bold text-primary font-pixel mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-default-400 font-pixel">
                  {stat.label[languageIndex]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Past Editions */}
        <div className="mb-12">
          <h3 className="text-center text-sm sm:text-base font-pixel text-default-300 mb-6">
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
                    <span className="text-xs sm:text-sm font-pixel text-default-400 group-hover:text-white transition-colors">
                      {edition.label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-default-500 group-hover:text-primary transition-colors" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.02] border border-white/5 rounded-lg opacity-50 cursor-not-allowed">
                    <span className="text-xs sm:text-sm font-pixel text-default-500">
                      {edition.label}
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mock Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-video bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center"
            >
              <span className="text-[10px] sm:text-xs font-pixel text-default-500">Photo {i}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Button
            isExternal
            as={Link}
            className="w-full sm:w-auto text-xs sm:text-base font-semibold px-4 sm:px-8 h-12 sm:h-auto font-pixel border-default-200/50 hover:border-primary/50 transition-colors"
            href={siteConfig.links.telegram}
            radius="full"
            size="lg"
            startContent={<MessageCircle className="w-4 h-4" />}
            variant="bordered"
          >
            {siteConfig.heroLabels.telegram[languageIndex]}
          </Button>
        </div>
      </div>
    </section>
  );
}

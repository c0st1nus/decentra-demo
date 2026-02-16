"use client";

import { Zap, Globe2, MapPin, Users } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { parseStyledText } from "@/lib/parse-styled-text";

export function SolanaDaySection() {
  const { languageIndex } = useLanguage();
  const cfg = siteConfig.solanaDay;

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="text-xs font-pixel text-secondary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6 font-pixel">
            {parseStyledText(cfg.title[languageIndex])}
          </h2>
          <p className="text-default-400 text-sm sm:text-base font-pixel">
            {cfg.poweredBy[languageIndex]}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {cfg.stats.map((stat, i) => {
            const icons = [Users, Globe2, MapPin];
            const Icon = icons[i % icons.length];

            return (
              <div
                key={i}
                className="relative bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 text-center hover:border-secondary/40 transition-colors group"
              >
                <div className="absolute inset-0 bg-secondary/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Icon className="w-6 h-6 text-secondary mx-auto mb-3" />
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-pixel mb-1">
                    {stat.value[languageIndex]}
                  </h3>
                  <p className="text-xs sm:text-sm text-default-400 font-pixel">
                    {stat.label[languageIndex]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Button
            as={Link}
            className="text-sm sm:text-lg font-bold px-8 sm:px-10 h-12 sm:h-14 glow-primary font-pixel"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="lg"
            startContent={<Zap className="w-5 h-5" />}
            variant="shadow"
          >
            {siteConfig.heroLabels.register[useLanguage().languageIndex]}
          </Button>
        </div>
      </div>
    </section>
  );
}

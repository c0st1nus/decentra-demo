"use client";

import { Briefcase, Pizza, Shirt, Users, Network, Zap, Star } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { parseStyledText } from "@/lib/parse-styled-text";

const ICONS = [Briefcase, Pizza, Shirt, Users, Network];

export function HighlightsSection() {
  const { languageIndex } = useLanguage();
  const cfg = siteConfig.highlightsSection;

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-xs font-pixel text-primary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6 font-pixel">
            {parseStyledText(cfg.title[languageIndex])}
          </h2>
          <p className="text-lg sm:text-2xl font-bold text-primary font-pixel">
            {cfg.subtitle[languageIndex]}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          {siteConfig.highlights.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];

            return (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-pixel mb-2 break-words">
                      {item.title[languageIndex]}
                    </h3>
                    <p className="text-xs sm:text-sm text-default-400 leading-relaxed">
                      {item.description[languageIndex]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Button
            as={Link}
            className="w-full sm:w-auto text-xs sm:text-base font-semibold px-4 sm:px-8 h-12 sm:h-auto font-pixel glow-primary"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="lg"
            startContent={<Zap className="w-4 h-4" />}
            variant="shadow"
          >
            {siteConfig.heroLabels.register[languageIndex]}
          </Button>
        </div>
      </div>
    </section>
  );
}

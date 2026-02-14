"use client";

import { Handshake } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";

export function PartnersSection() {
  const { languageIndex } = useLanguage();
  const cfg = siteConfig.partnersSection;

  return (
    <section className="relative py-20 sm:py-32 px-4" id="partners">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Handshake className="w-5 h-5 text-primary" />
            <span className="text-xs font-pixel text-primary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight font-pixel">
            <span className="text-gradient">{cfg.title[languageIndex]}</span>
          </h2>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.partners.map((partner, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-8 sm:p-10 flex items-center justify-center hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.05] min-h-[120px]"
            >
              {/* Mock logo — text placeholder */}
              <span className="text-sm sm:text-base font-pixel text-default-400 group-hover:text-white transition-colors text-center">
                {partner.name[languageIndex]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

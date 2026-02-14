"use client";

import { Cpu } from "lucide-react";

import { TrackCard } from "@/components/track-card";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { parseStyledText } from "@/lib/parse-styled-text";

export function TracksSection() {
  const { languageIndex } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 px-4" id="tracks">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-secondary" />
            <span className="text-xs font-pixel text-secondary uppercase tracking-widest">
              {siteConfig.tracksSection.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-pixel">
            {parseStyledText(siteConfig.tracksSection.title[languageIndex])}
          </h2>
          <p className="text-default-400 text-base sm:text-lg max-w-xl mx-auto font-pixel">
            {siteConfig.tracksSection.subtitle[languageIndex]}
          </p>
        </div>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {siteConfig.tracks.map((track, index) => (
            <TrackCard
              key={index}
              decryptingLabel={siteConfig.tracksSection.decrypting[languageIndex]}
              description={track.description[languageIndex]}
              index={index}
              title={track.title[languageIndex]}
              trackLabel={siteConfig.tracksSection.trackLabel[languageIndex]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

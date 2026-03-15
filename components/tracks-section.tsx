"use client";

import { Cpu } from "lucide-react";
import Image from "next/image";

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
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none opacity-25">
            <Image
              alt="Tracks Vector"
              className="object-contain -rotate-45"
              height={150}
              src="/images/vectors/Vector.png"
              width={150}
            />
          </div>
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 mb-4">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-secondary" />
            <span className="text-x font-pixel text-secondary uppercase tracking-widest leading-none">
              {siteConfig.tracksSection.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-pixel">
            {parseStyledText(siteConfig.tracksSection.title[languageIndex])}
          </h2>
        </div>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {siteConfig.tracks.map((track, index) => (
            <TrackCard
              key={index}
              amount={track.amount?.[languageIndex]}
              description={track.description[languageIndex]}
              image={track.image}
              index={index}
              secondaryImage={track.secondaryImage}
              title={track.title[languageIndex]}
              titleClassName={track.titleClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

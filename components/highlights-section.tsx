"use client";

import { Star, Zap } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { parseStyledText } from "@/lib/parse-styled-text";

export function HighlightsSection() {
  const { languageIndex } = useLanguage();
  const cfg = siteConfig.highlightsSection;

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24 relative">
          <div className="hidden md:block absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-50">
            <Image
              alt="Highlights Flow"
              className="object-contain rotate-40"
              height={200}
              src="/images/vectors/Vector 2.png"
              width={200}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-x font-pixel text-primary uppercase tracking-widest">
              {cfg.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-pixel">
            {parseStyledText(cfg.title[languageIndex])}
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mb-20">
          {/* Vertical central line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-primary/20 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-20">
            {siteConfig.highlights.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="relative">
                  {/* Mobile/Tablet - Center Layout */}
                  <div className="md:hidden text-center">
                    {/* Number Badge */}
                    <div className="font-sans w-12 h-12 rounded-full border-2 border-primary bg-black text-primary font-bold text-xl flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(140,216,18,0.4)]">
                      {i + 1}
                    </div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-default-500 font-pixel mb-3 leading-tight">
                      {item.title[languageIndex]}
                    </h3>
                    {/* Description */}
                    <p className="text-sm sm:text-base text-white leading-relaxed font-medium max-w-md mx-auto">
                      {item.description[languageIndex]}
                    </p>
                  </div>

                  {/* Desktop - Timeline Layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-16 items-start">
                    {/* Left Side */}
                    <div className={clsx("flex justify-end", !isLeft && "order-2 justify-start")}>
                      <div className={clsx("max-w-sm", isLeft ? "text-right" : "text-left")}>
                        {isLeft && (
                          <>
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-default-500 font-pixel mb-3 leading-tight">
                              {item.title[languageIndex]}
                            </h3>
                            {/* Description */}
                            <p className="text-base text-white leading-relaxed font-medium">
                              {item.description[languageIndex]}
                            </p>
                          </>
                        )}
                        {!isLeft && (
                          <>
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-default-500 font-pixel mb-3 leading-tight">
                              {item.title[languageIndex]}
                            </h3>
                            {/* Description */}
                            <p className="text-base text-white leading-relaxed font-medium">
                              {item.description[languageIndex]}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Side (or Left if odd) */}
                    <div className={clsx(!isLeft && "order-1")}>
                      {/* Empty space to maintain grid */}
                    </div>
                  </div>

                  {/* Center Dot with Number Badge (desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 flex-col items-center">
                    {/* Number Badge */}
                    <div className="w-12 h-12 rounded-full border-2 border-primary bg-black text-primary font-bold font-sans text-xl flex items-center justify-center shadow-[0_0_20px_rgba(140,216,18,0.5)] relative z-10">
                      {i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center px-4">
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

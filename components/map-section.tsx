"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Globe, MapPin, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { parseStyledText } from "@/lib/parse-styled-text";

export function MapSection() {
  const { languageIndex } = useLanguage();
  const [activeRegion, setActiveRegion] = useState("astana");
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeData = siteConfig.regions.find((r) => r.id === activeRegion) || siteConfig.regions[0];

  const handleRegionClick = (id: string) => {
    setActiveRegion(id);
    const btn = document.getElementById(`btn-${id}`);

    if (btn && sliderRef.current) {
      const scrollLeft =
        btn.offsetLeft -
        sliderRef.current.offsetLeft -
        sliderRef.current.offsetWidth / 2 +
        btn.offsetWidth / 2;

      sliderRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;

      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-20 sm:py-32 px-4 overflow-hidden" id="locations">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-tighter font-pixel">
              {siteConfig.mapSection.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 font-pixel">
            {parseStyledText(siteConfig.mapSection.title[languageIndex])}
          </h2>
          <p className="text-default-400 text-base sm:text-lg max-w-xl mx-auto font-pixel">
            {parseStyledText(siteConfig.mapSection.subtitle[languageIndex], "text-primary")}
          </p>
        </div>

        {/* Map and Card Container */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center mb-12">
          {/* SVG Map */}
          <div className="relative w-full aspect-[1000/550] bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-8 overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <svg
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 685 383"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="siteConfig.regions">
                {siteConfig.regions.map((region) => {
                  if (region.id === "almatys") return null;

                  const isActive =
                    activeRegion === region.id ||
                    (activeRegion === "almatys" && region.id === "almaty");

                  return (
                    <path
                      key={region.id}
                      className="cursor-pointer hover:fill-primary/20 hover:stroke-primary"
                      d={region.path}
                      fill={isActive ? "rgba(140, 216, 18, 0.4)" : "rgba(140, 216, 18, 0)"}
                      stroke={isActive ? "#8cd812" : "rgba(140, 216, 18, 0.3)"}
                      strokeWidth={isActive ? 3 : 1.5}
                      style={{
                        transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s",
                      }}
                      onClick={() => handleRegionClick(region.id)}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* City Card */}
          <div className="relative h-full min-h-[300px] flex items-center justify-center">
            <div className="w-full max-w-md bg-black/40 border-2 border-primary rounded-xl overflow-hidden shadow-[0_0_30px_rgba(102,43,177,0.2)]">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  fill
                  alt={activeData.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  src={activeData.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white font-mono">{activeData.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-1 font-pixel">
                    {activeData.title}
                  </h4>
                  <div className="flex items-start gap-2 text-default-400">
                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary/80" />
                    <p className="text-sm">{activeData.address}</p>
                  </div>
                </div>

                <Button
                  isExternal
                  as={Link}
                  className="w-full font-semibold bg-primary text-black hover:bg-primary/90"
                  endContent={<ExternalLink className="w-4 h-4" />}
                  href={activeData.link}
                >
                  {siteConfig.mapSection.openIn2GIS[languageIndex]}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Slider */}
        <div className="relative max-w-5xl mx-auto px-12">
          <button
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-content1 rounded-full border border-white/10 text-default-500 hover:text-white hover:bg-primary hover:border-primary transition-colors"
            onClick={() => scrollSlider("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-4 px-2 snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {siteConfig.regions.map((region) => (
              <button
                key={region.id}
                className={`
                            shrink-0 px-3 sm:px-6 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-300 snap-center border font-pixel
                            ${
                              activeRegion === region.id
                                ? "bg-primary text-black border-primary scale-105 shadow-[0_0_15px_rgba(140,216,18,0.4)]"
                                : "bg-black/40 text-default-400 border-white/10 hover:border-primary/50 hover:text-white"
                            }
                        `}
                id={`btn-${region.id}`}
                onClick={() => handleRegionClick(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>

          <button
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-content1 rounded-full border border-white/10 text-default-500 hover:text-white hover:bg-primary hover:border-primary transition-colors hidden sm:block"
            onClick={() => scrollSlider("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Register Button */}
        <div className="text-center mt-12 px-4">
          <Button
            as={Link}
            className="w-full sm:w-auto text-xs sm:text-base font-semibold px-4 sm:px-8 h-12 sm:h-auto font-pixel glow-primary"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="lg"
            startContent={<ExternalLink className="w-4 h-4" />}
            variant="shadow"
          >
            {siteConfig.heroLabels.register[languageIndex]}
          </Button>
        </div>
      </div>
    </section>
  );
}

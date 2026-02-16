"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Globe, MapPin, ExternalLink, Zap } from "lucide-react";
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

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef<number>(0);

  const scrollAccumulator = useRef(0);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = sliderRef.current;

    if (!scrollContainer) return;

    const animate = () => {
      if (isAutoScrolling && !isDragging) {
        // Accumulate fractional pixels
        scrollAccumulator.current += siteConfig.mapSection.autoScrollSpeed; // Adjust speed as needed

        if (scrollAccumulator.current >= 1) {
          const pixelsToScroll = Math.floor(scrollAccumulator.current);

          scrollContainer.scrollLeft += pixelsToScroll;
          scrollAccumulator.current -= pixelsToScroll;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isAutoScrolling, isDragging]);

  // Infinite loop logic (seamless reset)
  const handleScroll = () => {
    const container = sliderRef.current;

    if (!container) return;

    // If we've scrolled past the first set (1/3 of total width roughly), reset to 0
    // Actually, exact match is better: reset when scrollLeft >= scrollWidth / 3
    // We used 3 sets. The middle set is identical to the first.
    const oneSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft -= oneSetWidth;
    } else if (container.scrollLeft <= 0) {
      // Allow scrolling backwards loop
      container.scrollLeft += oneSetWidth;
    }
  };

  const handleRegionClick = (id: string) => {
    setActiveRegion(id);
    // Removed auto-centering scroll to avoid fighting with auto-scroll and user drag
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsAutoScrolling(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsAutoScrolling(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll-fast factor

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
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
        <div className="relative w-full px-4 sm:px-12">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-4 px-2 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onScroll={handleScroll}
          >
            {/* Triple the regions to create seamless loop buffer */}
            {[...siteConfig.regions, ...siteConfig.regions, ...siteConfig.regions].map(
              (region, index) => {
                const isSelected = activeRegion === region.id;

                return (
                  <button
                    key={`${region.id}-${index}`}
                    className={`
                      shrink-0 px-3 sm:px-6 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-300 border font-pixel whitespace-nowrap
                      ${
                        isSelected
                          ? "bg-primary text-black border-primary scale-105 shadow-[0_0_15px_rgba(140,216,18,0.4)]"
                          : "bg-black/40 text-default-400 border-white/10 hover:border-primary/50 hover:text-white"
                      }
                    `}
                    data-region-id={region.id}
                    onClick={() => handleRegionClick(region.id)}
                  >
                    {region.name}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center mt-12 px-4">
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

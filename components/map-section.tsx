"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, MapPin, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";

export function MapSection() {
  const [activeRegion, setActiveRegion] = useState("astana");
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeData = siteConfig.regions.find((r) => r.id === activeRegion) || siteConfig.regions[0];

  const handleRegionClick = (id: string) => {
    setActiveRegion(id);
    // Scroll slider to button
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-pixel">
              Nationwide
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-pixel">
            Hack From <span className="text-gradient">Your City</span>
          </h2>
          <p className="text-default-400 text-base sm:text-lg max-w-xl mx-auto font-pixel">
            Join{" "}
            <span className="text-primary">
              Decentrathon <span className="font-sans">5.0</span>
            </span>{" "}
            from your city. Connected nationwide. Competing as one.
          </p>
        </motion.div>

        {/* Map and Card Container */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center mb-12">
          {/* Detailed SVG Map */}
          <motion.div
            className="relative w-full aspect-[1000/550] bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl p-4 sm:p-8 overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <svg
              className="w-full h-full drop-shadow-[0_0_20px_rgba(140,216,18,0.1)]"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 685 383"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="siteConfig.regions">
                {siteConfig.regions.map((region) => {
                  // Exclude 'almatys' from map rendering as it shares path with 'almaty'
                  if (region.id === "almatys") return null;

                  const isActive =
                    activeRegion === region.id ||
                    (activeRegion === "almatys" && region.id === "almaty");

                  return (
                    <motion.path
                      key={region.id}
                      animate={{
                        fill: isActive ? "rgba(140, 216, 18, 0.4)" : "transparent",
                        stroke: isActive ? "#8cd812" : "rgba(140, 216, 18, 0.3)",
                        strokeWidth: isActive ? 3 : 1.5,
                        scale: isActive ? 1.02 : 1,
                        filter: isActive ? "drop-shadow(0 0 10px rgba(140, 216, 18, 0.5))" : "none",
                      }}
                      className="cursor-pointer hover:fill-primary/20 hover:stroke-primary"
                      d={region.path}
                      initial={{
                        fill: "transparent",
                        stroke: "rgba(140, 216, 18, 0.3)",
                        strokeWidth: 1.5,
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleRegionClick(region.id)}
                    />
                  );
                })}
              </g>
            </svg>
          </motion.div>

          {/* City Card */}
          <div className="relative h-full min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-md bg-black/40 backdrop-blur-md border-2 border-primary rounded-xl overflow-hidden shadow-[0_0_30px_rgba(102,43,177,0.2)]"
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {/* Placeholder image logic - using external placeholder service as discussed */}
                  <Image
                    fill
                    alt={activeData.name}
                    className="object-cover transition-transform duration-700 hover:scale-110"
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
                    Open in 2GIS
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
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
                            shrink-0 px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300 snap-center border font-pixel
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-content1 rounded-full border border-white/10 text-default-500 hover:text-white hover:bg-primary hover:border-primary transition-colors"
            onClick={() => scrollSlider("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

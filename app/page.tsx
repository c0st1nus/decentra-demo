"use client";

import { useState, useCallback } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { MapPin, Zap, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

import { Footer } from "@/components/footer";
import { SpaceBg } from "@/components/space-bg";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { CountdownTimer } from "@/components/countdown-timer";
import { TerminalInput } from "@/components/terminal-input";

// Dynamic imports for below-fold sections — reduces initial JS bundle
const MapSection = dynamic(() => import("@/components/map-section").then((mod) => mod.MapSection), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black/20 animate-pulse" />,
});
const SolanaDaySection = dynamic(
  () => import("@/components/solana-day-section").then((mod) => mod.SolanaDaySection),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-black/20 animate-pulse" />,
  },
);
const TracksSection = dynamic(
  () => import("@/components/tracks-section").then((mod) => mod.TracksSection),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-black/20 animate-pulse" />,
  },
);
const HighlightsSection = dynamic(
  () => import("@/components/highlights-section").then((mod) => mod.HighlightsSection),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-black/20 animate-pulse" />,
  },
);
const PartnersSection = dynamic(
  () => import("@/components/partners-section").then((mod) => mod.PartnersSection),
  {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-black/20 animate-pulse" />,
  },
);
const AboutSection = dynamic(
  () => import("@/components/about-section").then((mod) => mod.AboutSection),
  {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-black/20 animate-pulse" />,
  },
);
const FaqSection = dynamic(() => import("@/components/faq-section").then((mod) => mod.FaqSection), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-black/20 animate-pulse" />,
});

type Phase = "title" | "version" | "done";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("title");
  const handleTitleComplete = useCallback(() => setPhase("version"), []);
  const handleVersionComplete = useCallback(() => setPhase("done"), []);

  return (
    <>
      <SpaceBg />
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] py-20 px-4 gap-6 sm:gap-8 overflow-hidden">
        {/* Floating badge */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-xs font-mono text-primary uppercase tracking-tighter font-pixel">
            {siteConfig.heroLabels.locations[useLanguage().languageIndex]}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-gradient text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight font-pixel flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            <TerminalInput
              delay={0.5}
              showCursor={phase === "title"}
              speed={100}
              text="Decentrathon 5.0"
              onComplete={handleTitleComplete}
            />
          </h1>
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-[10px] sm:text-base text-default-400 leading-relaxed font-pixel"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {siteConfig.description[useLanguage().languageIndex]}
        </motion.p>

        {/* Countdown */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
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
          <Button
            isExternal
            as={Link}
            className="text-sm sm:text-lg font-bold font-pixel px-8 sm:px-10 h-12 sm:h-14 border-default-200/50 hover:border-primary/50 transition-colors"
            href={siteConfig.links.telegram}
            radius="full"
            size="lg"
            startContent={<MessageCircle className="w-5 h-5" />}
            variant="bordered"
          >
            {siteConfig.heroLabels.telegram[useLanguage().languageIndex]}
          </Button>
        </motion.div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
      </section>

      <div className="section-divider" />
      <MapSection />
      <div className="section-divider" />
      <SolanaDaySection />
      <div className="section-divider" />
      <TracksSection />
      <div className="section-divider" />
      <HighlightsSection />
      <div className="section-divider" />
      <PartnersSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <FaqSection />
      <Footer />
    </>
  );
}

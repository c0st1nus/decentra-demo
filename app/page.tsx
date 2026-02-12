"use client";

import { useState, useCallback } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";
import { ParticleGrid } from "@/components/particle-grid";
import { siteConfig } from "@/config/site";
import { CountdownTimer } from "@/components/countdown-timer";
import { TerminalInput } from "@/components/terminal-input";
import { MapSection } from "@/components/map-section";
import { TracksSection } from "@/components/tracks-section";
import { Footer } from "@/components/footer";


type Phase = "title" | "version" | "done";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("title");
  const handleTitleComplete = useCallback(() => setPhase("version"), []);
  const handleVersionComplete = useCallback(() => setPhase("done"), []);

  return (
    <>
      <ParticleGrid />
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] py-20 px-4 gap-8 overflow-hidden">
        {/* Floating badge */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-mono text-primary/80 tracking-wide">
            20+ cities • Offline
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight font-pixel leading-tight">
            <span className="text-gradient">
              <TerminalInput
                text="Decentrathon"
                speed={100}
                delay={0.5}
                showCursor={phase === "title"}
                onComplete={handleTitleComplete}
              />
            </span>
            <br />
            <span className="text-foreground font-sans">
              {phase !== "title" && (
                <TerminalInput
                  text="5.0"
                  speed={130}
                  showCursor={phase === "version"}
                  onComplete={handleVersionComplete}
                />
              )}
            </span>
          </h1>
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-base sm:text-lg text-default-400 leading-relaxed font-pixel"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Kazakhstan&apos;s national hackathon returns, baby.{" "}
          <span className="font-medium text-primary">Built for builders.</span> Back on a national
          scale.
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
            className="text-base font-semibold px-8 glow-primary font-pixel"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="lg"
            startContent={<Zap className="w-4 h-4" />}
            variant="shadow"
          >
            Register Now
          </Button>
          <Button
            isExternal
            as={Link}
            className="text-base font-medium font-pixel px-8 border-default-200/50 hover:border-primary/50 transition-colors"
            href={siteConfig.links.telegram}
            radius="full"
            size="lg"
            variant="bordered"
          >
            Join Our Community
          </Button>
        </motion.div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
      </section>

      <div className="section-divider" />
      <MapSection />
      <div className="section-divider" />
      <TracksSection />
      <Footer />
    </>
  );
}

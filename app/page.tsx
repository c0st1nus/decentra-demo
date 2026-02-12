"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";

import { siteConfig } from "@/config/site";
import { CountdownTimer } from "@/components/countdown-timer";
import { ParticleGrid } from "@/components/particle-grid";
import { MapSection } from "@/components/map-section";
import { TracksSection } from "@/components/tracks-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <ParticleGrid />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] py-20 px-4 gap-8 overflow-hidden">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-mono text-primary/80 tracking-wide">
            20+ cities • Offline
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight font-pixel">
            <span className="text-gradient">Decentrathon</span>
            <br />
            <span className="text-foreground font-sans">5.0</span>
          </h1>
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl text-base sm:text-lg text-default-400 leading-relaxed font-pixel"
        >
          Kazakhstan&apos;s national hackathon returns, baby.{" "}
          <span className="font-medium text-primary">Built for builders.</span>{" "}
          Back on a national scale.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Button
            as={Link}
            className="text-base font-semibold px-8 glow-primary font-pixel"
            color="primary"
            href={siteConfig.links.register}
            radius="full"
            size="lg"
            variant="shadow"
            startContent={<Zap className="w-4 h-4" />}
          >
            Register Now
          </Button>
          <Button
            as={Link}
            className="text-base font-medium font-pixel px-8 border-default-200/50 hover:border-primary/50 transition-colors"
            href={siteConfig.links.telegram}
            radius="full"
            size="lg"
            variant="bordered"
            isExternal
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

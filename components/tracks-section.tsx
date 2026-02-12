"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

import { TrackCard } from "@/components/track-card";
import { siteConfig } from "@/config/site";

export function TracksSection() {
    return (
        <section id="tracks" className="relative py-20 sm:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Cpu className="w-5 h-5 text-secondary" />
                        <span className="text-xs font-pixel text-secondary uppercase tracking-widest">
                            Industry-Backed
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-pixel">
                        Hack the system.{" "}
                        <br className="hidden sm:block" />
                        <span className="text-gradient">
                            Solve real industry challenges.
                        </span>
                    </h2>
                    <p className="text-default-400 text-base sm:text-lg max-w-xl mx-auto font-pixel">
                        Tracks are being finalized with our industry partners. Stay tuned
                        for the reveal.
                    </p>
                </motion.div>

                {/* Track Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {siteConfig.tracks.map((track, index) => (
                        <TrackCard key={index} title={track.title} index={index} description={track.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}

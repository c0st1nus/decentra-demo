"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import NextLink from "next/link";
import { Instagram, Linkedin, Send, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/context/language-provider";
import logoWithCaption from "@/public/images/logos/logo_with_caption.webp";
import depaLogo from "@/public/images/logos/logo_depa-team.webp";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { languageIndex } = useLanguage();
  const footer = siteConfig.footer;

  const socialIcons = {
    Instagram: Instagram,
    Telegram: Send,
    LinkedIn: Linkedin,
    BAITC: Globe,
  };

  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        {/* Left Column: Logo & Description */}
        <div className="flex flex-col gap-6 max-w-md">
          <NextLink className="flex justify-start items-start" href="/">
            <Image
              alt="Decentrathon Logo"
              className="h-10 w-auto object-contain"
              src={logoWithCaption}
            />
          </NextLink>
          <p className="text-sm sm:text-base text-default-400 leading-relaxed font-sans">
            {footer.description[languageIndex]}
          </p>
        </div>

        {/* Right Column: Contact & Socials */}
        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-col gap-1 md:items-end">
            <span className="text-sm text-default-400 font-pixel lowercase">
              {footer.reachOut[languageIndex]}
            </span>
            <Link
              isExternal
              className="text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors font-sans"
              href={`mailto:${footer.email}`}
            >
              {footer.email}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {footer.socials.map((social: any) => {
              const Icon = socialIcons[social.name as keyof typeof socialIcons] || Globe;

              return (
                <Link
                  key={social.name}
                  isExternal
                  aria-label={social.name}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:text-primary text-default-400 transition-all"
                  href={social.link}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-default-400">
        <span>© 2023-{new Date().getFullYear()} Decentrathon. All rights reserved.</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-default-400">Powered by</span>
          <PressableDepaLogo />
          <span className="text-white/20">|</span>
          <Link
            isExternal
            aria-label="Telegram"
            className="text-xs text-default-400 hover:text-primary transition-colors flex items-center gap-1"
            href="https://t.me/c0st1nus"
          >
            <span>c0st1nus</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function PressableDepaLogo() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      yPeak: number;
      rotation: number;
      duration: number;
    }[]
  >([]);

  const handlePress = () => {
    const id = Date.now() + Math.random();
    const duration = 2 + Math.random() * 2; // Random duration between 2s and 4s

    setParticles((prev) => [
      ...prev,
      {
        id,
        x: Math.random() * 300 - 150, // Random X direction (-150 to 150)
        yPeak: Math.random() * -150 - 50, // Random jump height (-50 to -200)
        rotation: Math.random() * 720 - 360, // Random rotation
        duration,
      },
    ]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, duration * 1000);
  };

  return (
    <button
      className="relative flex items-center gap-2 cursor-pointer select-none group bg-transparent border-none p-0"
      type="button"
      onClick={handlePress}
    >
      <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
        Depa Team
      </span>
      <Image alt="Depa Team" className="w-6 h-6 rounded-full object-cover" src={depaLogo} />
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 2.5, 1.5], // Scales up larger
              y: [0, particle.yPeak, particle.yPeak + 300], // Goes up, then falls down
              x: particle.x,
              rotate: particle.rotation,
            }}
            className="absolute left-1/2 top-1/2 pointer-events-none z-50 origin-center"
            initial={{ opacity: 0, scale: 0.5, y: 0, x: 0, rotate: 0 }}
            style={{ marginLeft: "-24px", marginTop: "-24px" }}
            transition={{
              duration: particle.duration,
              times: [0, 0.4, 1], // Timing of the keyframes
              ease: ["easeOut", "easeIn"], // Improve gravity feel
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-32 h-32 object-contain"
              src="/images/vectors/gif.webm"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </button>
  );
}

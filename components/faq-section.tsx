"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";

export function FaqSection() {
  const { languageIndex } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section className="relative py-20 sm:py-32 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-2">
            <HelpCircle className="w-5 h-5 text-secondary" />
            <span className="text-x font-pixel text-secondary uppercase tracking-widest origin-left tra">
              {siteConfig.faqSection.badge[languageIndex]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight font-pixel">
            <span className="text-gradient">FAQ</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {siteConfig.faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-t border-white/10">
                <button
                  aria-expanded={isOpen}
                  className="faq-trigger group flex w-full items-center justify-between gap-2 sm:gap-4 py-5 sm:py-6 text-left cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  <span className="text-[10px] sm:text-sm md:text-lg font-pixel font-medium text-foreground uppercase tracking-wide leading-snug origin-left">
                    {item.question[languageIndex]}
                  </span>

                  {/* +/× icon */}
                  <span className="faq-icon-wrapper relative flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-primary/30 transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary/10">
                    <span
                      className="block text-xl sm:text-2xl leading-none text-primary font-light select-none transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </span>
                </button>

                {/* Expandable answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="pb-6 text-sm sm:text-base text-white leading-relaxed max-w-2xl font-pixel">
                        {item.answer[languageIndex]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

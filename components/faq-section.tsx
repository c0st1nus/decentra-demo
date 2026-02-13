"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section className="relative py-20 sm:py-32 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-secondary" />
            <span className="text-xs font-pixel text-secondary uppercase tracking-widest">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-pixel">
            <span className="text-gradient">FAQ</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col">
          {siteConfig.faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <button
                  aria-expanded={isOpen}
                  className="faq-trigger group flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  <span className="text-sm sm:text-lg font-pixel font-medium text-foreground uppercase tracking-wide leading-snug">
                    {item.question}
                  </span>

                  {/* +/× icon */}
                  <span className="faq-icon-wrapper relative flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-primary/30 transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary/10">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="block text-xl sm:text-2xl leading-none text-primary font-light select-none"
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      +
                    </motion.span>
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
                      <p className="pb-6 text-sm sm:text-base text-default-400 leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

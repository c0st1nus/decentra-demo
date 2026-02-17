
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";
import { cn } from "@/lib/utils";

export const QuotesSection = () => {
  const { languageIndex } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden" id="quotes">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.quotes.map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
              className="group relative flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/40 mb-6 group-hover:text-primary transition-colors duration-300" />
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 flex-grow italic">
                  {quote.text[languageIndex]}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-300 shrink-0">
                    <Image
                      src={quote.image}
                      alt={quote.author[languageIndex]}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 font-pixel">
                      {quote.author[languageIndex]}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {quote.role[languageIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

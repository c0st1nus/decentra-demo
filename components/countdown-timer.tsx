"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EVENT_DATE = new Date(siteConfig.event_date);

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const distance = EVENT_DATE.getTime() - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-card rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            className="text-2xl sm:text-4xl font-sans font-bold text-primary tabular-nums"
            exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs font-pixel text-default-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="countdown-card rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px] flex items-center justify-center">
              <span className="text-2xl sm:text-4xl font-pixel font-bold text-primary/30 tabular-nums">
                --
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-pixel text-default-400 uppercase tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-4">
      <CountdownUnit label="Days" value={timeLeft.days} />
      <span className="text-2xl sm:text-4xl font-pixel text-primary/30 self-start mt-3 sm:mt-4">
        :
      </span>
      <CountdownUnit label="Hours" value={timeLeft.hours} />
      <span className="text-2xl sm:text-4xl font-pixel text-primary/30 self-start mt-3 sm:mt-4">
        :
      </span>
      <CountdownUnit label="Min" value={timeLeft.minutes} />
      <span className="text-2xl sm:text-4xl font-pixel text-primary/30 self-start mt-3 sm:mt-4">
        :
      </span>
      <CountdownUnit label="Sec" value={timeLeft.seconds} />
    </div>
  );
}

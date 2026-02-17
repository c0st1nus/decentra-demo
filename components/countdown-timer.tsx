"use client";

import { useState, useEffect } from "react";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/language-provider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EVENT_DATE = new Date(siteConfig.event_date.timer_date);

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
      <div className="countdown-card rounded-xl px-3 py-2 sm:px-6 sm:py-4 min-w-[56px] sm:min-w-[90px] flex items-center justify-center">
        <span className="text-2xl sm:text-4xl font-sans font-bold text-primary tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-pixel text-white uppercase tracking-widest">
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
      <div className="flex gap-2 sm:gap-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="countdown-card rounded-xl px-3 py-2 sm:px-6 sm:py-4 min-w-[56px] sm:min-w-[90px] flex items-center justify-center">
              <span className="text-2xl sm:text-4xl font-pixel font-bold text-primary/30 tabular-nums">
                --
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-pixel text-white uppercase tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 sm:gap-4">
        <CountdownUnit label="Days" value={timeLeft.days} />
        <span className="text-xl sm:text-4xl font-pixel text-primary/30 self-start mt-2 sm:mt-4">
          :
        </span>
        <CountdownUnit label="Hours" value={timeLeft.hours} />
        <span className="text-xl sm:text-4xl font-pixel text-primary/30 self-start mt-2 sm:mt-4">
          :
        </span>
        <CountdownUnit label="Min" value={timeLeft.minutes} />
        <span className="text-xl sm:text-4xl font-pixel text-primary/30 self-start mt-2 sm:mt-4">
          :
        </span>
        <CountdownUnit label="Sec" value={timeLeft.seconds} />
      </div>
      <h2 className="text-[10px] sm:text-xl font-pixel text-white uppercase tracking-widest mt-10">
        {siteConfig.event_date.caption[useLanguage().languageIndex]}
      </h2>
    </>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { motion, useInView } from "framer-motion";
import { Lock } from "lucide-react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>";

function useEncryptedText(finalText: string, duration: number = 2000, start: boolean = false) {
  const [text, setText] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;

    let iteration = 0;
    // const totalIterations = Math.floor(duration / 50);

    intervalRef.current = setInterval(() => {
      setText(
        finalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return finalText[index];

            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iteration += 1 / 3;

      if (iteration >= finalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(finalText);
        setIsResolved(true);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [finalText, duration, start]);

  return { text, isResolved };
}

interface TrackCardProps {
  title: string;
  index: number;
  description: string;
}

export function TrackCard({ title, index, description }: TrackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const { text, isResolved } = useEncryptedText(title, 3000 + index * 500, isInView);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card
        className="encrypted-shimmer bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300 group"
        shadow="none"
      >
        <CardHeader className="flex items-center justify-between px-6 pt-6 pb-2 font-pixel">
          <Chip
            className="bg-primary/10 text-primary text-[10px] font-pixel uppercase"
            size="sm"
            variant="flat"
          >
            Track {String(index + 1).padStart(2, "0")}
          </Chip>
          <Lock className="w-4 h-4 text-default-300 group-hover:text-primary/50 transition-colors" />
        </CardHeader>
        <CardBody className="px-6 pb-6 pt-2">
          <p
            className={`font-pixel text-lg sm:text-xl tracking-wide transition-colors duration-500 ${
              isResolved ? "text-foreground" : "text-primary/60"
            }`}
          >
            {text}
          </p>
          <p className="text-xs text-default-400 mt-3 font-pixel">
            {isResolved ? description : "Decrypting..."}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}

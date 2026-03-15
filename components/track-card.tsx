"use client";

import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import Image from "next/image";

import { parseStyledText } from "@/lib/parse-styled-text";

interface TrackCardProps {
  title: string;
  index: number;
  description: string;
  partner?: string;
  image?: string;
  secondaryImage?: string;
  titleClassName?: string;
  amount?: string;
}

export function TrackCard({
  title,
  index,
  description,
  image,
  secondaryImage,
  titleClassName,
  amount,
}: TrackCardProps) {
  return (
    <motion.div
      className="overflow-visible"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card
        className="relative overflow-visible bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300 group"
        shadow="none"
      >
        <div className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-black/90 font-pixel text-xs text-primary shadow-[0_0_18px_rgba(140,216,18,0.12)] backdrop-blur-sm">
          {index + 1}
        </div>
        <CardBody className="px-6 py-6">
          <div className="flex min-h-[2.5rem] items-center sm:min-h-[3rem]">
            <p
              className={`font-pixel text-base leading-tight tracking-wide whitespace-normal break-words sm:text-lg md:text-xl ${titleClassName || "text-default-500"}`}
            >
              {title}
            </p>
          </div>
          {amount && (
            <p className="mt-3 font-pixel text-sm text-white sm:text-base">
              {parseStyledText(amount, "text-gradient")}
            </p>
          )}
          <p className="mt-3 text-xs text-white font-pixel sm:text-sm">{description}</p>
          {(image || secondaryImage) && (
            <>
              <div
                className={`mt-5 flex flex-wrap items-center gap-4 sm:hidden ${
                  secondaryImage ? "justify-start" : "justify-start"
                }`}
              >
                {image && (
                  <div className="relative h-8 w-[140px] max-w-[42vw]">
                    <Image fill alt={title} className="object-contain object-left" src={image} />
                  </div>
                )}
                {secondaryImage && (
                  <div className="relative h-7 w-[120px] max-w-[36vw]">
                    <Image
                      fill
                      alt={`${title} secondary`}
                      className="object-contain object-left opacity-85"
                      src={secondaryImage}
                    />
                  </div>
                )}
              </div>
              <div
                className={`mt-5 hidden sm:grid sm:justify-start sm:gap-3 ${
                  secondaryImage ? "sm:grid-cols-2" : "sm:grid-cols-1"
                }`}
              >
                {image && (
                  <div className="flex w-fit max-w-full items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <div className="relative h-12 w-[220px]">
                      <Image fill alt={title} className="object-contain object-left" src={image} />
                    </div>
                  </div>
                )}
                {secondaryImage && (
                  <div className="flex w-fit max-w-full items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <div className="relative h-10 w-[180px]">
                      <Image
                        fill
                        alt={`${title} secondary`}
                        className="object-contain object-left opacity-85"
                        src={secondaryImage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}

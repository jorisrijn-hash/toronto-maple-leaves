"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { assets } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export function TeamBanner({
  forwards,
  defence,
  goalies,
}: {
  forwards: number;
  defence: number;
  goalies: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);

  const stats = [
    { value: forwards, label: "Forwards" },
    { value: defence, label: "Defence" },
    { value: goalies, label: "Goaltenders" },
  ];

  return (
    <section ref={ref} className="relative flex min-h-[72vh] items-end overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image
          src={assets.celebration}
          alt="Toronto Maple Leafs roster celebrating"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#05132b_6%,rgba(5,19,43,0.5)_50%,rgba(5,19,43,0.35)_100%)]" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue"
        >
          2025-26 · Active roster
        </motion.p>

        <WordReveal
          text="The Roster"
          className="font-display text-[15vw] leading-[0.88] text-white sm:text-8xl lg:text-[8rem]"
        />

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-7"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-4xl text-white md:text-5xl">
                <AnimatedCounter value={s.value} />
              </dd>
              <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/60">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

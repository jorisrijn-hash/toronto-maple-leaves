"use client";

import { motion } from "framer-motion";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE_OUT } from "@/lib/motion";

export function TeamHeader({
  forwards,
  defence,
  goalies,
}: {
  forwards: number;
  defence: number;
  goalies: number;
}) {
  const stats = [
    { value: forwards, label: "Forwards" },
    { value: defence, label: "Defence" },
    { value: goalies, label: "Goaltenders" },
  ];

  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(0,72,141,0.28),rgba(5,19,43,0)_60%)]" />
      <div className="ice-grooves absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
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
          className="font-display text-[16vw] leading-[0.86] text-white sm:text-8xl lg:text-[9rem]"
        />

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-7"
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

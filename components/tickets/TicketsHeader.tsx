"use client";

import { motion } from "framer-motion";
import { WordReveal } from "@/components/ui/WordReveal";
import { EASE_OUT } from "@/lib/motion";

export function TicketsHeader() {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(0,72,141,0.3),rgba(5,19,43,0)_60%)]" />
      <div className="ice-grooves absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue"
        >
          Scotiabank Arena · 2026-27
        </motion.p>

        <WordReveal
          text="Get in the building"
          className="max-w-4xl font-display text-[13vw] leading-[0.86] text-white sm:text-8xl lg:text-[8rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
          className="mt-6 max-w-xl text-lg text-frost/75"
        >
          Single game seats, premium suites and season memberships. Everything you
          need to be there when the puck drops.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/icons";
import { EASE_OUT } from "@/lib/motion";

export function McKennaBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(130%_140%_at_100%_0%,#0f4c9a_0%,#00307a_38%,#041634_100%)]"
    >
      <div className="ice-grooves absolute inset-0 opacity-25" />
      {/* glow */}
      <div className="pointer-events-none absolute -right-10 top-1/2 h-[130%] w-2/3 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(99,179,255,0.25),transparent)]" />

      <div className="relative grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ice-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-goal-red" />
            Draft 26 · Just dropped
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Toronto Maple Leafs
            <span className="block text-ice-blue">Select · Gavin McKenna</span>
          </h2>
          <p className="mt-4 max-w-md text-frost/75">
            The number one pick, immortalised. Autograph-model pucks, lockup caps and
            limited Select gear, only while it lasts.
          </p>
          <button className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]">
            Shop the collection
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="relative h-56 md:h-72">
          <Image
            src="/shop/mckenna-banner.png"
            alt="Toronto Maple Leafs Select Gavin McKenna collection"
            fill
            sizes="(max-width: 768px) 90vw, 520px"
            className="object-contain object-center drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
}

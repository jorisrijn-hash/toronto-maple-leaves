"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sponsors } from "@/lib/sponsors";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

export function Sponsors({ compact = false }: { compact?: boolean }) {
  const premier = sponsors.filter((s) => s.tier === "premier");
  const official = sponsors.filter((s) => s.tier === "official");

  return (
    <section className={compact ? "" : "mx-auto max-w-7xl px-5 py-16 md:px-8"}>
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/50">
          Official partners
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3"
      >
        {premier.map((s) => (
          <motion.a
            key={s.name}
            variants={revealItem}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
          >
            {s.logo ? (
              <Image src={s.logo} alt={s.name} width={140} height={36} className="h-8 w-auto object-contain opacity-90" />
            ) : (
              <span className="font-display text-xl leading-none text-white">{s.name}</span>
            )}
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ice-blue">
              {s.role}
            </span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {official.map((s) => (
          <motion.a
            key={s.name}
            variants={revealItem}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.role}
            className="group flex items-center justify-center rounded-lg border border-white/8 bg-white/[0.02] px-4 py-4 text-center transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            {s.logo ? (
              <Image src={s.logo} alt={s.name} width={110} height={28} className="h-6 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100" />
            ) : (
              <span className="text-sm font-medium text-frost/70 transition-colors group-hover:text-white">
                {s.name}
              </span>
            )}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

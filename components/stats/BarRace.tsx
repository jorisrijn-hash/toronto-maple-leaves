"use client";

import { motion } from "framer-motion";
import type { Skater } from "@/lib/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

// Horizontal scoring race. Each bar grows from the left (scaleX) on scroll-in, split
// into goals (solid) and assists (translucent). Staggered so it reads as a "race".
export function BarRace({ data }: { data: Skater[] }) {
  const max = Math.max(...data.map((d) => d.p));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-2xl text-white">Scoring race</h3>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-frost/60">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-ice-blue" /> Goals
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-ice-blue/30" /> Assists
          </span>
        </div>
      </div>

      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-3.5"
      >
        {data.map((s) => {
          const width = (s.p / max) * 100;
          const goalShare = (s.g / s.p) * 100;
          return (
            <motion.li
              key={s.name}
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
              }}
              className="grid grid-cols-[1.4rem_9rem_1fr_auto] items-center gap-3 md:grid-cols-[1.6rem_11rem_1fr_auto] md:gap-4"
            >
              <span className="font-mono text-xs text-frost/55">{String(s.rank).padStart(2, "0")}</span>
              <span className="truncate text-sm font-medium text-white">
                {s.name}
                <span className="ml-1.5 font-mono text-[10px] text-ice-blue/70">{s.pos}</span>
              </span>

              <div className="h-6 w-full overflow-hidden rounded-md bg-white/[0.04]">
                <motion.div
                  className="flex h-full origin-left overflow-hidden rounded-md"
                  style={{ width: `${width}%` }}
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT } },
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#00488D] to-ice-blue"
                    style={{ width: `${goalShare}%`, boxShadow: "0 0 12px rgba(99,179,255,0.45)" }}
                  />
                  <div className="h-full flex-1 bg-ice-blue/25" />
                </motion.div>
              </div>

              <span className="w-10 text-right font-mono text-sm font-semibold text-white">
                <AnimatedCounter value={s.p} duration={900} />
              </span>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}

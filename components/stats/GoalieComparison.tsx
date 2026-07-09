"use client";

import { motion } from "framer-motion";
import type { Goalie } from "@/lib/stats";
import { RadialStat } from "@/components/stats/RadialStat";
import { EASE_OUT, sectionLift, revealContainer, VIEWPORT } from "@/lib/motion";

// SV% mapped onto an .850–.930 scale so the dials read as a meaningful gauge rather
// than three near-full rings. Below each dial: a saves-vs-goals-against shot bar.
const FLOOR = 0.85;
const CEIL = 0.93;

export function GoalieComparison({ data }: { data: Goalie[] }) {
  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="depth-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {data.map((g) => {
        const savePctPct = (g.sv / g.sa) * 100;
        return (
          <motion.article
            key={g.name}
            variants={sectionLift}
            className="depth-card depth-layer rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-pop"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl text-white">{g.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-frost/55">
                  {g.gp} GP · {g.w}-{g.l}-{g.otl}
                </p>
              </div>
              <RadialStat
                value={g.svPct - FLOOR}
                max={CEIL - FLOOR}
                size={92}
                stroke={9}
                center={
                  <span className="font-mono text-lg font-semibold text-white">
                    {g.svPct.toFixed(3).replace(/^0/, "")}
                  </span>
                }
                label="SV%"
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-frost/55">
                <span>{g.sa} shots against</span>
                <span className="text-white">{g.gaa.toFixed(2)} GAA</span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full bg-ice-blue"
                  style={{ boxShadow: "0 0 10px rgba(99,179,255,0.5)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${savePctPct}%` }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1, ease: EASE_OUT }}
                />
                <div className="h-full flex-1 bg-goal-red/80" />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-frost/50">
                <span className="text-ice-blue">{g.sv} SV</span>
                <span className="text-goal-red/90">{g.ga} GA</span>
              </div>
            </div>
          </motion.article>
        );
      })}

      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.6;
          filter: blur(2px);
        }
        .depth-group :global(.depth-card:hover) {
          opacity: 1;
          filter: blur(0);
          transform: translateY(-4px);
          z-index: 10;
        }
        @media (hover: none) {
          .depth-group:hover :global(.depth-card) {
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

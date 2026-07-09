"use client";

import { motion } from "framer-motion";
import { RadialStat } from "@/components/stats/RadialStat";
import { TiltCard } from "@/components/ui/TiltCard";
import { leaders } from "@/lib/stats";
import { sectionLift, revealContainer, VIEWPORT } from "@/lib/motion";

export function LeadersSpotlight() {
  const cards = [
    {
      kicker: "Points leader",
      name: leaders.points.name,
      sub: `${leaders.points.g} G · ${leaders.points.a} A · ${leaders.points.gp} GP`,
      value: leaders.points.p,
      max: 90,
      big: String(leaders.points.p),
      unit: "PTS",
    },
    {
      kicker: "Goals leader",
      name: leaders.goals.name,
      sub: `${leaders.goals.gp} GP · ${leaders.goals.ppg} PPG`,
      value: leaders.goals.g,
      max: 40,
      big: String(leaders.goals.g),
      unit: "G",
    },
    {
      kicker: "Save % leader",
      name: leaders.savePct.name,
      sub: `${leaders.savePct.gp} GP · ${leaders.savePct.gaa.toFixed(2)} GAA`,
      value: leaders.savePct.svPct - 0.85,
      max: 0.08,
      big: leaders.savePct.svPct.toFixed(3).replace(/^0/, ""),
      unit: "SV%",
    },
  ];

  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid gap-5 md:grid-cols-3"
    >
      {cards.map((c) => (
        <motion.div key={c.kicker} variants={sectionLift}>
          <TiltCard max={10}>
            <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-pop [transform-style:preserve-3d]">
              <p
                className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ice-blue"
                style={{ transform: "translateZ(30px)" }}
              >
                {c.kicker}
              </p>
              <div style={{ transform: "translateZ(50px)" }}>
                <RadialStat
                  value={c.value}
                  max={c.max}
                  size={168}
                  stroke={13}
                  label={c.unit}
                  center={<span className="font-display text-5xl text-white">{c.big}</span>}
                />
              </div>
              <p className="mt-6 font-display text-2xl text-white" style={{ transform: "translateZ(30px)" }}>
                {c.name}
              </p>
              <p className="mt-1 font-mono text-[11px] text-frost/55" style={{ transform: "translateZ(20px)" }}>
                {c.sub}
              </p>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

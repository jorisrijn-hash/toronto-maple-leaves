"use client";

import { motion } from "framer-motion";
import type { Skater } from "@/lib/stats";
import { TiltCard } from "@/components/ui/TiltCard";
import { assets } from "@/lib/site";
import { sectionLift } from "@/lib/motion";

const POS_LABEL: Record<Skater["pos"], string> = {
  C: "Centre",
  LW: "Left Wing",
  RW: "Right Wing",
  D: "Defence",
};

export function PlayerCard({ player }: { player: Skater }) {
  return (
    <motion.div variants={sectionLift} className="depth-card depth-layer">
      <TiltCard max={11}>
        <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-pop [transform-style:preserve-3d]">
          {/* leaf watermark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.leaf}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-auto opacity-[0.06]"
          />
          {/* sheen on hover */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 [.depth-card:hover_&]:animate-sheen [.depth-card:hover_&]:opacity-100" />
          </span>

          <div className="relative flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
            <div className="flex items-start justify-between">
              <span className="rounded-full border border-ice-blue/30 bg-ice-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">
                {player.pos}
              </span>
              <span className="font-mono text-[11px] text-frost/35">
                #{String(player.rank).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="font-display text-6xl leading-none text-white">{player.p}</span>
              <span className="mb-1 font-mono text-xs uppercase tracking-wider text-ice-blue">Pts</span>
            </div>

            <h3 className="mt-4 font-display text-2xl leading-[0.95] text-white">{player.name}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-frost/45">
              {POS_LABEL[player.pos]}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-xs">
              <Stat label="GP" value={player.gp} />
              <Stat label="G" value={player.g} />
              <Stat label="A" value={player.a} />
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-base font-semibold text-white">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-frost/45">{label}</div>
    </div>
  );
}

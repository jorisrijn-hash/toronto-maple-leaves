"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Goalie } from "@/lib/stats";
import { TiltCard } from "@/components/ui/TiltCard";
import { assets } from "@/lib/site";
import { EASE_OUT, sectionLift, VIEWPORT } from "@/lib/motion";

export function GoalieCard({ goalie, onOpen }: { goalie: Goalie; onOpen?: () => void }) {
  const savePct = (goalie.sv / goalie.sa) * 100;
  return (
    <motion.div variants={sectionLift} className="depth-card depth-layer">
      <TiltCard max={11}>
        <article
          onClick={onOpen}
          role={onOpen ? "button" : undefined}
          tabIndex={onOpen ? 0 : undefined}
          onKeyDown={(e) => {
            if (onOpen && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onOpen();
            }
          }}
          className="relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-pop outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ice-blue [transform-style:preserve-3d]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.leaf}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-auto opacity-[0.06]"
          />
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 [.depth-card:hover_&]:animate-sheen [.depth-card:hover_&]:opacity-100" />
          </span>

          <div className="relative flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
            <div className="flex items-start justify-between">
              <span className="rounded-full border border-ice-blue/30 bg-ice-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">
                G
              </span>
              <span className="font-mono text-[11px] text-frost/55">
                #{String(goalie.rank).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-8 flex items-end justify-between gap-3">
              <div className="flex items-end gap-2">
                <span className="font-display text-6xl leading-none text-white">
                  {goalie.svPct.toFixed(3).replace(/^0/, "")}
                </span>
                <span className="mb-1 font-mono text-xs uppercase tracking-wider text-ice-blue">Sv%</span>
              </div>
              {goalie.photo && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/90 to-frost/70 shadow-lg">
                  <Image src={goalie.photo} alt={goalie.name} fill sizes="80px" className="object-cover object-top" />
                </div>
              )}
            </div>

            <h3 className="mt-4 font-display text-2xl leading-[0.95] text-white">{goalie.name}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-frost/60">
              {goalie.w}-{goalie.l}-{goalie.otl} · {goalie.gaa.toFixed(2)} GAA
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wider text-frost/60">
                <span>{goalie.gp} GP</span>
                <span>{goalie.sa} shots</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full bg-ice-blue"
                  style={{ boxShadow: "0 0 10px rgba(99,179,255,0.5)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${savePct}%` }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1, ease: EASE_OUT }}
                />
              </div>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

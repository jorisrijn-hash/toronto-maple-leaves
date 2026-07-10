"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Skater } from "@/lib/stats";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
import { assets } from "@/lib/site";
import { sectionLift, EASE_OUT } from "@/lib/motion";

const POS_LABEL: Record<Skater["pos"], string> = {
  C: "Centre",
  LW: "Left Wing",
  RW: "Right Wing",
  D: "Defence",
};

export function PlayerCard({ player }: { player: Skater }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  function enter() {
    timer.current = window.setTimeout(() => setOpen(true), 320);
  }
  function leave() {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  }

  return (
    <motion.div
      variants={sectionLift}
      className="depth-card depth-layer"
      style={{ zIndex: open ? 20 : undefined }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <TiltCard max={open ? 0 : 11} disabled={open}>
        <article
          data-open={open}
          className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-pop transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] data-[open=true]:scale-[1.06] data-[open=true]:shadow-[0_40px_80px_-24px_rgba(0,12,40,0.9)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.leaf}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-auto opacity-[0.06]"
          />

          <div className="relative flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
            <div className="flex items-start justify-between">
              <span className="rounded-full border border-ice-blue/30 bg-ice-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">
                {player.pos}
              </span>
              <span className="font-mono text-[11px] text-frost/35">
                #{String(player.rank).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-8 flex items-end justify-between gap-3">
              <div className="flex items-end gap-2">
                <span className="font-display text-6xl leading-none text-white">{player.p}</span>
                <span className="mb-1 font-mono text-xs uppercase tracking-wider text-ice-blue">Pts</span>
              </div>
              {player.photo && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/90 to-frost/70 shadow-lg">
                  <Image
                    src={player.photo}
                    alt={player.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>
              )}
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

          {/* Hover-intent stat sheet */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 6 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(180deg,rgba(0,32,91,0.92),rgba(5,19,43,0.97))] p-6 backdrop-blur-sm"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-3">
                  {player.photo && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/80">
                      <Image src={player.photo} alt={player.name} fill sizes="48px" className="object-cover object-top" />
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">
                      {POS_LABEL[player.pos]} · 2025-26
                    </p>
                    <h3 className="mt-1 font-display text-2xl leading-none text-white">{player.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <BigStat label="GP" value={player.gp} />
                  <BigStat label="G" value={player.g} />
                  <BigStat label="A" value={player.a} />
                </div>

                <div className="flex items-end justify-between border-t border-white/15 pt-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-frost/60">Points</span>
                  <span className="font-display text-4xl leading-none text-white">
                    <CountUp value={player.p} />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

function BigStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] py-3 text-center">
      <div className="font-display text-3xl leading-none text-white">
        <CountUp value={value} />
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ice-blue">{label}</div>
    </div>
  );
}

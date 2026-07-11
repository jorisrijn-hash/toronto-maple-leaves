"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { RosterPlayer } from "@/lib/players";
import { POS_LABEL, playerBlurb } from "@/lib/players";
import { assets } from "@/lib/site";
import { EASE_DRAWER } from "@/lib/motion";
import { ArrowRightIcon } from "@/components/ui/icons";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
      <div className="font-display text-2xl leading-none text-white">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ice-blue">{label}</div>
    </div>
  );
}

export function PlayerDrawer({
  player,
  onClose,
}: {
  player: RosterPlayer | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!player) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [player, onClose]);

  return (
    <AnimatePresence>
      {player && (
        <motion.div className="fixed inset-0 z-drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ice-void/70 backdrop-blur-sm" onClick={onClose} />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_DRAWER }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ice-void"
          >
            {/* header with photo */}
            <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(120%_120%_at_80%_-10%,rgba(0,72,141,0.5),rgba(5,19,43,0.2))] p-6 pt-7">
              <button
                onClick={onClose}
                aria-label="Close player details"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-frost/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>

              <div className="flex items-end gap-4">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                  {player.photo ? (
                    <Image src={player.photo} alt={player.name} fill sizes="112px" className="object-cover object-top" />
                  ) : (
                    <div className="grid h-full place-items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={assets.leaf} alt="" className="h-14 opacity-30" />
                    </div>
                  )}
                </div>
                <div className="pb-1">
                  {player.number != null && (
                    <div className="font-display text-5xl leading-none text-white/90">#{player.number}</div>
                  )}
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">
                    {player.kind === "goalie" ? "Goaltender" : POS_LABEL[player.pos]}
                  </div>
                </div>
              </div>

              <h2 className="mt-4 font-display text-3xl leading-tight text-white">{player.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-frost/60">2025-26 season</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {player.kind === "skater" ? (
                  <>
                    <Stat label="GP" value={player.gp} />
                    <Stat label="G" value={player.g} />
                    <Stat label="A" value={player.a} />
                    <Stat label="PTS" value={player.p} />
                    <Stat label="+/-" value={(player.plusMinus > 0 ? "+" : "") + player.plusMinus} />
                    <Stat label="PIM" value={player.pim} />
                  </>
                ) : (
                  <>
                    <Stat label="GP" value={player.gp} />
                    <Stat label="W" value={player.w} />
                    <Stat label="L" value={player.l} />
                    <Stat label="SV%" value={player.svPct.toFixed(3).replace(/^0/, "")} />
                    <Stat label="GAA" value={player.gaa.toFixed(2)} />
                    <Stat label="SO" value={player.otl} />
                  </>
                )}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-frost/70">{playerBlurb(player)}</p>
            </div>

            <div className="border-t border-white/10 p-6">
              <Link
                href={`/team/${player.slug}`}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
              >
                View full profile
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

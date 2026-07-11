"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/schedule";
import { assets } from "@/lib/site";
import { sectionLift } from "@/lib/motion";

export function GameCard({ game }: { game: Game }) {
  return (
    <motion.article
      variants={sectionLift}
      className="depth-card depth-layer group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-pop transition-colors hover:border-white/25"
    >
      <Link href={`/match/${game.id}`} className="absolute inset-0 z-10" aria-label={`Match centre: Leafs vs ${game.opponent}`} />
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">
            {game.weekday}
          </div>
          <div className="mt-1 font-display text-4xl leading-none text-white">{game.day}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-frost/45">
            {game.month}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-4 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assets.leaf} alt="" width={36} height={40} className="h-9 w-auto" />
          <span className="font-mono text-xs text-frost/40">vs</span>
          <span className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/15">
            <Image src={game.logo} alt={game.opponent} fill sizes="40px" className="object-cover" />
          </span>
        </div>

        <span
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
            game.home
              ? "border border-ice-blue/30 bg-ice-blue/10 text-ice-blue"
              : "border border-white/15 text-frost/60"
          }`}
        >
          {game.home ? "Home" : "Away"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <div className="text-sm font-medium text-white">{game.opponent}</div>
          <div className="mt-0.5 font-mono text-[11px] text-frost/45">{game.venue}</div>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-frost/35 transition-colors group-hover:text-ice-blue">
          Match centre
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </motion.article>
  );
}

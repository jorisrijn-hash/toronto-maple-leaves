"use client";

import { motion } from "framer-motion";
import { standings, PLAYOFF_LINE } from "@/lib/standings";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

const COLS = ["GP", "W", "L", "OTL", "PTS", "GF", "GA", "DIFF"];

export function StandingsTable() {
  return (
    <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {/* header */}
      <div className="grid grid-cols-[2rem_1fr_repeat(4,2.2rem)] items-center gap-2 border-b border-white/10 px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-frost/60 sm:grid-cols-[2rem_1fr_repeat(8,2.4rem)_3.4rem]">
        <span>#</span>
        <span>Team</span>
        {COLS.map((c, i) => (
          <span key={c} className={`text-right ${i > 3 ? "hidden sm:block" : ""} ${i === 4 ? "text-white" : ""}`}>
            {c}
          </span>
        ))}
        <span className="hidden text-right sm:block">L10</span>
      </div>

      {standings.map((t) => {
        const diff = t.gf - t.ga;
        return (
          <motion.div
            key={t.abbr}
            variants={revealItem}
            className={`relative grid grid-cols-[2rem_1fr_repeat(4,2.2rem)] items-center gap-2 border-b border-white/5 px-3 py-3.5 text-sm transition-colors sm:grid-cols-[2rem_1fr_repeat(8,2.4rem)_3.4rem] ${
              t.us ? "bg-ice-blue/[0.07]" : "hover:bg-white/[0.02]"
            }`}
          >
            {/* playoff line */}
            {t.rank === PLAYOFF_LINE && (
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-goal-red/60 to-transparent" />
            )}
            <span className="font-mono text-frost/50">{t.rank}</span>
            <span className="flex items-center gap-3">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${
                  t.us ? "border-ice-blue/50 bg-ice-blue/15 text-ice-blue" : "border-white/15 bg-white/[0.03] text-frost/60"
                }`}
              >
                {t.abbr}
              </span>
              <span className={`truncate ${t.us ? "font-semibold text-white" : "text-frost/85"}`}>{t.name}</span>
            </span>
            <Cell>{t.gp}</Cell>
            <Cell>{t.w}</Cell>
            <Cell>{t.l}</Cell>
            <Cell>{t.otl}</Cell>
            <Cell className="font-semibold text-white">{t.pts}</Cell>
            <Cell hide>{t.gf}</Cell>
            <Cell hide>{t.ga}</Cell>
            <Cell hide className={diff >= 0 ? "text-emerald-300" : "text-goal-red-ink"}>
              {diff > 0 ? `+${diff}` : diff}
            </Cell>
            <span className="hidden text-right font-mono text-[11px] text-frost/50 sm:block">{t.l10}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Cell({ children, className = "", hide = false }: { children: React.ReactNode; className?: string; hide?: boolean }) {
  return (
    <span className={`text-right font-mono text-frost/70 ${hide ? "hidden sm:block" : ""} ${className}`}>{children}</span>
  );
}

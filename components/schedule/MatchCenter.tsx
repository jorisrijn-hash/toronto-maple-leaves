"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { MatchDetail } from "@/lib/matches";
import { lines, pairs, starter } from "@/lib/matches";
import { assets } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const TABS = ["Summary", "Lineups", "Boxscore"] as const;
type Tab = (typeof TABS)[number];

export function MatchCenter({ match }: { match: MatchDetail }) {
  const [tab, setTab] = useState<Tab>("Summary");
  const g = match.game;

  const daysAway = useMemo(() => {
    if (match.final) return 0;
    const diff = new Date(g.date).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
  }, [g.date, match.final]);

  return (
    <div>
      {/* scoreboard */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(120%_140%_at_50%_-20%,rgba(0,72,141,0.4),rgba(5,19,43,0.3))] p-8 md:p-10">
        <div className="ice-grooves absolute inset-0 opacity-20" />
        <div className="relative flex flex-col items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ice-blue">
            {g.home ? "Home" : "Away"} · {g.weekday} {g.month} {g.day} · {g.venue}
          </span>

          <div className="mt-6 flex w-full max-w-md items-center justify-between">
            <Team name="Toronto" logo={assets.leaf} isLeaf />
            {match.final && match.score ? (
              <div className="text-center">
                <div className="font-display text-6xl leading-none text-white">
                  {match.score.tor}<span className="mx-2 text-frost/30">-</span>{match.score.opp}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-goal-red">Final</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="font-display text-4xl leading-none text-white/80">VS</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">
                  {daysAway === 0 ? "Today" : `In ${daysAway} day${daysAway === 1 ? "" : "s"}`}
                </div>
              </div>
            )}
            <Team name={g.abbr} logo={g.logo} />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "text-ice-void" : "text-frost/60 hover:text-white"
            }`}
          >
            {tab === t && (
              <motion.span layoutId="matchtab" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.25, ease: EASE_OUT }} />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="mt-6"
        >
          {tab === "Summary" && <Summary match={match} />}
          {tab === "Lineups" && <Lineups />}
          {tab === "Boxscore" && <Boxscore match={match} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Team({ name, logo, isLeaf = false }: { name: string; logo: string; isLeaf?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-white/15 ${isLeaf ? "bg-rink-navy" : "bg-white/5"}`}>
        {isLeaf ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="Toronto" className="h-10 w-auto" />
        ) : (
          <Image src={logo} alt={name} fill sizes="64px" className="object-cover" />
        )}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-frost/60">{name}</span>
    </div>
  );
}

function Summary({ match }: { match: MatchDetail }) {
  if (match.final && match.scoring) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card title="Scoring summary">
          <ul className="divide-y divide-white/5">
            {match.scoring.map((s, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <span className="w-14 shrink-0 font-mono text-[11px] text-frost/45">P{s.period} · {s.time}</span>
                <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-mono ${s.team === "TOR" ? "bg-ice-blue/15 text-ice-blue" : "bg-white/10 text-frost/60"}`}>
                  {s.team === "TOR" ? "TOR" : match.game.abbr}
                </span>
                <span className="flex-1 text-sm text-white">
                  {s.scorer}
                  {s.assists.length > 0 && <span className="text-frost/50"> ({s.assists.join(", ")})</span>}
                </span>
                {s.strength !== "EV" && <span className="font-mono text-[10px] text-goal-red">{s.strength}</span>}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Three stars">
          <ol className="space-y-3">
            {match.stars?.map((st, i) => (
              <li key={st.name} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ice-blue/15 font-display text-sm text-ice-blue">{i + 1}</span>
                <span className="flex-1 text-sm text-white">{st.name}</span>
                <span className="font-mono text-xs text-frost/50">{st.line}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    );
  }

  // preview
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="The matchup">
        <p className="text-frost/75">
          The Maple Leafs {match.game.home ? "host" : "travel to face"} the {match.game.opponent} at {match.game.venue}.
          Puck drop time and broadcast details are to be announced.
        </p>
      </Card>
      <Card title="Recent meetings">
        <ul className="space-y-2 font-mono text-sm text-frost/60">
          <li className="flex justify-between"><span>Last meeting</span><span className="text-frost/80">TOR 4 · {match.game.abbr} 2</span></li>
          <li className="flex justify-between"><span>Season series</span><span className="text-frost/80">TBD</span></li>
          <li className="flex justify-between"><span>Venue</span><span className="text-frost/80">{match.game.venue}</span></li>
        </ul>
      </Card>
    </div>
  );
}

function Lineups() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card title="Projected forward lines">
        <div className="space-y-3">
          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 shrink-0 font-mono text-[11px] text-frost/40">L{i + 1}</span>
              <div className="flex flex-1 flex-wrap gap-2">
                {line.map((n) => (
                  <span key={n} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-frost/85">{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="space-y-6">
        <Card title="Defence pairs">
          <div className="space-y-3">
            {pairs.map((pair, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 shrink-0 font-mono text-[11px] text-frost/40">D{i + 1}</span>
                <div className="flex flex-1 flex-wrap gap-2">
                  {pair.map((n) => (
                    <span key={n} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-frost/85">{n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Starting goaltender">
          <span className="rounded-lg border border-ice-blue/30 bg-ice-blue/10 px-3 py-1.5 text-sm text-white">{starter}</span>
        </Card>
      </div>
    </div>
  );
}

function Boxscore({ match }: { match: MatchDetail }) {
  if (!match.final || !match.periods) {
    return (
      <Card title="Boxscore">
        <p className="text-frost/60">This game hasn&apos;t been played yet. The boxscore, shots and scoring will appear here after the final horn.</p>
      </Card>
    );
  }
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="By period">
        <table className="w-full text-sm">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-frost/45">
              <th className="text-left font-normal">Team</th>
              {match.periods.map((_, i) => (
                <th key={i} className="w-10 text-center font-normal">{i + 1}</th>
              ))}
              <th className="w-12 text-center font-normal text-white">T</th>
            </tr>
          </thead>
          <tbody>
            <Row team="TOR" per={match.periods.map((p) => p.tor)} total={match.score!.tor} us />
            <Row team={match.game.abbr} per={match.periods.map((p) => p.opp)} total={match.score!.opp} />
          </tbody>
        </table>
      </Card>
      <Card title="Team stats">
        <div className="space-y-4">
          <Compare label="Shots on goal" tor={match.shots!.tor} opp={match.shots!.opp} abbr={match.game.abbr} />
          <Compare label="Goals" tor={match.score!.tor} opp={match.score!.opp} abbr={match.game.abbr} />
        </div>
      </Card>
    </div>
  );
}

function Row({ team, per, total, us = false }: { team: string; per: number[]; total: number; us?: boolean }) {
  return (
    <tr className={`border-t border-white/5 ${us ? "text-white" : "text-frost/70"}`}>
      <td className="py-2.5 font-medium">{team}</td>
      {per.map((v, i) => (
        <td key={i} className="text-center font-mono">{v}</td>
      ))}
      <td className="text-center font-display text-lg">{total}</td>
    </tr>
  );
}

function Compare({ label, tor, opp, abbr }: { label: string; tor: number; opp: number; abbr: string }) {
  const total = tor + opp || 1;
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[11px] text-frost/50">
        <span className="text-white">{tor}</span>
        <span>{label}</span>
        <span>{opp}</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
        <div className="bg-ice-blue" style={{ width: `${(tor / total) * 100}%` }} />
        <div className="bg-white/25" style={{ width: `${(opp / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">{title}</h3>
      {children}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roster, getPlayer, POS_LABEL, playerBlurb } from "@/lib/players";
import { assets } from "@/lib/site";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { WordReveal } from "@/components/ui/WordReveal";

export function generateStaticParams() {
  return roster.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPlayer(params.slug);
  return { title: p ? p.name : "Player" };
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="font-display text-3xl leading-none text-white md:text-4xl">
        {typeof value === "number" ? <AnimatedCounter value={value} /> : value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ice-blue">{label}</div>
    </div>
  );
}

export default function PlayerPage({ params }: { params: { slug: string } }) {
  const player = getPlayer(params.slug);
  if (!player) notFound();

  const position = player.kind === "goalie" ? "Goaltender" : POS_LABEL[player.pos];

  return (
    <div className="pb-28">
      {/* hero */}
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_80%_-10%,rgba(0,72,141,0.4),rgba(5,19,43,0)_60%)]" />
        <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />
        {player.number != null && (
          <span className="pointer-events-none absolute right-2 top-16 -z-10 select-none font-display text-[42vw] leading-none text-white/[0.03] md:text-[24rem]">
            {player.number}
          </span>
        )}

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/team" className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-frost/60 transition-colors hover:text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            Roster
          </Link>

          <div className="grid items-end gap-8 md:grid-cols-[auto_1fr]">
            <div className="relative h-56 w-56 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/90 to-frost/60 shadow-2xl md:h-64 md:w-64">
              {player.photo ? (
                <Image src={player.photo} alt={player.name} fill sizes="256px" className="object-cover object-top" priority />
              ) : (
                <div className="grid h-full place-items-center bg-[radial-gradient(120%_120%_at_50%_0%,#0b3a75,#05132b)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assets.leaf} alt="" className="h-24 opacity-30" />
                </div>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-ice-blue/30 bg-ice-blue/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">
                  {position}
                </span>
                {player.number != null && (
                  <span className="font-mono text-sm text-frost/50">No. {player.number}</span>
                )}
              </div>
              <WordReveal
                text={player.name}
                className="font-display text-[12vw] leading-[0.9] text-white sm:text-6xl lg:text-7xl"
              />
              <p className="mt-5 max-w-2xl text-frost/75">{playerBlurb(player)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">2025-26 · Regular season</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {player.kind === "skater" ? (
            <>
              <StatCell label="Games" value={player.gp} />
              <StatCell label="Goals" value={player.g} />
              <StatCell label="Assists" value={player.a} />
              <StatCell label="Points" value={player.p} />
              <StatCell label="Plus / minus" value={(player.plusMinus > 0 ? "+" : "") + player.plusMinus} />
              <StatCell label="PIM" value={player.pim} />
              <StatCell label="Power-play G" value={player.ppg} />
              <StatCell label="Game winners" value={player.gwg} />
            </>
          ) : (
            <>
              <StatCell label="Games" value={player.gp} />
              <StatCell label="Wins" value={player.w} />
              <StatCell label="Losses" value={player.l} />
              <StatCell label="OT losses" value={player.otl} />
              <StatCell label="Save %" value={player.svPct.toFixed(3).replace(/^0/, "")} />
              <StatCell label="GAA" value={player.gaa.toFixed(2)} />
              <StatCell label="Shots against" value={player.sa} />
              <StatCell label="Saves" value={player.sv} />
            </>
          )}
        </div>

        {/* simple split viz */}
        {player.kind === "skater" && (
          <div className="mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/50">Goals vs assists</p>
            <Bar label="Goals" value={player.g} max={Math.max(player.g, player.a)} tone="bg-goal-red" />
            <Bar label="Assists" value={player.a} max={Math.max(player.g, player.a)} tone="bg-ice-blue" />
          </div>
        )}
      </section>
    </div>
  );
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex justify-between font-mono text-xs">
        <span className="text-frost/60">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

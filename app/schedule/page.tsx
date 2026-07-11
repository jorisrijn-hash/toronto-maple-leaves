import { WordReveal } from "@/components/ui/WordReveal";
import { Countdown } from "@/components/schedule/Countdown";
import { ScheduleGames } from "@/components/schedule/ScheduleGames";
import { scheduleMeta } from "@/lib/schedule";
import { latestResult } from "@/lib/matches";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/70">
          <span className="h-1.5 w-1.5 rounded-full bg-ice-blue" />
          {scheduleMeta.label}
        </div>
        <WordReveal
          text="The Season"
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
        <p className="mt-5 max-w-xl text-balance text-frost/75">
          A new era opens against the old rivals. Four split-squad games, two nights,
          before the 84-game run begins.
        </p>
      </header>

      {/* Latest result -> match centre */}
      <section className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <Link
          href={`/match/${latestResult.id}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25"
        >
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-goal-red/40 bg-goal-red/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-goal-red-ink">Final</span>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/leaf-white.svg" alt="" className="h-6 w-auto" />
              <span className="font-display text-2xl text-white">{latestResult.score!.tor}</span>
              <span className="text-frost/55">-</span>
              <span className="font-display text-2xl text-white">{latestResult.score!.opp}</span>
              <span className="relative h-6 w-6 overflow-hidden rounded"><Image src={latestResult.game.logo} alt={latestResult.game.opponent} fill sizes="24px" className="object-cover" /></span>
            </div>
            <span className="hidden font-mono text-[11px] text-frost/60 sm:inline">Latest result vs {latestResult.game.opponent}</span>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-frost/50 transition-colors group-hover:text-ice-blue">
            Match centre
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </Link>
      </section>

      {/* Opener countdown */}
      <section className="mx-auto mt-8 max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(0,72,141,0.3),rgba(5,19,43,0.4))] p-7 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">
                Countdown to puck drop
              </p>
              <h2 className="mt-3 max-w-md font-display text-3xl leading-tight text-white md:text-4xl">
                Leafs vs Canadiens, Sept 19
              </h2>
              <p className="mt-3 font-mono text-[11px] text-frost/50">
                Tickets on sale {scheduleMeta.ticketsOnSale}
              </p>
            </div>
            <Countdown />
          </div>
        </div>
      </section>

      {/* Games */}
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Fixtures</p>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">Pre-season slate</h2>
        </div>
        <ScheduleGames />
        <p className="mt-6 font-mono text-[11px] text-frost/55">{scheduleMeta.note}</p>
      </section>
    </div>
  );
}

import { WordReveal } from "@/components/ui/WordReveal";
import { Countdown } from "@/components/schedule/Countdown";
import { ScheduleGames } from "@/components/schedule/ScheduleGames";
import { scheduleMeta } from "@/lib/schedule";

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

      {/* Opener countdown */}
      <section className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
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
        <p className="mt-6 font-mono text-[11px] text-frost/40">{scheduleMeta.note}</p>
      </section>
    </div>
  );
}

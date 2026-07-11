import { WordReveal } from "@/components/ui/WordReveal";
import { StandingsTable } from "@/components/standings/StandingsTable";
import { standingsMeta } from "@/lib/standings";

export const metadata = { title: "Standings" };

export default function StandingsPage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">
          {standingsMeta.season} · {standingsMeta.division}
        </p>
        <WordReveal
          text="Standings"
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
      </header>

      <section className="mx-auto mt-12 max-w-4xl px-5 md:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <StandingsTable />
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-frost/40">
          <span className="inline-block h-2 w-6 rounded-full bg-gradient-to-r from-goal-red/60 to-transparent" />
          Top three clinch a divisional playoff berth. {standingsMeta.note}
        </div>
      </section>
    </div>
  );
}

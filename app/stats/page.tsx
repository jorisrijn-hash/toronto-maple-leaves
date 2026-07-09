import { WordReveal } from "@/components/ui/WordReveal";
import { LeadersSpotlight } from "@/components/stats/LeadersSpotlight";
import { BarRace } from "@/components/stats/BarRace";
import { SkaterTable } from "@/components/stats/SkaterTable";
import { GoalieComparison } from "@/components/stats/GoalieComparison";
import { GoalieTable } from "@/components/stats/GoalieTable";
import { TrophyRoom } from "@/components/stats/TrophyRoom";
import { skaters, goalies, statContext } from "@/lib/stats";

export const metadata = { title: "Stats" };

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">{title}</h2>
    </div>
  );
}

export default function StatsPage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/70">
          <span className="h-1.5 w-1.5 rounded-full bg-ice-blue" />
          {statContext.season} · {statContext.type}
        </div>
        <WordReveal
          text="By the numbers"
          className="font-display text-[13vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
        <p className="mt-5 max-w-xl text-balance text-frost/75">
          Skaters and goalies, read the way a broadcast HUD shows them, and the
          franchise ledger behind a century of blue and white.
        </p>
      </header>

      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <Heading kicker="Spotlight" title="Season leaders" />
        <LeadersSpotlight />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <BarRace data={skaters} />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <Heading kicker="Skaters" title="Scoring leaders" />
        <SkaterTable data={skaters} />
        <p className="mt-3 font-mono text-[11px] text-frost/40">
          Tap any column to sort. Data: {statContext.season} regular season.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <Heading kicker="Goalies" title="Between the pipes" />
        <GoalieComparison data={goalies} />
        <div className="mt-6">
          <GoalieTable data={goalies} />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <Heading kicker="Franchise" title="A century of silver" />
        <TrophyRoom />
      </section>
    </div>
  );
}

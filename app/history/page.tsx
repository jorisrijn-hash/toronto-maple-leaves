import Image from "next/image";
import { WordReveal } from "@/components/ui/WordReveal";
import { photoAlt, photoSrc } from "@/lib/photos";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HistoryTimeline } from "@/components/history/HistoryTimeline";
import { milestones, retiredNumbers } from "@/lib/history";
import { franchise } from "@/lib/stats";

export const metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(0,72,141,0.3),rgba(5,19,43,0)_60%)]" />
        <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Since 1917</p>
          <WordReveal
            text="Our history"
            className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
          />
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-7">
            <Stat value={2026 - franchise.founded} label="Years" />
            <Stat value={franchise.cups} label="Stanley Cups" />
            <Stat value={6} label="Original Six" />
          </div>

          <figure className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={photoSrc("outdoor", 1800)}
              alt={photoAlt("outdoor")}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-void via-ice-void/20 to-transparent" />
            <figcaption className="absolute bottom-5 left-6 right-6 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/70">
              It started outdoors, on frozen ice, with a puck and a stick.
            </figcaption>
          </figure>
        </div>
      </section>

      <HistoryTimeline milestones={milestones} />

      {/* Cups */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/50">Stanley Cup championships</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {franchise.cupYears.map((y) => (
            <span key={y} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-sm text-frost/80">
              {y}
            </span>
          ))}
        </div>
      </section>

      {/* Retired numbers */}
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/50">Honoured numbers</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {retiredNumbers.map((r) => (
            <div key={r.number} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className="font-display text-4xl leading-none text-white/90">{r.number}</span>
              <span className="text-sm text-frost/70">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Records */}
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/50">Franchise records</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {franchise.records.map((rec) => (
            <div key={rec.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div>
                <div className="text-sm text-white">{rec.holder}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-frost/60">
                  {rec.label}
                  {"note" in rec && rec.note ? ` · ${rec.note}` : ""}
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl text-white">{rec.value}</span>
                <span className="font-mono text-xs text-ice-blue">{rec.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <dd className="font-display text-4xl text-white md:text-5xl">
        <AnimatedCounter value={value} />
      </dd>
      <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/60">{label}</dt>
    </div>
  );
}

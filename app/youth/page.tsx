import Link from "next/link";
import Image from "next/image";
import { WordReveal } from "@/components/ui/WordReveal";
import { ProgramList } from "@/components/youth/ProgramList";
import { FaqAccordion } from "@/components/youth/FaqAccordion";
import { staff, safeguarding, resources, faq } from "@/lib/youth";
import { photoAlt, photoSrc } from "@/lib/photos";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Hockey Development",
  description:
    "Camps, clinics and coaching for young players. Ages 7 to 12, led by certified Hockey Development staff.",
};

function SectionRule({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/55">{label}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function YouthPage() {
  return (
    <div className="pb-28">
      {/* hero */}
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(0,72,141,0.35),rgba(5,19,43,0)_60%)]" />
        <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Hockey Development</p>
          <WordReveal
            text="Grow the game"
            className="font-display text-[14vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
          />
          <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-frost/75">
            Camps and clinics for players aged 7 to 12, run by certified coaches who teach the
            fundamentals properly. First skate or fiftieth, there is a session for you.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#programs"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              See the programmes
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-frost/80 transition-colors hover:border-white/35 hover:text-white"
            >
              Ask a question
            </Link>
          </div>

          <figure className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={photoSrc("youth", 1800)}
              alt={photoAlt("youth")}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-void via-ice-void/10 to-transparent" />
          </figure>
        </div>
      </section>

      {/* programmes */}
      <section id="programs" className="mx-auto mt-20 max-w-7xl scroll-mt-28 px-5 md:px-8">
        <SectionRule label="Camps and clinics" />
        <ProgramList />
      </section>

      {/* staff */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <SectionRule label="Who is on the ice" />
        <div className="grid gap-4 md:grid-cols-3">
          {staff.map((s) => (
            <div key={s.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-2xl text-white">{s.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ice-blue">{s.role}</p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-frost/70">{s.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* safeguarding */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-[radial-gradient(120%_140%_at_10%_0%,rgba(0,72,141,0.35),rgba(5,19,43,0.2))] p-8 md:grid-cols-[1fr_1fr] md:p-10">
          <div>
            <h2 className="font-display text-3xl text-white md:text-4xl">Every coach, checked</h2>
            <p className="mt-4 max-w-[55ch] text-pretty leading-relaxed text-frost/75">
              A good coach shapes more than a slap shot. Before anyone steps on the ice with your
              child, they clear the same bar.
            </p>
          </div>
          <ul className="space-y-3">
            {safeguarding.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-frost/85">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* resources */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <SectionRule label="Support for families" />
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((r) => (
            <div key={r.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl text-white">{r.name}</h3>
              <p className="mt-2 max-w-[60ch] text-pretty text-sm leading-relaxed text-frost/70">{r.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="mx-auto mt-20 max-w-3xl px-5 md:px-8">
        <SectionRule label="Questions parents ask" />
        <FaqAccordion items={faq} />
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { photoAlt, photoSrc } from "@/lib/photos";
import { sponsors } from "@/lib/sponsors";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Partner with us",
  description: "Sponsorship tiers, reach and contact for brands looking to work with the club.",
};

const tiers = [
  {
    name: "Community",
    price: "From $2,500 a season",
    line: "For local businesses who want to be visible in the building and in the neighbourhood.",
    items: [
      "Logo on the club website partner wall",
      "Boards presence at youth clinics",
      "Two tickets to a home game",
      "Social mention at season launch",
    ],
  },
  {
    name: "Official",
    price: "From $15,000 a season",
    line: "For brands who want a category and a story to tell with it.",
    items: [
      "Named official partner in your category",
      "In arena signage on matchdays",
      "Logo on youth programme kit",
      "Ten tickets and a hospitality night",
      "Co branded content with the club",
    ],
    featured: true,
  },
  {
    name: "Premier",
    price: "Let's talk",
    line: "For partners who want their name on the programme, not next to it.",
    items: [
      "Title rights on a programme or clinic series",
      "Presence across matchday, digital and youth",
      "Player and coach appearances",
      "Suite access and full hospitality",
      "A dedicated account lead at the club",
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_80%_0%,rgba(0,72,141,0.35),rgba(5,19,43,0)_60%)]" />
        <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Partnerships</p>
          <WordReveal
            text="Put your name on the ice"
            className="font-display text-[13vw] leading-[0.9] text-white sm:text-6xl lg:text-7xl"
          />
          <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-frost/75">
            Nineteen thousand seats on a matchday, and a few hundred kids on the ice every week.
            Partners reach both, and the second one is where the loyalty is built.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-7">
            <Stat value={19800} label="Seats on a matchday" />
            <Stat value={41} label="Home games" />
            <Stat value={600} label="Kids through the programmes" />
          </dl>
        </div>
      </section>

      {/* tiers */}
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                t.featured
                  ? "border-ice-blue/40 bg-ice-blue/[0.07]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl text-white">{t.name}</h2>
                {t.featured && (
                  <span className="rounded-full bg-ice-blue px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ice-void">
                    Most taken
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-[12px] text-ice-blue">{t.price}</p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-frost/70">{t.line}</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-frost/75">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact?subject=partnership"
                className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97] ${
                  t.featured
                    ? "bg-white text-ice-void"
                    : "border border-white/15 text-frost/85 hover:border-white/35 hover:text-white"
                }`}
              >
                Start a conversation
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* current partners */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/55">Already with us</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="flex flex-wrap gap-3">
          {sponsors
            .filter((s) => s.logo)
            .map((s) => (
              <span key={s.name} className="grid h-16 w-36 place-items-center rounded-xl bg-white px-5">
                <Image src={s.logo!} alt={s.name} width={110} height={40} className="h-9 w-auto object-contain" />
              </span>
            ))}
          {sponsors
            .filter((s) => !s.logo)
            .map((s) => (
              <span
                key={s.name}
                className="grid h-16 place-items-center rounded-xl border border-white/10 bg-white/[0.03] px-5 font-mono text-[11px] uppercase tracking-wider text-frost/60"
              >
                {s.name}
              </span>
            ))}
        </div>
      </section>

      {/* closer */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={photoSrc("gameNight", 1800)}
            alt={photoAlt("gameNight")}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ice-void via-ice-void/85 to-ice-void/30" />
          <div className="relative max-w-xl p-9 md:p-12">
            <h2 className="font-display text-3xl text-white md:text-4xl">Let&apos;s find the right fit</h2>
            <p className="mt-4 text-pretty leading-relaxed text-frost/75">
              Tell us what you are trying to reach and we will build the package around it, rather
              than the other way round.
            </p>
            <Link
              href="/contact?subject=partnership"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get in touch
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
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

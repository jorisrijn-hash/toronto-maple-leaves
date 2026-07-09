"use client";

import { motion } from "framer-motion";
import { packages, seating, type TicketPackage } from "@/lib/tickets";
import { TicketIcon, ArrowRightIcon } from "@/components/ui/icons";
import { revealContainer, sectionLift, VIEWPORT } from "@/lib/motion";

const STATUS_STYLE: Record<TicketPackage["status"], string> = {
  "Coming soon": "border-ice-blue/30 bg-ice-blue/10 text-ice-blue",
  Available: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "Sold out": "border-goal-red/40 bg-goal-red/10 text-goal-red",
  Waitlist: "border-white/20 bg-white/5 text-frost/60",
};

export function TicketsBoard() {
  const [featured, ...rest] = packages;

  return (
    <div>
      {/* featured single-game */}
      <motion.div
        variants={sectionLift}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(120%_140%_at_0%_0%,rgba(0,72,141,0.35),rgba(5,19,43,0.4))] p-8 md:p-11"
      >
        <div className="ice-grooves absolute inset-0 opacity-20" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className={`inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_STYLE[featured.status]}`}>
              {featured.status}
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-frost/75">{featured.body}</p>
          </div>
          <button className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]">
            <TicketIcon className="h-4 w-4" />
            {featured.cta}
          </button>
        </div>
      </motion.div>

      {/* seating tiers */}
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {seating.map((t) => (
          <motion.div
            key={t.name}
            variants={sectionLift}
            className="depth-card depth-layer rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">{t.name}</p>
            <p className="mt-3 font-display text-3xl text-white">{t.from}</p>
            <p className="mt-2 text-sm text-frost/55">{t.note}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* packages */}
      <div className="mt-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Premium & packages</p>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">More ways in</h2>
        </div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="depth-group grid gap-5 md:grid-cols-2"
        >
          {rest.map((p) => (
            <motion.article
              key={p.id}
              variants={sectionLift}
              className="depth-card depth-layer group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-pop"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ice-blue">
                  {p.kicker}
                </span>
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLE[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-frost/70">{p.body}</p>
              <button className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5">
                {p.cta}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        :global(.depth-group):hover :global(.depth-card) {
          opacity: 0.55;
          filter: blur(2px);
        }
        :global(.depth-group) :global(.depth-card:hover) {
          opacity: 1;
          filter: blur(0);
          z-index: 10;
        }
        @media (hover: none) {
          :global(.depth-group):hover :global(.depth-card) {
            opacity: 1;
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}

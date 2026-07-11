"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { franchise } from "@/lib/stats";
import { EASE_OUT, sectionLift, revealContainer, VIEWPORT } from "@/lib/motion";

export function TrophyRoom() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(0,72,141,0.25),rgba(5,19,43,0.4))] p-7 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
        {/* Cup count */}
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Trophy room</p>
          <div className="mt-2 flex items-end justify-center gap-3 lg:justify-start">
            <span className="font-display text-[7rem] leading-none text-white">
              <AnimatedCounter value={franchise.cups} />
            </span>
            <span className="mb-4 max-w-[7rem] text-left font-display text-xl leading-tight text-frost/70">
              Stanley Cups
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] text-frost/50">
            2nd-most in NHL history · last in 1967
          </p>
        </div>

        {/* Cup years timeline */}
        <div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <motion.ol
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="relative flex flex-wrap justify-between gap-y-4"
            >
              {franchise.cupYears.map((year) => (
                <motion.li
                  key={year}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
                  }}
                  className="group flex flex-col items-center"
                >
                  <span className="mb-2 h-2.5 w-2.5 rounded-full bg-ice-blue shadow-[0_0_10px_rgba(99,179,255,0.8)] transition-transform group-hover:scale-150" />
                  <span className="font-mono text-xs text-frost/70">{year}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>

      {/* Franchise records */}
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {franchise.records.map((r) => (
          <motion.div
            key={r.label}
            variants={sectionLift}
            className="depth-card depth-layer rounded-xl border border-white/10 bg-white/[0.02] p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">{r.label}</p>
            <p className="mt-3 font-display text-4xl text-white">
              <AnimatedCounter value={r.value} />
              <span className="ml-1.5 font-mono text-sm text-frost/50">{r.unit}</span>
            </p>
            <p className="mt-2 text-sm text-frost/70">
              {r.holder}
              {"note" in r && r.note ? <span className="text-frost/60"> · {r.note}</span> : null}
            </p>
          </motion.div>
        ))}
        <style jsx>{`
          .depth-group:hover :global(.depth-card) {
            opacity: 0.6;
            filter: blur(1.5px);
          }
          .depth-group :global(.depth-card:hover) {
            opacity: 1;
            filter: blur(0);
            transform: translateY(-4px);
          }
          @media (hover: none) {
            .depth-group:hover :global(.depth-card) {
              opacity: 1;
              filter: none;
              transform: none;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

export function HistoryTimeline({
  milestones,
}: {
  milestones: { year: string; title: string; text: string }[];
}) {
  return (
    <section className="mx-auto mt-16 max-w-3xl px-5 md:px-8">
      <motion.ol
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative border-l border-white/12 pl-8"
      >
        {milestones.map((m) => (
          <motion.li key={m.year} variants={revealItem} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[2.35rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-ice-blue/40 bg-ice-void">
              <span className="h-1.5 w-1.5 rounded-full bg-ice-blue" />
            </span>
            <div className="font-mono text-sm text-ice-blue">{m.year}</div>
            <h3 className="mt-1 font-display text-2xl text-white">{m.title}</h3>
            <p className="mt-1.5 text-frost/70">{m.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

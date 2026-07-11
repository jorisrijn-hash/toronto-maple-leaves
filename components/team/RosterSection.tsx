"use client";

import { motion } from "framer-motion";
import { revealContainer, VIEWPORT } from "@/lib/motion";

export function RosterSection({
  kicker,
  title,
  count,
  children,
}: {
  kicker: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">{kicker}</p>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">{title}</h2>
        </div>
        <span className="font-mono text-sm text-frost/55">{count}</span>
      </div>

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {children}
      </motion.div>

      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.55;
          filter: blur(2px);
        }
        .depth-group :global(.depth-card:hover) {
          opacity: 1;
          filter: blur(0);
          z-index: 10;
        }
        @media (hover: none) {
          .depth-group:hover :global(.depth-card) {
            opacity: 1;
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}

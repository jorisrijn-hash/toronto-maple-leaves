"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TiltCard } from "@/components/ui/TiltCard";
import { sectionLift, revealContainer, VIEWPORT } from "@/lib/motion";

// Demonstrates the focus-blur "pop-out": hovering one card lifts it forward while
// its siblings recede (blur + dim + scale down), creating depth from a flat grid.
export function DepthStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group grid gap-5 md:grid-cols-3"
      >
        <Card>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ice-blue">
            Founded
          </span>
          <span className="mt-4 block font-display text-6xl text-white">1917</span>
          <p className="mt-3 text-sm text-frost/70">
            Born as the Toronto Arenas. Blue and white ever since.
          </p>
        </Card>

        <Card>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ice-blue">
            Stanley Cups
          </span>
          <span className="mt-4 block font-display text-6xl text-white">
            <AnimatedCounter value={13} />
          </span>
          <p className="mt-3 text-sm text-frost/70">
            Championships lifted in franchise history.
          </p>
        </Card>

        <Card>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ice-blue">
            Original Six
          </span>
          <span className="mt-4 block font-display text-6xl text-white">
            <AnimatedCounter value={6} />
          </span>
          <p className="mt-3 text-sm text-frost/70">
            One of the NHL&apos;s six founding franchises.
          </p>
        </Card>
      </motion.div>

      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.55;
          filter: blur(2px);
          transform: scale(0.98);
        }
        .depth-group :global(.depth-card:hover) {
          opacity: 1;
          filter: blur(0);
          transform: translateY(-6px) scale(1.02);
          z-index: 10;
        }
        @media (hover: none) {
          .depth-group:hover :global(.depth-card) {
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={sectionLift} className="depth-card depth-layer">
      <TiltCard max={10}>
        <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-pop [transform-style:preserve-3d]">
          {/* sheen sweep on hover */}
          <span className="pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-2xl">
            <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 [.depth-card:hover_&]:animate-sheen [.depth-card:hover_&]:opacity-100" />
          </span>
          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            {children}
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

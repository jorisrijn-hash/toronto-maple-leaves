"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={item.q} variants={revealItem}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice-blue"
              >
                <span className="font-display text-lg text-white md:text-xl">{item.q}</span>
                <span
                  aria-hidden
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-300 ease-out ${
                    isOpen
                      ? "rotate-45 border-ice-blue/50 bg-ice-blue/15 text-ice-blue"
                      : "border-white/15 text-frost/60"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>

            {/* grid-rows trick: animates height without animating the height property */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[68ch] px-5 pb-5 text-pretty leading-relaxed text-frost/70">
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

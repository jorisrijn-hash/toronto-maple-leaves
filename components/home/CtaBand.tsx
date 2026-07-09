"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets } from "@/lib/site";
import { sectionLift, VIEWPORT } from "@/lib/motion";
import { TicketIcon } from "@/components/ui/icons";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <motion.div
        variants={sectionLift}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-3xl border border-white/10"
      >
        <Image
          src={assets.feature}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_20%,rgba(0,72,141,0.85),rgba(5,19,43,0.92))]" />
        <div className="relative flex flex-col items-start gap-6 p-10 md:p-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-frost/80">
            <span className="h-1.5 w-1.5 rounded-full bg-goal-red animate-pulse-goal" />
            On sale now
          </span>
          <h2 className="max-w-2xl font-display text-5xl leading-[0.9] text-white md:text-7xl">
            Get in the building
          </h2>
          <p className="max-w-lg text-balance text-frost/80">
            Feel the glass shake. Seats, memberships and single-game tickets for the
            2025-26 season at Scotiabank Arena.
          </p>
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            <TicketIcon className="h-4 w-4" />
            Find your seats
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

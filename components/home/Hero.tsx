"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/WordReveal";
import { assets, site } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { TicketIcon, ArrowRightIcon } from "@/components/ui/icons";

export function Hero() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20 });
  const sy = useSpring(py, { stiffness: 120, damping: 20 });

  // Background drifts opposite and further than the foreground -> parallax depth.
  const bgX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const bgY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const fgX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const fgY = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const ref = useRef<HTMLElement>(null);
  function onMove(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,#0b3a75_0%,#00234c_45%,#05132b_100%)]" />

      <motion.video
        style={{ x: bgX, y: bgY, scale: 1.1 }}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        poster={assets.heroPoster}
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </motion.video>

      {/* Cinematic vignette + bottom fade for legible, centred type */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_30%,rgba(5,19,43,0.55)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(5,19,43,0.95)_0%,rgba(5,19,43,0.4)_50%,rgba(5,19,43,0.2)_100%)]" />

      <motion.div
        style={{ x: fgX, y: fgY }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-24 pt-28 text-center md:px-8"
      >
        {/* Arena location -> Google Maps */}
        <motion.a
          href={site.arenaMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="group mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-frost/80 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-goal-red animate-pulse-goal" />
          {site.arena} · {site.city.split(",")[0]}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ice-blue transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </motion.a>

        <WordReveal
          text="Our ice. Our city."
          className="font-display text-[12.5vw] leading-[0.92] text-white sm:text-[10vw] lg:text-[8.5rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
          className="mt-7 max-w-xl text-balance text-lg text-frost/80"
        >
          Home of the Toronto Maple Leafs. Every shift, every save and every goal,
          closer than the glass.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            <TicketIcon className="h-4 w-4" />
            Get Tickets
          </Link>
          <Link
            href="/team"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
          >
            Explore the Team
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="h-2 w-1 animate-float-slow rounded-full bg-white/80" />
        </span>
      </motion.div>
    </section>
  );
}

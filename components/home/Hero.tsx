"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { assets } from "@/lib/site";
import { leaders, franchise } from "@/lib/stats";
import { EASE_OUT } from "@/lib/motion";

const heroStats = [
  { value: franchise.cups, label: "Stanley Cups" },
  { value: leaders.points.p, label: `${leaders.points.name.split(" ")[1]} · PTS 25-26` },
  { value: franchise.records[1].value, label: "Matthews · all-time G" },
];

export function Hero() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20 });
  const sy = useSpring(py, { stiffness: 120, damping: 20 });

  // Background drifts opposite and further than the foreground → parallax depth.
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
      {/* Depth fallback */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,#0b3a75_0%,#00234c_45%,#05132b_100%)]" />

      {/* Fullscreen hero video — parallax layer (scaled so edges never show on shift) */}
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

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(5,19,43,0.92)_0%,rgba(5,19,43,0.45)_45%,rgba(5,19,43,0.25)_100%)]" />

      <motion.div style={{ x: fgX, y: fgY }} className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-goal-red animate-pulse-goal" />
          Scotiabank Arena · Toronto
        </motion.p>

        <WordReveal
          text="This is Leafs Nation"
          className="max-w-4xl font-display text-[13vw] leading-[0.88] text-white sm:text-[9vw] lg:text-[7rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.55 }}
          className="mt-6 max-w-xl text-balance text-lg text-frost/80"
        >
          Fifty thousand heartbeats, one blue sweater. Follow every shift, every
          save and every goal, closer than the glass.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/tickets"
            className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            Get Tickets
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
          >
            Explore the Team
          </Link>
        </motion.div>

        {/* Key stats, on the hero */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-7"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="min-w-[6rem]">
              <dd className="font-display text-4xl text-white md:text-5xl">
                <AnimatedCounter value={s.value} />
              </dd>
              <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/60">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="h-2 w-1 animate-float-slow rounded-full bg-white/80" />
        </span>
      </motion.div>
    </section>
  );
}

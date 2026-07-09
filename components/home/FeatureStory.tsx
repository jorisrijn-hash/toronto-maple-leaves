"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { assets } from "@/lib/site";
import { sectionLift, revealItem, revealContainer, VIEWPORT } from "@/lib/motion";

export function FeatureStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle parallax: image drifts slower than the scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
      <motion.div
        variants={sectionLift}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-pop"
      >
        <div className="relative h-[62vh] min-h-[420px] w-full">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src={assets.celebration}
              alt="Toronto Maple Leafs players celebrating a goal"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </motion.div>
          {/* legibility gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,19,43,0.95)_5%,rgba(5,19,43,0.35)_55%,transparent_100%)]" />

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="absolute inset-x-0 bottom-0 p-6 md:p-12"
          >
            <motion.p
              variants={revealItem}
              className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue"
            >
              The feeling
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="max-w-2xl font-display text-5xl leading-[0.9] text-white md:text-7xl"
            >
              When the horn goes, the city goes with it
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-5 max-w-xl text-balance text-frost/80"
            >
              Nineteen thousand on their feet, a century of hope in one blue sweater.
              This is what game night sounds like.
            </motion.p>
            <motion.div variants={revealItem} className="mt-7">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
              >
                Meet the roster
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

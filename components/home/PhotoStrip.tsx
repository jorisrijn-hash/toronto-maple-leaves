"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { photos, photoSrc, type PhotoKey } from "@/lib/photos";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";
import { ArrowRightIcon } from "@/components/ui/icons";

const strip: PhotoKey[] = ["faceoff", "iceSpray", "goalie", "teamPortrait", "netFront", "outdoor"];

export function PhotoStrip() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">The season, in frames</p>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">On the ice</h2>
        </div>
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-frost/80 transition-colors hover:border-white/35 hover:text-white"
        >
          View gallery
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
      >
        {strip.map((key, i) => (
          <motion.div key={key} variants={revealItem}>
            <Link
              href="/gallery"
              className={`group relative block overflow-hidden rounded-xl border border-white/10 ${
                i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photoSrc(key, 600)}
                alt={photos[key].alt}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 bg-rink-navy/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

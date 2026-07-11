"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { programs } from "@/lib/youth";
import { photoAlt, photoSrc } from "@/lib/photos";
import { revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

export function ProgramList() {
  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="space-y-6"
    >
      {programs.map((p, i) => (
        <motion.article
          key={p.slug}
          variants={revealItem}
          id={p.slug}
          className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25 md:grid-cols-2"
        >
          <div className={`relative aspect-[16/10] md:aspect-auto md:min-h-[19rem] ${i % 2 === 1 ? "md:order-2" : ""}`}>
            <Image
              src={photoSrc(p.photo, 1000)}
              alt={photoAlt(p.photo)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-ice-void/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue backdrop-blur-sm">
              {p.kicker}
            </span>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-9">
            <h3 className="font-display text-3xl leading-tight text-white md:text-4xl">{p.name}</h3>

            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-frost/55">
              <div className="flex gap-2">
                <dt className="sr-only">Ages</dt>
                <dd>{p.ages}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Format</dt>
                <dd className="text-ice-blue">{p.format}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Venue</dt>
                <dd>{p.venue}</dd>
              </div>
            </dl>

            <p className="mt-5 max-w-[60ch] text-pretty leading-relaxed text-frost/75">{p.summary}</p>

            <ul className="mt-6 space-y-2">
              {p.details.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-frost/70">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

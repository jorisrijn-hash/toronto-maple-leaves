"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { assets } from "@/lib/site";
import { sectionLift, revealItem, revealContainer, VIEWPORT } from "@/lib/motion";

const cards = [
  {
    href: "/schedule",
    img: assets.gameAction,
    alt: "Maple Leafs and Senators battle for the puck",
    kicker: "Game nights",
    title: "The schedule",
    body: "Every drop of the puck, home and away, plus a match center built for live.",
  },
  {
    href: "/stats",
    img: assets.minten,
    alt: "Maple Leafs forward on the ice",
    kicker: "The numbers",
    title: "Player stats",
    body: "Skaters and goalies, read the way a broadcast HUD shows them.",
  },
];

export function GameNight() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group grid gap-6 md:grid-cols-2"
      >
        {cards.map((c) => (
          <motion.div key={c.href} variants={sectionLift} className="group depth-card depth-layer">
            <TiltCard className="h-full">
              <Link
                href={c.href}
                className="relative block h-full overflow-hidden rounded-3xl border border-white/10 shadow-pop [transform-style:preserve-3d]"
              >
                <div className="relative h-[46vh] min-h-[340px] w-full">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,19,43,0.92)_10%,rgba(5,19,43,0.2)_60%,transparent)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7" style={{ transform: "translateZ(40px)" }}>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">
                    {c.kicker}
                  </p>
                  <h3 className="font-display text-4xl text-white">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-frost/75">{c.body}</p>
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.6;
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

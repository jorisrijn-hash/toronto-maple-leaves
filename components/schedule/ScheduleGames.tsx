"use client";

import { motion } from "framer-motion";
import { games } from "@/lib/schedule";
import { GameCard } from "@/components/schedule/GameCard";
import { revealContainer, VIEWPORT } from "@/lib/motion";

export function ScheduleGames() {
  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="depth-group grid gap-5 md:grid-cols-2"
    >
      {games.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.6;
          filter: blur(2px);
        }
        .depth-group :global(.depth-card:hover) {
          opacity: 1;
          filter: blur(0);
          transform: translateY(-4px);
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
    </motion.div>
  );
}

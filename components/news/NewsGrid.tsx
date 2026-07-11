"use client";

import { motion } from "framer-motion";
import type { Article } from "@/lib/news";
import { NewsCard } from "@/components/news/NewsCard";
import { revealContainer, VIEWPORT } from "@/lib/motion";

export function NewsGrid({ featured, rest }: { featured: Article; rest: Article[] }) {
  return (
    <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="depth-group">
      <div className="mb-5">
        <NewsCard article={featured} large />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <NewsCard key={a.slug} article={a} />
        ))}
      </div>
      <style jsx>{`
        .depth-group:hover :global(.depth-card) {
          opacity: 0.6;
        }
        .depth-group :global(.depth-card:hover) {
          opacity: 1;
        }
        @media (hover: none) {
          .depth-group:hover :global(.depth-card) {
            opacity: 1;
          }
        }
      `}</style>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { revealContainer, revealItem } from "@/lib/motion";

// Splits a string into words and staggers them in (blur + rise). Used for headlines.
export function WordReveal({
  text,
  className,
  as = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
}) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={clsx("flex flex-wrap content-start gap-y-[0.12em]", className)}
      variants={revealContainer}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={revealItem}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

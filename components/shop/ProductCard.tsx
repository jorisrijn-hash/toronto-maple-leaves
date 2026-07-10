"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/shop";
import { TiltCard } from "@/components/ui/TiltCard";
import { BagIcon } from "@/components/ui/icons";
import { assets } from "@/lib/site";
import { sectionLift, EASE_OUT } from "@/lib/motion";

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product, size: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const timer = useRef<number | null>(null);

  function enter() {
    timer.current = window.setTimeout(() => setHover(true), 280);
  }
  function leave() {
    if (timer.current) window.clearTimeout(timer.current);
    setHover(false);
  }

  return (
    <motion.div
      variants={sectionLift}
      className="depth-card depth-layer"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <TiltCard max={10} disabled={hover}>
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-pop [transform-style:preserve-3d]">
          <div className="relative aspect-square overflow-hidden">
            {product.image ? (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(120,165,225,0.16),transparent_62%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-contain p-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 [.depth-card:hover_&]:scale-105"
                />
              </div>
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_50%_0%,#0b3a75,#00234c_60%,#05132b)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assets.leaf} alt="" className="h-24 w-auto opacity-20" />
                <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-frost/40">
                  {product.category}
                </span>
              </div>
            )}

            {product.tag ? (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-goal-red px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                {product.tag}
              </span>
            ) : null}

            {/* hover-intent quick view */}
            <AnimatePresence>
              {hover && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="absolute inset-0 grid place-items-center bg-ice-void/45 backdrop-blur-[2px]"
                >
                  <motion.button
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    onClick={() => onOpen(product)}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ice-void shadow-glow"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Quick view
                  </motion.button>
                  <button
                    onClick={() => onOpen(product)}
                    aria-label="Open details"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-ice-void/60 text-white transition-colors hover:bg-ice-void"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 [.depth-card:hover_&]:animate-sheen [.depth-card:hover_&]:opacity-100" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(24px)" }}>
            <h3 className="font-display text-lg leading-tight text-white">{product.name}</h3>
            <p className="mt-1 font-mono text-sm text-ice-blue">CA${product.price.toFixed(2)}</p>
            <button
              type="button"
              onClick={() => onAdd(product, product.sizes?.[0] ?? "One size")}
              className="group cursor-target mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ice-void transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.97]"
            >
              <BagIcon className="h-4 w-4" />
              Add to bag
            </button>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

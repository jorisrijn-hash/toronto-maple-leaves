"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/shop";
import { TiltCard } from "@/components/ui/TiltCard";
import { assets } from "@/lib/site";
import { sectionLift } from "@/lib/motion";

export function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <motion.div variants={sectionLift} className="depth-card depth-layer">
      <TiltCard max={12}>
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-pop [transform-style:preserve-3d]">
          {/* image / placeholder */}
          <div className="relative aspect-square overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
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
              <span className="absolute right-3 top-3 rounded-full bg-goal-red px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                {product.tag}
              </span>
            ) : null}
            {/* sheen */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 [.depth-card:hover_&]:animate-sheen [.depth-card:hover_&]:opacity-100" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(24px)" }}>
            <h3 className="font-display text-lg leading-tight text-white">{product.name}</h3>
            <p className="mt-1 font-mono text-sm text-ice-blue">
              CA${product.price.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="cursor-target mt-4 w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ice-void transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.97]"
            >
              Add to bag
            </button>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

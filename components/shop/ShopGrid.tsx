"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products, type Category, type Product } from "@/lib/shop";
import { ProductCard } from "@/components/shop/ProductCard";
import { BagIcon } from "@/components/ui/icons";
import { revealContainer, VIEWPORT, EASE_OUT } from "@/lib/motion";

export function ShopGrid() {
  const [active, setActive] = useState<Category>("All");
  const [bag, setBag] = useState(0);
  const [pulse, setPulse] = useState(false);

  const list = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  function addToBag(_p: Product) {
    setBag((n) => n + 1);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 250);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`cursor-target rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "border-ice-blue/40 bg-ice-blue/10 text-white"
                  : "border-white/10 text-frost/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          animate={pulse ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2"
        >
          <BagIcon className="h-4 w-4 text-ice-blue" />
          <span className="font-mono text-sm text-white">
            {bag} <span className="text-frost/50">in bag</span>
          </span>
        </motion.div>
      </div>

      <motion.div
        key={active}
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="depth-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToBag} />
          ))}
        </AnimatePresence>
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
      </motion.div>
    </div>
  );
}

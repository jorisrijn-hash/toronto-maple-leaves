"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/shop";
import { BagIcon } from "@/components/ui/icons";
import { assets } from "@/lib/site";
import { EASE_DRAWER, EASE_OUT } from "@/lib/motion";

export function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, size: string) => void;
}) {
  const [size, setSize] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSize(product?.sizes?.[0] ?? null);
    setZoom(false);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") (zoom ? setZoom(false) : onClose());
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [product, zoom, onClose]);

  function add() {
    if (!product) return;
    onAdd(product, size ?? "One size");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-drawer grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ice-void/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_DRAWER }}
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-ice-void shadow-2xl md:grid-cols-2"
          >
            {/* image */}
            <div className="group relative aspect-square bg-[radial-gradient(circle_at_50%_40%,rgba(120,165,225,0.18),rgba(5,19,43,0.5))] md:aspect-auto">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 100vw, 500px" className="object-contain p-8 drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]" />
              ) : (
                <div className="grid h-full place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assets.leaf} alt="" className="h-24 opacity-20" />
                </div>
              )}
              {product.image && (
                <button
                  onClick={() => setZoom(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ice-void/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-ice-void"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  Fullscreen
                </button>
              )}
            </div>

            {/* info */}
            <div className="flex flex-col overflow-y-auto p-7 md:p-9">
              <button onClick={onClose} aria-label="Close product details" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-frost/70 transition-colors hover:bg-white/10 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>

              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">{product.category}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-white">{product.name}</h2>
              <p className="mt-2 font-mono text-lg text-frost/90">CA${product.price.toFixed(2)}</p>

              {product.description && (
                <p className="mt-5 text-sm leading-relaxed text-frost/70">{product.description}</p>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-frost/50">
                    {product.sizes.length === 1 ? "Size" : "Select size"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`min-w-[3rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          size === s
                            ? "border-ice-blue/50 bg-ice-blue/10 text-white"
                            : "border-white/12 text-frost/70 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8">
                <button
                  onClick={add}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ice-void transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.97]"
                >
                  {added ? (
                    "Added to bag"
                  ) : (
                    <>
                      <BagIcon className="h-4 w-4" />
                      Add to bag
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* fullscreen image layer */}
          <AnimatePresence>
            {zoom && product.image && (
              <motion.div
                className="fixed inset-0 z-lightbox grid place-items-center bg-ice-void/95 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoom(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="relative h-full w-full max-w-5xl"
                >
                  <Image src={product.image} alt={product.name} fill sizes="90vw" className="object-contain" />
                </motion.div>
                <button aria-label="Close image" className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

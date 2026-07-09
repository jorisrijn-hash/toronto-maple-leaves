"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/shop";
import { EASE_DRAWER } from "@/lib/motion";

export type BagItem = { product: Product; size: string; qty: number };

export function BagDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove,
}: {
  open: boolean;
  items: BagItem[];
  onClose: () => void;
  onQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[85]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ice-void/70 backdrop-blur-sm" onClick={onClose} />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_DRAWER }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ice-void"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-2xl text-white">
                Your bag <span className="font-mono text-sm text-frost/50">({count})</span>
              </h2>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-frost/70 transition-colors hover:bg-white/10 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-display text-xl text-white">Your bag is empty</p>
                    <p className="mt-2 text-sm text-frost/50">Add some blue and white to get started.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, i) => (
                    <li key={`${item.product.id}-${item.size}`} className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-white to-[#e9eef5]">
                        {item.product.image && (
                          <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-contain p-1.5" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-medium leading-tight text-white">{item.product.name}</p>
                          <button onClick={() => onRemove(i)} className="text-frost/40 transition-colors hover:text-goal-red">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                          </button>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-frost/45">Size {item.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/12">
                            <button onClick={() => onQty(i, -1)} className="grid h-7 w-7 place-items-center text-frost/70 hover:text-white">−</button>
                            <span className="w-4 text-center font-mono text-sm text-white">{item.qty}</span>
                            <button onClick={() => onQty(i, 1)} className="grid h-7 w-7 place-items-center text-frost/70 hover:text-white">+</button>
                          </div>
                          <span className="font-mono text-sm text-frost/80">CA${(item.product.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <div className="mb-1 flex justify-between text-sm text-frost/60">
                <span>Subtotal</span>
                <span className="font-mono text-white">CA${subtotal.toFixed(2)}</span>
              </div>
              <p className="mb-4 font-mono text-[11px] text-frost/40">Taxes and shipping calculated at checkout.</p>
              <button
                disabled={items.length === 0}
                className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ice-void transition-transform duration-150 ease-out enabled:hover:scale-[1.02] enabled:active:scale-[0.97] disabled:opacity-40"
              >
                Checkout
              </button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-frost/30">
                Concept store · checkout not active
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

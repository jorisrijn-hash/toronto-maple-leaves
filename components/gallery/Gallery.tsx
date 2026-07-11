"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { photos, photoSrc, type PhotoKey } from "@/lib/photos";
import { EASE_OUT, revealContainer, revealItem, VIEWPORT } from "@/lib/motion";

export function Gallery({ keys }: { keys: PhotoKey[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + keys.length) % keys.length)),
    [keys.length]
  );

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = index === null ? null : photos[keys[index]];

  return (
    <>
      {/* CSS columns rather than a grid: row-span + aspect-ratio fight each other
          under align-items: stretch and leave holes. Columns are deterministic. */}
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3"
      >
        {keys.map((key, i) => {
          const p = photos[key];
          return (
            <motion.button
              key={key}
              variants={revealItem}
              onClick={() => setIndex(i)}
              className={`group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] outline-none transition-colors hover:border-white/30 focus-visible:ring-2 focus-visible:ring-ice-blue ${
                p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photoSrc(key, 800)}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ice-void/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left font-mono text-[10px] uppercase tracking-wider text-frost/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {p.credit}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            className="fixed inset-0 z-lightbox flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ice-void/90 backdrop-blur-sm" onClick={close} />

            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative max-h-[86vh] w-full max-w-5xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/12">
                <Image
                  src={photoSrc(keys[index!], 1800)}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4">
                <span className="text-sm text-frost/70">{current.alt}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-frost/60">
                  {current.credit} · {index! + 1}/{keys.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-frost/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            <Arrow side="left" onClick={() => step(-1)} />
            <Arrow side="right" onClick={() => step(1)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ice-void/60 text-frost/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white sm:grid ${
        side === "left" ? "left-5" : "right-5"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={side === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "@/lib/site";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

// The "smaller variant between pages": a navy panel wipes up over the screen, the
// crest flashes with a goal-light streak, then the panel wipes off to reveal the new
// page. Fast (~750ms) so navigation still feels snappy, but with a beat of suspense.
export function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [reduce, setReduce] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false; // intro loader covers the initial load
      return;
    }
    setActive(true);
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#00205b_0%,#05132b_100%)]"
        initial={reduce ? { opacity: 0 } : { y: "100%" }}
        animate={
          reduce
            ? { opacity: [0, 1, 1, 0] }
            : { y: ["100%", "0%", "0%", "-100%"] }
        }
        transition={{
          duration: reduce ? 0.45 : 0.78,
          times: [0, 0.4, 0.52, 1],
          ease: EASE_IN_OUT,
        }}
        onAnimationComplete={() => setActive(false)}
      >
        <div className="ice-grooves absolute inset-0 opacity-40" />

        {/* crest */}
        <motion.div
          className="absolute inset-0 grid place-items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.04] }}
          transition={{ duration: reduce ? 0.45 : 0.78, times: [0, 0.4, 0.62, 0.9], ease: EASE_OUT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assets.leaf} alt="" width={72} height={80} className="h-16 w-auto drop-shadow-[0_0_24px_rgba(99,179,255,0.55)]" />
        </motion.div>

        {/* goal-light streak */}
        {!reduce && (
          <motion.div
            className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(232,17,45,0.6), #ffffff, rgba(99,179,255,0.6), transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.32, ease: EASE_OUT }}
          />
        )}
      </motion.div>
    </div>
  );
}

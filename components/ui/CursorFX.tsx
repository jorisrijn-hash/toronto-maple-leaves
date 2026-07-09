"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Two cursor effects that add depth without hijacking the native cursor:
//  1) a screen-blended blue spotlight that lights the content under the pointer
//  2) a spring-lagged ring that trails the cursor and swells over interactive targets
// Enabled only for fine pointers (mouse) and when motion is allowed.
export function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // over a link/button
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [role='button'], input, .cursor-target"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* spotlight — lights content beneath the pointer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
        style={{
          background:
            "radial-gradient(220px circle at var(--cursor-x) var(--cursor-y), rgba(99,179,255,0.12), transparent 60%)",
        }}
      />
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[61]"
        style={{ x: rx, y: ry }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ice-blue/60"
          style={{
            width: active ? 48 : 26,
            height: active ? 48 : 26,
            transition: "width 180ms ease, height 180ms ease, background-color 180ms ease",
            backgroundColor: active ? "rgba(99,179,255,0.10)" : "transparent",
            boxShadow: "0 0 12px rgba(99,179,255,0.35)",
          }}
        />
      </motion.div>
    </>
  );
}

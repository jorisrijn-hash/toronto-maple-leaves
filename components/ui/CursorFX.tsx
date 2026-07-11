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
        className="pointer-events-none fixed inset-0 z-announce mix-blend-screen"
        style={{
          background:
            "radial-gradient(220px circle at var(--cursor-x) var(--cursor-y), rgba(99,179,255,0.12), transparent 60%)",
        }}
      />
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-cursor"
        style={{ x: rx, y: ry }}
      >
        <div
          className="rounded-full border border-ice-blue/60"
          style={{
            // Fixed box, scaled on the compositor. Animating width/height here
            // triggered layout on every hover; transform does not.
            width: 26,
            height: 26,
            transform: `translate(-50%, -50%) scale(${active ? 48 / 26 : 1})`,
            transition:
              "transform 180ms cubic-bezier(0.23, 1, 0.32, 1), background-color 180ms ease",
            backgroundColor: active ? "rgba(99,179,255,0.10)" : "transparent",
            boxShadow: "0 0 12px rgba(99,179,255,0.35)",
          }}
        />
      </motion.div>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";

const SPRING_OPTS = { stiffness: 220, damping: 26, mass: 0.6 } as const;

// Pointer-driven 3D tilt. Values run through a spring so motion feels alive rather
// than snapping to the cursor. Disabled for touch / reduced-motion via CSS + guards.
export function TiltCard({
  children,
  className,
  max = 15,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), SPRING_OPTS);
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), SPRING_OPTS);
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={clsx("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {/* moving glare */}
      <motion.span
        aria-hidden
        style={{ left: glareX }}
        className="pointer-events-none absolute inset-y-0 -ml-24 w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
      />
    </motion.div>
  );
}

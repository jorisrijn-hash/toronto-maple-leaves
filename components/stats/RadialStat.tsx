"use client";

import { useRef, useId } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

// Animated arc dial. `value`/`max` set the fill; the stroke draws on when scrolled
// into view. Broadcast-HUD styling: gradient stroke + glow, mono value in the center.
export function RadialStat({
  value,
  max,
  size = 150,
  stroke = 12,
  label,
  center,
  className,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label?: string;
  center?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const id = useId().replace(/:/g, "");

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const offset = c * (1 - pct);

  return (
    <div className={className} style={{ width: size, height: size, position: "relative" }}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#63B3FF" />
            <stop offset="100%" stopColor="#00488D" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        {/* value arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#grad-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(99,179,255,0.5))" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {center}
        {label ? (
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-frost/60">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

// Small set of Lucide-style icons animated with Motion, in the spirit of animate-ui.
// Most animate on hover of their parent `.group` (so they react when a whole button is
// hovered); Menu is state-driven for the mobile nav.

type IconProps = { className?: string };

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <g className="transition-transform duration-300 ease-out [.group:hover_&]:translate-x-[3px]">
        <line x1="4" y1="12" x2="20" y2="12" className="origin-left transition-transform duration-300 ease-out [.group:hover_&]:scale-x-110" />
        <polyline points="13 5 20 12 13 19" />
      </g>
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* handle bounces up slightly on hover */}
      <path d="M8 8a4 4 0 0 1 8 0" className="origin-bottom transition-transform duration-300 ease-out [.group:hover_&]:-translate-y-[1.5px] [.group:hover_&]:scale-y-110" />
      <path d="M6 8h12l-1 12H7L6 8z" className="transition-transform duration-300 ease-out [.group:hover_&]:translate-y-[1px]" />
    </svg>
  );
}

export function TicketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <g className="origin-center transition-transform duration-300 ease-out [.group:hover_&]:-rotate-[8deg]">
        <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4z" />
        <line x1="14" y1="6" x2="14" y2="18" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

// State-driven hamburger -> X for the mobile nav.
export function MenuIcon({ open, className }: IconProps & { open: boolean }) {
  const t = { duration: 0.3, ease: EASE_OUT };
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <motion.line x1="4" x2="20" animate={open ? { y1: 12, y2: 12, rotate: 45 } : { y1: 7, y2: 7, rotate: 0 }} transition={t} style={{ originX: "12px", originY: "12px" }} />
      <motion.line x1="4" x2="20" y1="12" y2="12" animate={{ opacity: open ? 0 : 1 }} transition={t} />
      <motion.line x1="4" x2="20" animate={open ? { y1: 12, y2: 12, rotate: -45 } : { y1: 17, y2: 17, rotate: 0 }} transition={t} style={{ originX: "12px", originY: "12px" }} />
    </svg>
  );
}

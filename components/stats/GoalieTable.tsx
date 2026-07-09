"use client";

import { motion } from "framer-motion";
import type { Goalie } from "@/lib/stats";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const COLS: { key: keyof Goalie; label: string; fmt?: (g: Goalie) => string }[] = [
  { key: "gp", label: "GP" },
  { key: "gs", label: "GS" },
  { key: "w", label: "W" },
  { key: "l", label: "L" },
  { key: "otl", label: "OT" },
  { key: "gaa", label: "GAA", fmt: (g) => g.gaa.toFixed(2) },
  { key: "svPct", label: "SV%", fmt: (g) => g.svPct.toFixed(3).replace(/^0/, "") },
  { key: "sa", label: "SA" },
  { key: "sv", label: "SV" },
  { key: "ga", label: "GA" },
];

export function GoalieTable({ data }: { data: Goalie[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 text-frost/50">
            <th className="sticky left-0 bg-ice-void/40 px-4 py-3 text-left font-mono text-[11px] font-normal uppercase tracking-wider">
              Goalie
            </th>
            {COLS.map((c) => (
              <th key={c.key} className="px-3 py-3 text-center font-mono text-[11px] font-normal uppercase tracking-wider">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {data.map((g, i) => (
            <motion.tr
              key={g.name}
              variants={{
                hidden: { opacity: 0, x: -6 },
                show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } },
              }}
              className="group border-b border-white/5 transition-colors hover:bg-ice-blue/[0.06]"
            >
              <td className="sticky left-0 bg-ice-void/40 px-4 py-3 text-left group-hover:bg-[#0a2350]">
                <span className="mr-3 font-mono text-xs text-frost/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-white">{g.name}</span>
              </td>
              {COLS.map((c) => (
                <td key={c.key} className="px-3 py-3 text-center font-mono tabular-nums text-frost/75">
                  {c.fmt ? c.fmt(g) : (g[c.key] as number)}
                </td>
              ))}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
}

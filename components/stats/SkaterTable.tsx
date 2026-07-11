"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Skater } from "@/lib/stats";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

type Key = "gp" | "g" | "a" | "p" | "plusMinus" | "pim" | "ppg" | "shg" | "gwg" | "otg";
const COLS: { key: Key; label: string }[] = [
  { key: "gp", label: "GP" },
  { key: "g", label: "G" },
  { key: "a", label: "A" },
  { key: "p", label: "P" },
  { key: "plusMinus", label: "+/-" },
  { key: "pim", label: "PIM" },
  { key: "ppg", label: "PPG" },
  { key: "shg", label: "SHG" },
  { key: "gwg", label: "GWG" },
  { key: "otg", label: "OTG" },
];

export function SkaterTable({ data }: { data: Skater[] }) {
  const [sort, setSort] = useState<Key>("p");
  const [dir, setDir] = useState<"desc" | "asc">("desc");
  const maxP = Math.max(...data.map((d) => d.p));

  const rows = useMemo(() => {
    const s = [...data].sort((a, b) => (dir === "desc" ? b[sort] - a[sort] : a[sort] - b[sort]));
    return s;
  }, [data, sort, dir]);

  function toggle(key: Key) {
    if (key === sort) setDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSort(key);
      setDir("desc");
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 text-frost/50">
            <th className="sticky left-0 bg-ice-void/40 px-4 py-3 text-left font-mono text-[11px] font-normal uppercase tracking-wider">
              Player
            </th>
            <th className="px-2 py-3 text-center font-mono text-[11px] font-normal uppercase tracking-wider">
              Pos
            </th>
            {COLS.map((c) => {
              const activeCol = c.key === sort;
              return (
                <th key={c.key} className="px-2 py-3 text-center">
                  <button
                    onClick={() => toggle(c.key)}
                    className={`cursor-target inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      activeCol ? "text-ice-blue" : "text-frost/50 hover:text-white"
                    }`}
                  >
                    {c.label}
                    <span className={activeCol ? "opacity-100" : "opacity-0"}>
                      {dir === "desc" ? "▾" : "▴"}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        >
          {rows.map((s, i) => (
            <motion.tr
              key={s.name}
              variants={{
                hidden: { opacity: 0, x: -6 },
                show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } },
              }}
              className="group border-b border-white/5 transition-colors hover:bg-ice-blue/[0.06]"
            >
              <td className="sticky left-0 bg-ice-void/40 px-4 py-3 text-left group-hover:bg-[#0a2350]">
                <span className="mr-3 font-mono text-xs text-frost/55">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-white">{s.name}</span>
              </td>
              <td className="px-2 py-3 text-center font-mono text-xs text-ice-blue/80">{s.pos}</td>
              {COLS.map((c) => {
                const val = s[c.key];
                const isP = c.key === "p";
                return (
                  <td
                    key={c.key}
                    className={`relative px-2 py-3 text-center font-mono tabular-nums ${
                      c.key === sort ? "text-white" : "text-frost/75"
                    }`}
                  >
                    {isP ? (
                      <span className="relative inline-flex flex-col items-center">
                        <span className="font-semibold text-white">{val}</span>
                        <span className="mt-1 h-0.5 w-8 overflow-hidden rounded-full bg-white/10">
                          <span
                            className="block h-full bg-ice-blue"
                            style={{ width: `${(s.p / maxP) * 100}%` }}
                          />
                        </span>
                      </span>
                    ) : c.key === "plusMinus" ? (
                      <span className={val > 0 ? "text-emerald-400" : val < 0 ? "text-goal-red-ink" : ""}>
                        {val > 0 ? `+${val}` : val}
                      </span>
                    ) : (
                      val
                    )}
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
}

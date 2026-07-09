"use client";

import { useEffect, useState } from "react";
import { scheduleMeta } from "@/lib/schedule";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(scheduleMeta.opener).getTime();
  // Start null to avoid an SSR/client hydration mismatch on the seconds.
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: [string, number][] = t
    ? [
        ["Days", t.days],
        ["Hrs", t.hours],
        ["Min", t.minutes],
        ["Sec", t.seconds],
      ]
    : [
        ["Days", 0],
        ["Hrs", 0],
        ["Min", 0],
        ["Sec", 0],
      ];

  return (
    <div className="flex gap-3">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[68px] rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center backdrop-blur-sm"
        >
          <div className="font-mono text-3xl font-semibold tabular-nums text-white">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-frost/50">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

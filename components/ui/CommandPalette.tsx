"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { roster, POS_LABEL } from "@/lib/players";
import { products } from "@/lib/shop";
import { articles } from "@/lib/news";
import { EASE_OUT } from "@/lib/motion";

type Item = { label: string; sub: string; href: string; group: string };

const pages: Item[] = [
  { label: "Home", sub: "Front page", href: "/", group: "Pages" },
  { label: "Team", sub: "Roster", href: "/team", group: "Pages" },
  { label: "Schedule", sub: "Fixtures & results", href: "/schedule", group: "Pages" },
  { label: "Standings", sub: "Atlantic Division", href: "/standings", group: "Pages" },
  { label: "Stats", sub: "Leaders", href: "/stats", group: "Pages" },
  { label: "News", sub: "Newsroom", href: "/news", group: "Pages" },
  { label: "Shop", sub: "Team store", href: "/shop", group: "Pages" },
  { label: "Tickets", sub: "Get in the building", href: "/tickets", group: "Pages" },
  { label: "History", sub: "Since 1917", href: "/history", group: "Pages" },
  { label: "Gallery", sub: "Photos", href: "/gallery", group: "Pages" },
  { label: "Hockey Development", sub: "Camps and clinics", href: "/youth", group: "Pages" },
  { label: "Partner with us", sub: "Sponsorship", href: "/partners", group: "Pages" },
  { label: "Contact", sub: "Get in touch", href: "/contact", group: "Pages" },
];

const index: Item[] = [
  ...pages,
  ...roster.map((p) => ({
    label: p.name,
    sub: p.kind === "goalie" ? "Goaltender" : POS_LABEL[p.pos],
    href: `/team/${p.slug}`,
    group: "Players",
  })),
  ...products.map((p) => ({
    label: p.name,
    sub: `${p.category} · CA$${p.price.toFixed(2)}`,
    href: "/shop",
    group: "Shop",
  })),
  ...articles.map((a) => ({ label: a.title, sub: a.category, href: `/news/${a.slug}`, group: "News" })),
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = !q
      ? pages
      : index.filter((i) => (i.label + " " + i.sub).toLowerCase().includes(q)).slice(0, 24);
    return list;
  }, [query]);

  useEffect(() => setActive(0), [query, open]);

  const toggle = useCallback((v: boolean) => {
    setOpen(v);
    if (v) setQuery("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
      }
    };
    const onOpenEvent = () => toggle(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("leafs:command", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("leafs:command", onOpenEvent);
    };
  }, [toggle]);

  useEffect(() => {
    if (open) {
      const html = document.documentElement;
      const prev = html.style.overflow;
      html.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 40);
      return () => {
        html.style.overflow = prev;
      };
    }
  }, [open]);

  function go(item: Item) {
    setOpen(false);
    router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-palette flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ice-void/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/12 bg-ice-void shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-frost/55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search players, pages, products, news..."
                className="w-full bg-transparent py-4 text-sm text-white placeholder:text-frost/55 focus:outline-none"
              />
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-frost/55 sm:block">ESC</kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-frost/50">No results for &ldquo;{query}&rdquo;</p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={`${item.href}-${item.label}`}
                    onMouseMove={() => setActive(i)}
                    onClick={() => go(item)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? "bg-white/[0.07]" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-sm text-white">{item.label}</span>
                      <span className="font-mono text-[11px] text-frost/55">{item.sub}</span>
                    </span>
                    <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-frost/55">
                      {item.group}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Keyboard legend: once the palette is open it teaches its own controls. */}
            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5">
              <Hint keys={["\u2191", "\u2193"]} label="Navigate" />
              <Hint keys={["\u21B5"]} label="Open" />
              <Hint keys={["esc"]} label="Close" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      {keys.map((k) => (
        <kbd
          key={k}
          className="grid h-5 min-w-[1.25rem] place-items-center rounded border border-white/15 bg-white/[0.04] px-1 font-mono text-[10px] text-frost/70"
        >
          {k}
        </kbd>
      ))}
      <span className="font-mono text-[10px] text-frost/55">{label}</span>
    </span>
  );
}

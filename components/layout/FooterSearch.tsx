"use client";

import { useEffect, useState } from "react";

/**
 * The nav no longer carries a search button, and the shortcut hint only ever fires
 * once. Without this, someone who dismissed that hint would have no visible way back
 * to the command palette. It lives quietly in the footer bar instead.
 */
export function FooterSearch() {
  const [modKey, setModKey] = useState("\u2318");

  useEffect(() => {
    if (!/mac|iphone|ipad|ipod/i.test(navigator.userAgent)) setModKey("Ctrl ");
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("leafs:command"))}
      className="group inline-flex items-center gap-2 rounded-full border border-white/12 py-1.5 pl-3 pr-2 text-xs text-frost/60 outline-none transition-colors hover:border-white/30 hover:text-white focus-visible:ring-2 focus-visible:ring-ice-blue"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      Search
      <kbd className="rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-frost/60">
        {modKey}K
      </kbd>
    </button>
  );
}

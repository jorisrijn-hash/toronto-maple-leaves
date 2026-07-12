"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_DRAWER } from "@/lib/motion";
import { whenIntroDone } from "@/lib/intro";

const SEEN_KEY = "leafs-cmdk-hint-v2";
const CONSENT_KEY = "leafs-cookie-consent-v2";

// Measured from the moment the page is visible, not from mount. The old 2500ms landed
// exactly on the intro loader's own 2500ms, so the hint opened underneath it and had
// marked itself "seen" by the time anyone could look.
const APPEAR_DELAY = 1200;
const AUTO_HIDE = 10000;

/**
 * A one time nudge telling people the command palette exists. Rules it follows:
 *
 * - shown once, ever (localStorage)
 * - never on touch-only devices, where there is no ⌘K to press
 * - queued behind the cookie banner rather than stacked on top of it
 * - dismissed the moment the palette is actually opened, by any route
 */
export function CommandHint() {
  const [show, setShow] = useState(false);
  const [modKey, setModKey] = useState("\u2318");

  const dismiss = useCallback((remember = true) => {
    if (remember) localStorage.setItem(SEEN_KEY, "1");
    setShow(false);
  }, []);

  useEffect(() => {
    // A pointer that cannot hover has no keyboard worth mentioning this to.
    const hasKeyboard = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasKeyboard) return;
    if (localStorage.getItem(SEEN_KEY)) return;

    if (!/mac|iphone|ipad|ipod/i.test(navigator.userAgent)) setModKey("Ctrl ");

    let appearTimer: number;
    let hideTimer: number;
    let stopIntro = () => {};

    const queue = () => {
      // Only start counting once the entrance animation is off the screen.
      stopIntro = whenIntroDone(() => {
        appearTimer = window.setTimeout(() => {
          setShow(true);
          hideTimer = window.setTimeout(() => dismiss(), AUTO_HIDE);
        }, APPEAR_DELAY);
      });
    };

    // Wait out the consent banner if it has not been answered yet.
    if (localStorage.getItem(CONSENT_KEY)) queue();
    else window.addEventListener("leafs:consent", queue, { once: true });

    // If they find the palette on their own, the hint has done its job.
    const onOpened = () => {
      window.clearTimeout(appearTimer);
      window.clearTimeout(hideTimer);
      dismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") onOpened();
    };
    window.addEventListener("leafs:command", onOpened);
    window.addEventListener("keydown", onKey);

    return () => {
      stopIntro();
      window.clearTimeout(appearTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("leafs:consent", queue);
      window.removeEventListener("leafs:command", onOpened);
      window.removeEventListener("keydown", onKey);
    };
  }, [dismiss]);

  function openPalette() {
    dismiss();
    window.dispatchEvent(new Event("leafs:command"));
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: EASE_DRAWER }}
          className="fixed bottom-5 left-5 z-toast"
          role="status"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/12 bg-ice-void/95 py-2 pl-4 pr-2 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={openPalette}
              className="flex items-center gap-2.5 text-sm text-frost/75 outline-none transition-colors hover:text-white focus-visible:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              Press
              <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-white">
                {modKey}K
              </kbd>
              to search
            </button>

            <button
              type="button"
              onClick={() => dismiss()}
              aria-label="Dismiss tip"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-frost/50 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-ice-blue"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

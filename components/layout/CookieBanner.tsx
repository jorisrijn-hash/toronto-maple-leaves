"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "leafs-cookie-consent-v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(KEY);
    if (!done) {
      const t = window.setTimeout(() => setShow(true), 900);
      return () => window.clearTimeout(t);
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    localStorage.setItem(KEY, value);
    setShow(false);
    // Lets the shortcut hint queue itself behind this banner instead of on top of it.
    window.dispatchEvent(new Event("leafs:consent"));
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-4 bottom-4 z-consent mx-auto max-w-2xl rounded-2xl border border-white/12 bg-ice-void/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-frost/75">
              We use cookies to improve your experience and analyse traffic. See our{" "}
              <Link href="/" className="text-ice-blue underline underline-offset-2">privacy policy</Link>.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => decide("declined")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-frost/70 transition-colors hover:border-white/30 hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={() => decide("accepted")}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

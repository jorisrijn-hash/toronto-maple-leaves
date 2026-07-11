"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "leafs-announce-dismissed-v1";

export function AnnouncementBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(KEY) === "1";
    setShow(!dismissed);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--ann-h", show ? "2.5rem" : "0px");
    return () => document.documentElement.style.setProperty("--ann-h", "0px");
  }, [show]);

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 top-0 z-announce flex h-10 items-center justify-center gap-3 bg-goal-red px-4 text-center"
        >
          <Link href="/tickets" className="flex items-center gap-2 text-[13px] font-medium text-white">
            <span className="hidden sm:inline">Pre-season tickets on sale July 23.</span>
            <span className="underline underline-offset-2">Get yours</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 grid h-6 w-6 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

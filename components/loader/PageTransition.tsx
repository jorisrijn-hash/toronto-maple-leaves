"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { assets } from "@/lib/site";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

type Phase = "idle" | "cover" | "reveal";

// Correct order: intercept internal link clicks, COVER the screen first, then navigate,
// then wipe away to reveal the new page. Because usePathname only updates after Next has
// already rendered the new route, a pathname-driven overlay always flashes the new page
// first — so we drive the cover ourselves and push the route only once covered.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [reduce, setReduce] = useState(false);
  const pending = useRef<string | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (!href || href === pathname) return;
      pending.current = href;
      setPhase("cover");
    },
    [pathname]
  );

  // Reveal once the route has actually changed.
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      if (pending.current) {
        pending.current = null;
        setPhase("reveal");
      }
    }
  }, [pathname]);

  // Global capture-phase interceptor for internal anchors.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || target === "_blank") return;
      if (/^(https?:|\/\/|mailto:|tel:|#)/.test(href)) return; // external / hash
      e.preventDefault();
      if (href === pathname) return;
      e.stopPropagation();
      navigate(href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate, pathname]);

  const variants: Variants = reduce
    ? {
        idle: { opacity: 0, transition: { duration: 0 } },
        cover: { opacity: 1, transition: { duration: 0.2 } },
        reveal: { opacity: 0, transition: { duration: 0.25 } },
      }
    : {
        idle: { y: "100%", transition: { duration: 0 } },
        cover: { y: "0%", transition: { duration: 0.42, ease: EASE_IN_OUT } },
        reveal: { y: "-100%", transition: { duration: 0.5, ease: EASE_IN_OUT } },
      };

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-lightbox grid place-items-center overflow-hidden bg-[linear-gradient(180deg,#00205b_0%,#05132b_100%)]"
      style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
      variants={variants}
      initial="idle"
      animate={phase}
      onAnimationComplete={(def) => {
        if (def === "cover" && pending.current) router.push(pending.current);
        else if (def === "reveal") setPhase("idle");
      }}
    >
      <div className="ice-grooves absolute inset-0 opacity-40" />

      <motion.div
        className="relative grid place-items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          phase === "cover"
            ? { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } }
            : { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.leaf}
          alt=""
          width={64}
          height={72}
          className="h-14 w-auto drop-shadow-[0_0_22px_rgba(99,179,255,0.55)]"
        />
      </motion.div>

      {!reduce && phase === "cover" && (
        <motion.div
          className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,17,45,0.65), #ffffff, rgba(99,179,255,0.65), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        />
      )}
    </motion.div>
  );
}

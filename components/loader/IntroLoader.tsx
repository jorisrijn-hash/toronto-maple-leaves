"use client";

import { useEffect, useState } from "react";
import { assets } from "@/lib/site";
import { markIntroDone } from "@/lib/intro";

const SESSION_KEY = "leafs-intro-seen";

// Once-per-session entrance, in the same visual language as the page transition:
// the crest lifts in with a glow, a goal-light streak sweeps across, the wordmark
// rises, then the whole panel wipes up to reveal the page.
//
// Covering styles are INLINE so the overlay hides the page from the very first paint
// (no flash of content before styled-jsx loads). Scroll is unlocked when the intro
// finishes — not only on unmount — because the component returns null but stays mounted.
export function IntroLoader() {
  const [phase, setPhase] = useState<"play" | "done">("play");

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage blocked */
    }
    if (seen) {
      setPhase("done");
      markIntroDone(); // the skipped path still has to signal
      return; // never locked scroll, nothing to restore
    }

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";

    const duration = reduce ? 650 : 2500;
    const t = window.setTimeout(() => {
      html.style.overflow = prev; // unlock here — cleanup alone won't run
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("done");
      markIntroDone();
    }, duration);

    return () => {
      window.clearTimeout(t);
      html.style.overflow = prev;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="intro"
      // Inline cover: guaranteed on first paint, before any CSS-in-JS loads.
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "linear-gradient(180deg,#00205b 0%,#05132b 60%)",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <div className="intro__grooves ice-grooves" />
      <div className="intro__glow" />

      <div className="intro__stack">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.leaf} alt="" width={132} height={148} className="intro__leaf" />
        <div className="intro__word">
          <span>Toronto</span>
          <span>Maple</span>
          <span>Leafs</span>
        </div>
      </div>

      <div className="intro__streak" />

      <style jsx>{`
        .intro {
          /* wipe the whole panel up at the end to reveal the page */
          animation: panel-up 0.7s var(--ease-drawer) 1.85s forwards;
        }
        .intro__grooves {
          position: absolute;
          inset: 0;
          opacity: 0.4;
        }
        .intro__glow {
          position: absolute;
          width: 60vmax;
          height: 60vmax;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(99, 179, 255, 0.45) 0%,
            rgba(0, 72, 141, 0.22) 38%,
            transparent 70%
          );
          filter: blur(12px);
          opacity: 0;
          transform: scale(0.5);
          animation: glow-bloom 2s var(--ease-out) forwards;
        }
        .intro__stack {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .intro__leaf {
          height: clamp(84px, 14vw, 132px);
          width: auto;
          opacity: 0;
          transform: scale(0.8) translateY(8px);
          filter: drop-shadow(0 0 28px rgba(99, 179, 255, 0.5));
          animation: leaf-in 0.7s var(--ease-out) 0.25s forwards;
        }
        .intro__word {
          display: flex;
          gap: 0.5ch;
          font-family: var(--font-display), Impact, sans-serif;
          text-transform: uppercase;
          font-size: clamp(1.5rem, 5vw, 3rem);
          letter-spacing: 0.02em;
          color: #fff;
        }
        .intro__word span {
          opacity: 0;
          transform: translateY(16px);
          filter: blur(6px);
          animation: word-in 0.55s var(--ease-out) forwards;
        }
        .intro__word span:nth-child(1) { animation-delay: 0.85s; }
        .intro__word span:nth-child(2) { animation-delay: 0.95s; }
        .intro__word span:nth-child(3) { animation-delay: 1.05s; }
        .intro__streak {
          position: absolute;
          inset-inline: 0;
          top: 50%;
          height: 3px;
          transform: translateY(-50%) scaleX(0);
          transform-origin: left;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(232, 17, 45, 0.7),
            #ffffff,
            rgba(99, 179, 255, 0.7),
            transparent
          );
          opacity: 0;
          animation: streak 0.7s var(--ease-out) 1.2s;
        }

        @keyframes glow-bloom {
          0% { opacity: 0; transform: scale(0.5); }
          45% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(1.12); }
        }
        @keyframes leaf-in {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes word-in {
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes streak {
          0% { opacity: 0; transform: translateY(-50%) scaleX(0); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-50%) scaleX(1); }
        }
        @keyframes panel-up {
          to { transform: translateY(-100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro { animation: panel-fade 0.4s ease 0.4s forwards; }
          .intro__glow { animation: none; opacity: 0.3; transform: scale(1); }
          .intro__streak { display: none; }
          .intro__leaf { animation: fade-only 0.3s ease forwards; transform: none; }
          .intro__word span { animation: fade-only 0.3s ease forwards; transform: none; filter: none; }
          @keyframes fade-only { from { opacity: 0; } to { opacity: 1; } }
          @keyframes panel-fade { to { opacity: 0; visibility: hidden; } }
        }
      `}</style>
    </div>
  );
}

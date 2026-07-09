"use client";

import { useEffect, useState } from "react";
import { assets } from "@/lib/site";

const SESSION_KEY = "leafs-intro-seen";

// Detailed, once-per-session entrance built around the real crest: a clip-path wipe
// reveals the logo out of the ice, a light sheen sweeps across it, then a goal-light
// horn flash and a curtain lift. CSS-driven so it stays smooth during hydration.
export function IntroLoader() {
  const [phase, setPhase] = useState<"play" | "done">("play");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage blocked — just play it */
    }
    if (seen) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    const duration = reduce ? 700 : 2500;
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("done");
    }, duration);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__glow" />
      <div className="intro__crest">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.logoWhite} alt="" className="intro__logo" width={220} height={246} />
        <span className="intro__sheen" />
      </div>
      <div className="intro__horn" />
      <div className="intro__curtain" />

      <style jsx>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: #05132b;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .intro__glow {
          position: absolute;
          width: 60vmax;
          height: 60vmax;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(99, 179, 255, 0.45) 0%,
            rgba(0, 72, 141, 0.25) 35%,
            transparent 70%
          );
          filter: blur(12px);
          transform: scale(0.4);
          opacity: 0;
          animation: glow-bloom 2.2s var(--ease-out) forwards;
        }
        .intro__crest {
          position: relative;
          width: clamp(160px, 26vw, 240px);
          aspect-ratio: 290 / 325;
        }
        .intro__logo {
          width: 100%;
          height: 100%;
          /* Reveal out of the ice: wipe up + settle from a slight scale/blur. */
          clip-path: inset(100% 0 0 0);
          transform: scale(0.94);
          filter: blur(6px) drop-shadow(0 10px 40px rgba(99, 179, 255, 0.35));
          animation: crest-reveal 1s var(--ease-in-out) 0.25s forwards;
        }
        .intro__sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 60%
          );
          transform: translateX(-130%) skewX(-12deg);
          opacity: 0;
          animation: sheen 0.9s var(--ease-out) 1.15s;
        }
        .intro__horn {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            100deg,
            transparent 46%,
            rgba(232, 17, 45, 0.35) 50%,
            rgba(255, 255, 255, 0.85) 52%,
            transparent 58%
          );
          transform: translateX(-120%);
          animation: horn 0.65s var(--ease-out) 1.55s;
        }
        .intro__curtain {
          position: absolute;
          inset: 0;
          background: #05132b;
          transform: translateY(0);
          animation: curtain 0.7s var(--ease-drawer) 1.85s forwards;
        }

        @keyframes glow-bloom {
          0% { opacity: 0; transform: scale(0.4); }
          45% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.35; transform: scale(1.15); }
        }
        @keyframes crest-reveal {
          to { clip-path: inset(0 0 0 0); transform: scale(1); filter: blur(0) drop-shadow(0 10px 40px rgba(99, 179, 255, 0.35)); }
        }
        @keyframes sheen {
          0% { opacity: 0; transform: translateX(-130%) skewX(-12deg); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateX(230%) skewX(-12deg); }
        }
        @keyframes horn {
          to { transform: translateX(120%); }
        }
        @keyframes curtain {
          to { transform: translateY(-100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro__glow { animation: none; opacity: 0.3; transform: scale(1); }
          .intro__sheen,
          .intro__horn,
          .intro__curtain { animation: none; opacity: 0; }
          .intro__logo {
            animation: fade-only 0.4s ease forwards;
            clip-path: inset(0 0 0 0);
            transform: none;
            filter: none;
          }
          @keyframes fade-only { from { opacity: 0.4; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}

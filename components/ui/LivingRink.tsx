"use client";

// Ambient energy layer behind all content: drifting blue light pools, a slow field of
// floating ice motes, and an etched-ice texture. Transform/opacity only, fixed, inert.
// Deterministic particle positions (no Math.random) to avoid hydration mismatch.
const MOTES = [
  { l: 8, t: 18, s: 3, d: 15, delay: 0 },
  { l: 22, t: 62, s: 2, d: 19, delay: 2 },
  { l: 35, t: 30, s: 4, d: 22, delay: 1 },
  { l: 48, t: 78, s: 2, d: 17, delay: 3 },
  { l: 61, t: 22, s: 3, d: 20, delay: 0.5 },
  { l: 73, t: 55, s: 2, d: 24, delay: 2.5 },
  { l: 85, t: 34, s: 4, d: 18, delay: 1.5 },
  { l: 92, t: 70, s: 2, d: 21, delay: 3.5 },
  { l: 14, t: 88, s: 3, d: 16, delay: 1 },
  { l: 55, t: 12, s: 2, d: 23, delay: 2 },
  { l: 40, t: 50, s: 3, d: 19, delay: 4 },
  { l: 68, t: 84, s: 2, d: 17, delay: 0.8 },
];

export function LivingRink() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 ice-grooves opacity-50" />
      <div className="rink-glow rink-glow--a" />
      <div className="rink-glow rink-glow--b" />
      <div className="rink-glow rink-glow--c" />

      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{
            left: `${m.l}%`,
            top: `${m.t}%`,
            width: m.s,
            height: m.s,
            animationDuration: `${m.d}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      <div className="rink-vignette" />

      <style jsx>{`
        .rink-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          will-change: transform;
        }
        .rink-glow--a {
          top: -12%;
          left: -8%;
          width: 52vmax;
          height: 52vmax;
          background: radial-gradient(circle, rgba(0, 72, 141, 0.85), transparent 62%);
          opacity: 0.7;
          animation: drift-a 20s ease-in-out infinite;
        }
        .rink-glow--b {
          bottom: -16%;
          right: -8%;
          width: 48vmax;
          height: 48vmax;
          background: radial-gradient(circle, rgba(99, 179, 255, 0.5), transparent 62%);
          opacity: 0.55;
          animation: drift-b 26s ease-in-out infinite;
        }
        .rink-glow--c {
          top: 35%;
          left: 40%;
          width: 34vmax;
          height: 34vmax;
          background: radial-gradient(circle, rgba(0, 72, 141, 0.5), transparent 65%);
          opacity: 0.45;
          animation: drift-c 30s ease-in-out infinite;
        }
        .mote {
          position: absolute;
          border-radius: 50%;
          background: #9fd0ff;
          box-shadow: 0 0 8px rgba(99, 179, 255, 0.9);
          opacity: 0.35;
          animation-name: mote-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .rink-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(130% 130% at 50% 40%, transparent 62%, rgba(5, 19, 43, 0.7) 100%);
        }
        @keyframes drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(8%, 5%, 0) scale(1.1); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-6%, -7%, 0) scale(1.14); }
        }
        @keyframes drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.45; }
          50% { transform: translate3d(-8%, 6%, 0) scale(1.2); opacity: 0.25; }
        }
        @keyframes mote-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(-40px) translateX(12px); opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rink-glow,
          .mote { animation: none; }
        }
      `}</style>
    </div>
  );
}

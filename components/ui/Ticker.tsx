"use client";

// Single-line seamless marquee that always moves. One track holds the items repeated
// enough to exceed the widest viewport, duplicated once; translating the track by -50%
// loops gaplessly. Motion is intentional here (the client asked for constant movement).
const BASE = [
  "Original Six",
  "Est. 1917",
  "13 Stanley Cups",
  "Scotiabank Arena",
  "Blue & White",
  "Leafs Nation",
];

// One half of the track: repeat the base list so it comfortably spans wide screens.
const HALF = Array.from({ length: 4 }, () => BASE).flat();

export function Ticker() {
  return (
    <div className="marquee border-y border-white/10 bg-rink-navy/40 py-4">
      <div className="marquee__track">
        {[...HALF, ...HALF].map((item, i) => (
          <span key={i} className="marquee__item">
            <span className="text-ice-blue">◆</span>
            <span className="font-display text-lg tracking-wide text-white/90">{item}</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          user-select: none;
        }
        .marquee__track {
          display: inline-flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 2.5rem;
          width: max-content;
          will-change: transform;
          animation: ticker 45s linear infinite;
        }
        .marquee__item {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          white-space: nowrap;
        }
        .marquee:hover .marquee__track {
          animation-play-state: paused;
        }
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

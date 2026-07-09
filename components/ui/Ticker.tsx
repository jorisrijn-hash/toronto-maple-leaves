"use client";

// Seamless marquee via two identical groups that each translate -100%: when the first
// exits left, the second is already in place, so the loop never gaps or stops.
// Pauses on hover. Facts only. (Note: disabled under prefers-reduced-motion by design.)
const ITEMS = [
  "Original Six",
  "Est. 1917",
  "13 Stanley Cups",
  "Scotiabank Arena",
  "Blue & White",
  "Leafs Nation",
];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee__group" aria-hidden={hidden}>
      {ITEMS.map((item, i) => (
        <span key={i} className="marquee__item">
          <span className="text-ice-blue">◆</span>
          <span className="font-display text-lg tracking-wide text-white/90">{item}</span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="marquee border-y border-white/10 bg-rink-navy/40 py-4">
      <Group />
      <Group hidden />
      <style jsx>{`
        .marquee {
          display: flex;
          overflow: hidden;
          user-select: none;
        }
        .marquee__group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 2.5rem;
          padding-right: 2.5rem;
          min-width: max-content;
          animation: scroll 28s linear infinite;
        }
        .marquee:hover .marquee__group {
          animation-play-state: paused;
        }
        .marquee__item {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          white-space: nowrap;
        }
        @keyframes scroll {
          to {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            justify-content: center;
          }
          .marquee__group {
            animation: none;
          }
          .marquee__group[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

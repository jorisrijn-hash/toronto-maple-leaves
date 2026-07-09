"use client";

// Seamless marquee. Each group repeats the items enough times to exceed any viewport
// width, so there is never empty space, and two identical groups translate -100% for a
// gapless loop. Under reduced motion the track simply stops moving but still fills the
// bar (it stays wider than the viewport), rather than collapsing to a half-width row.
const ITEMS = [
  "Original Six",
  "Est. 1917",
  "13 Stanley Cups",
  "Scotiabank Arena",
  "Blue & White",
  "Leafs Nation",
];

// Repeat so a single group is always wide enough to fill the widest screens.
const REPEAT = 4;

function Group({ hidden }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEAT }, () => ITEMS).flat();
  return (
    <div className="marquee__group" aria-hidden={hidden}>
      {items.map((item, i) => (
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
          animation: scroll 40s linear infinite;
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
          .marquee__group {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

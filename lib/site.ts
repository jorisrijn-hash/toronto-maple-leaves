// Single source of truth for the site. Keep content/config here, not in components.
// Team data (roster, stats, trophies, schedule) is researched and added in later phases.

export const site = {
  name: "Toronto Maple Leafs",
  shortName: "Maple Leafs",
  tagline: "Blue and white since 1917.",
  locale: "en",
  arena: "Scotiabank Arena",
  city: "Toronto, ON",
  // Google Maps deep link for the arena.
  arenaMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Scotiabank+Arena+Toronto",
  // NOTE: this is a concept redesign for portfolio purposes.
  disclaimer:
    "Concept redesign. Toronto Maple Leafs, the leaf logo and NHL marks are trademarks of MLSE / the National Hockey League.",
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Team", href: "/team" },
  { label: "Schedule", href: "/schedule" },
  { label: "Standings", href: "/standings" },
  { label: "Stats", href: "/stats" },
  { label: "News", href: "/news" },
  { label: "Youth", href: "/youth" },
  { label: "Shop", href: "/shop" },
];

// Assets to drop into /public once re-uploaded. Components read from here so a
// missing file degrades gracefully instead of hard-crashing.
export const assets = {
  logo: "/brand/logo.svg", // full lockup, navy — use on light surfaces
  logoWhite: "/brand/logo-white.svg", // lockup recolored for dark surfaces
  leaf: "/brand/leaf-white.svg", // white leaf silhouette — small icon
  heroVideo: "/media/hero.mp4",
  heroPoster: "/media/hero-poster.jpg",
  // photography
  celebration: "/media/celebration.jpg",
  gameAction: "/media/game-action.webp",
  minten: "/media/minten.jpg",
  feature: "/media/feature.jpg",
  news: "/media/news.jpg",
} as const;

// Colors mirrored from tailwind config for use in canvas/SVG/inline styles.
export const palette = {
  iceVoid: "#05132B",
  rinkNavy: "#00205B",
  leafsBlue: "#00488D",
  iceBlue: "#63B3FF",
  frost: "#E8F1FF",
  white: "#FFFFFF",
  goalRed: "#E8112D",
} as const;

// 2026-27 pre-season schedule, announced by the club on 8 July 2026 and cross-checked
// across Yahoo Sports, The Hockey News and thebiglead. Four split-squad games over two
// days vs the Original Six / divisional rivals Montreal and Ottawa. Times and broadcast
// details are TBA; tickets go on sale 23 July 2026.

export const scheduleMeta = {
  label: "Pre-season 2026-27",
  ticketsOnSale: "July 23, 2026",
  opener: "2026-09-19T19:00:00-04:00", // first game day (time TBA; placeholder 7pm ET)
  note: "Split-squad games. Game times and broadcast details to be announced.",
} as const;

export type Game = {
  id: string;
  date: string; // ISO date
  weekday: string;
  month: string;
  day: number;
  opponent: string;
  abbr: string;
  home: boolean;
  venue: string;
};

export const games: Game[] = [
  {
    id: "mtl-away",
    date: "2026-09-19",
    weekday: "Sat",
    month: "Sep",
    day: 19,
    opponent: "Montreal Canadiens",
    abbr: "MTL",
    home: false,
    venue: "Bell Centre",
  },
  {
    id: "mtl-home",
    date: "2026-09-19",
    weekday: "Sat",
    month: "Sep",
    day: 19,
    opponent: "Montreal Canadiens",
    abbr: "MTL",
    home: true,
    venue: "Scotiabank Arena",
  },
  {
    id: "ott-away",
    date: "2026-09-23",
    weekday: "Wed",
    month: "Sep",
    day: 23,
    opponent: "Ottawa Senators",
    abbr: "OTT",
    home: false,
    venue: "Canadian Tire Centre",
  },
  {
    id: "ott-home",
    date: "2026-09-23",
    weekday: "Wed",
    month: "Sep",
    day: 23,
    opponent: "Ottawa Senators",
    abbr: "OTT",
    home: true,
    venue: "Scotiabank Arena",
  },
];

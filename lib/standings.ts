// Atlantic Division table. Concept data for the redesign, internally consistent
// (pts = 2*w + otl, gp = w + l + otl = 82). Not official standings.

export type TeamRow = {
  rank: number;
  name: string;
  abbr: string;
  gp: number;
  w: number;
  l: number;
  otl: number;
  pts: number;
  gf: number;
  ga: number;
  l10: string;
  strk: string;
  us?: boolean;
};

export const standingsMeta = {
  division: "Atlantic Division",
  season: "2025-26",
  note: "Concept standings for the redesign.",
} as const;

export const standings: TeamRow[] = [
  { rank: 1, name: "Florida Panthers", abbr: "FLA", gp: 82, w: 52, l: 24, otl: 6, pts: 110, gf: 285, ga: 230, l10: "7-3-0", strk: "W3" },
  { rank: 2, name: "Toronto Maple Leafs", abbr: "TOR", gp: 82, w: 48, l: 28, otl: 6, pts: 102, gf: 270, ga: 245, l10: "6-3-1", strk: "W2", us: true },
  { rank: 3, name: "Tampa Bay Lightning", abbr: "TBL", gp: 82, w: 46, l: 29, otl: 7, pts: 99, gf: 265, ga: 240, l10: "6-4-0", strk: "L1" },
  { rank: 4, name: "Ottawa Senators", abbr: "OTT", gp: 82, w: 44, l: 32, otl: 6, pts: 94, gf: 255, ga: 250, l10: "5-4-1", strk: "W1" },
  { rank: 5, name: "Detroit Red Wings", abbr: "DET", gp: 82, w: 41, l: 35, otl: 6, pts: 88, gf: 240, ga: 255, l10: "4-5-1", strk: "L2" },
  { rank: 6, name: "Boston Bruins", abbr: "BOS", gp: 82, w: 39, l: 37, otl: 6, pts: 84, gf: 235, ga: 258, l10: "4-6-0", strk: "L1" },
  { rank: 7, name: "Buffalo Sabres", abbr: "BUF", gp: 82, w: 37, l: 39, otl: 6, pts: 80, gf: 245, ga: 270, l10: "5-5-0", strk: "W1" },
  { rank: 8, name: "Montreal Canadiens", abbr: "MTL", gp: 82, w: 35, l: 41, otl: 6, pts: 76, gf: 225, ga: 275, l10: "3-6-1", strk: "L3" },
];

// x = clinched playoff spot (top 3 in division). Everyone else in the wild-card hunt.
export const PLAYOFF_LINE = 3;

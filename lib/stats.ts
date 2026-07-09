// Stats data. Skater + goalie lines are transcribed from the client's provided
// 2025-26 screenshots (nhl.com/mapleleafs/stats). Every skater reconciles G + A = P;
// every goalie reconciles SV + GA = SA, so SV% and GAA match the printed values.
// Franchise records are sourced from Hockey-Reference / Britannica (see comments).

export const statContext = {
  season: "2025-26",
  type: "Regular Season",
} as const;

export type Skater = {
  rank: number;
  name: string;
  pos: "C" | "LW" | "RW" | "D";
  gp: number;
  g: number;
  a: number;
  p: number;
  photo?: string;
  plusMinus: number;
  pim: number;
  ppg: number;
  shg: number;
  gwg: number;
  otg: number;
};

// Top scorers (leaders shown on the club stats page).
export const skaters: Skater[] = [
  { rank: 1, name: "William Nylander", photo: "/players/nylander.png", pos: "RW", gp: 65, g: 30, a: 49, p: 79, plusMinus: -14, pim: 16, ppg: 7, shg: 0, gwg: 4, otg: 3 },
  { rank: 2, name: "John Tavares", photo: "/players/tavares.png", pos: "C", gp: 82, g: 31, a: 40, p: 71, plusMinus: -28, pim: 12, ppg: 12, shg: 0, gwg: 4, otg: 2 },
  { rank: 3, name: "Matthew Knies", photo: "/players/knies.png", pos: "LW", gp: 79, g: 23, a: 43, p: 66, plusMinus: -30, pim: 29, ppg: 6, shg: 1, gwg: 3, otg: 2 },
  { rank: 4, name: "Auston Matthews", photo: "/players/matthews.png", pos: "C", gp: 60, g: 27, a: 26, p: 53, plusMinus: -4, pim: 18, ppg: 5, shg: 0, gwg: 3, otg: 1 },
  { rank: 5, name: "Matias Maccelli", pos: "LW", gp: 71, g: 14, a: 25, p: 39, plusMinus: -23, pim: 16, ppg: 2, shg: 0, gwg: 2, otg: 0 },
  { rank: 6, name: "Oliver Ekman-Larsson", photo: "/players/ekman-larsson.png", pos: "D", gp: 78, g: 8, a: 31, p: 39, plusMinus: -6, pim: 70, ppg: 0, shg: 0, gwg: 0, otg: 0 },
  { rank: 7, name: "Max Domi", photo: "/players/domi.png", pos: "C", gp: 80, g: 12, a: 24, p: 36, plusMinus: -29, pim: 95, ppg: 2, shg: 0, gwg: 3, otg: 1 },
  { rank: 8, name: "Morgan Rielly", photo: "/players/rielly.png", pos: "D", gp: 78, g: 11, a: 25, p: 36, plusMinus: -18, pim: 29, ppg: 1, shg: 0, gwg: 2, otg: 0 },
  { rank: 9, name: "Bobby McMann", pos: "LW", gp: 60, g: 19, a: 13, p: 32, plusMinus: -3, pim: 40, ppg: 2, shg: 0, gwg: 3, otg: 0 },
  { rank: 10, name: "Nicholas Robertson", pos: "LW", gp: 78, g: 16, a: 16, p: 32, plusMinus: -13, pim: 10, ppg: 2, shg: 0, gwg: 2, otg: 0 },
  { rank: 11, name: "Easton Cowan", pos: "RW", gp: 66, g: 11, a: 18, p: 29, plusMinus: -5, pim: 45, ppg: 0, shg: 0, gwg: 1, otg: 1 },
];

export type Goalie = {
  rank: number;
  name: string;
  gp: number;
  gs: number;
  w: number;
  l: number;
  otl: number;
  gaa: number;
  svPct: number; // 0-1
  photo?: string;
  sa: number;
  sv: number;
  ga: number;
};

export const goalies: Goalie[] = [
  { rank: 1, name: "Joseph Woll", gp: 39, gs: 38, w: 15, l: 16, otl: 7, gaa: 3.34, svPct: 0.899, sa: 1220, sv: 1097, ga: 124 },
  { rank: 2, name: "Anthony Stolarz", photo: "/players/stolarz.png", gp: 26, gs: 25, w: 10, l: 10, otl: 4, gaa: 3.28, svPct: 0.893, sa: 708, sv: 632, ga: 76 },
  { rank: 3, name: "Dennis Hildeby", gp: 20, gs: 14, w: 5, l: 7, otl: 4, gaa: 2.86, svPct: 0.914, sa: 548, sv: 501, ga: 48 },
  { rank: 4, name: "Cayden Primeau", gp: 3, gs: 3, w: 2, l: 1, otl: 0, gaa: 4.3, svPct: 0.838, sa: 80, sv: 67, ga: 13 },
  { rank: 5, name: "Artur Akhtyamov", gp: 3, gs: 2, w: 0, l: 2, otl: 0, gaa: 5.24, svPct: 0.877, sa: 81, sv: 71, ga: 11 },
];

// Franchise records — Hockey-Reference (hockey-reference.com/teams/TOR) & Britannica.
export const franchise = {
  founded: 1917,
  cups: 13,
  cupYears: [1918, 1922, 1932, 1942, 1945, 1947, 1948, 1949, 1951, 1962, 1963, 1964, 1967],
  records: [
    { label: "All-time points", holder: "Mats Sundin", value: 987, unit: "PTS" },
    { label: "All-time goals", holder: "Auston Matthews", value: 428, unit: "G" },
    { label: "Points, one season", holder: "Doug Gilmour", value: 127, unit: "PTS", note: "1992-93" },
    { label: "Goals, one season", holder: "Auston Matthews", value: 69, unit: "G", note: "2023-24" },
  ],
} as const;

// Derived leaders for the spotlight row.
export const leaders = {
  points: skaters[0], // Nylander 79
  goals: [...skaters].sort((a, b) => b.g - a.g)[0], // Tavares 31
  savePct: [...goalies].filter((g) => g.gp >= 20).sort((a, b) => b.svPct - a.svPct)[0], // Hildeby .914
};

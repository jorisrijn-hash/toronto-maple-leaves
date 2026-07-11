import { games, type Game } from "./schedule";
import { skaters, goalies } from "./stats";

// Projected lines built from the roster (best-effort by position). Concept only.
const fwds = skaters.filter((s) => s.pos !== "D");
const dmen = skaters.filter((s) => s.pos === "D");

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export const lines = chunk(fwds, 3).map((l) => l.map((p) => p.name));
export const pairs = chunk(dmen, 2).map((p) => p.map((d) => d.name));
export const starter = goalies[0].name; // rank 1

export type ScoringPlay = {
  period: number;
  time: string;
  team: "TOR" | "OPP";
  scorer: string;
  assists: string[];
  strength: "EV" | "PP" | "SH";
};

export type MatchDetail = {
  id: string;
  final: boolean;
  game: Game;
  score?: { tor: number; opp: number };
  periods?: { tor: number; opp: number }[];
  shots?: { tor: number; opp: number };
  scoring?: ScoringPlay[];
  stars?: { name: string; line: string }[];
};

// One completed concept exhibition, so the boxscore + recap have real content.
const demoFinal: MatchDetail = {
  id: "demo-final",
  final: true,
  game: {
    id: "demo-final",
    date: "2026-09-19",
    weekday: "Sat",
    month: "Sep",
    day: 19,
    opponent: "Montreal Canadiens",
    abbr: "MTL",
    home: true,
    venue: "Scotiabank Arena",
    logo: "/logos/mtl.jpg",
  },
  score: { tor: 4, opp: 2 },
  periods: [
    { tor: 1, opp: 1 },
    { tor: 2, opp: 1 },
    { tor: 1, opp: 0 },
  ],
  shots: { tor: 34, opp: 27 },
  scoring: [
    { period: 1, time: "08:12", team: "TOR", scorer: "Auston Matthews", assists: ["William Nylander", "Morgan Rielly"], strength: "EV" },
    { period: 1, time: "14:47", team: "OPP", scorer: "Montreal Canadiens", assists: [], strength: "PP" },
    { period: 2, time: "03:31", team: "TOR", scorer: "William Nylander", assists: ["John Tavares"], strength: "PP" },
    { period: 2, time: "11:09", team: "TOR", scorer: "Matthew Knies", assists: ["Auston Matthews", "Morgan Rielly"], strength: "EV" },
    { period: 2, time: "17:58", team: "OPP", scorer: "Montreal Canadiens", assists: [], strength: "EV" },
    { period: 3, time: "06:22", team: "TOR", scorer: "John Tavares", assists: ["Max Domi"], strength: "EV" },
  ],
  stars: [
    { name: "William Nylander", line: "1G 1A" },
    { name: "Auston Matthews", line: "1G 1A" },
    { name: starter, line: "25 saves" },
  ],
};

export const previews: MatchDetail[] = games.map((g) => ({ id: g.id, final: false, game: g }));

export const allMatches: MatchDetail[] = [demoFinal, ...previews];

export function getMatch(id: string): MatchDetail | undefined {
  return allMatches.find((m) => m.id === id);
}

export const latestResult = demoFinal;

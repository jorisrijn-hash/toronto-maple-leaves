import { skaters, goalies, type Skater, type Goalie } from "./stats";

export type RosterPlayer =
  | ({ kind: "skater"; slug: string } & Skater)
  | ({ kind: "goalie"; slug: string } & Goalie);

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const POS_LABEL: Record<Skater["pos"], string> = {
  C: "Centre",
  LW: "Left Wing",
  RW: "Right Wing",
  D: "Defence",
};

export const roster: RosterPlayer[] = [
  ...skaters.map((s) => ({ kind: "skater" as const, slug: slugify(s.name), ...s })),
  ...goalies.map((g) => ({ kind: "goalie" as const, slug: slugify(g.name), ...g })),
];

export function getPlayer(slug: string): RosterPlayer | undefined {
  return roster.find((p) => p.slug === slug);
}

export function getPlayerByName(name: string): RosterPlayer | undefined {
  return roster.find((p) => p.name === name);
}

// Fallback monogram for the eight skaters without a headshot.
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

// Descriptive blurb derived only from the player's own stat line, so nothing is invented.
export function playerBlurb(p: RosterPlayer): string {
  if (p.kind === "goalie") {
    const sv = p.svPct.toFixed(3).replace(/^0/, "");
    return `Between the pipes for the Maple Leafs, ${p.name} posted a ${sv} save percentage and a ${p.gaa.toFixed(
      2
    )} goals-against average across ${p.gp} appearances in ${statSeason}, backstopping the club to ${p.w} wins.`;
  }
  const role = POS_LABEL[p.pos].toLowerCase();
  const shooter = p.g >= p.a ? "a finisher who leans on his shot" : "a playmaker who drives offence for his line";
  return `A ${role} for the Maple Leafs, ${p.name} is ${shooter}. In ${statSeason} he produced ${p.g} goals and ${p.a} assists for ${p.p} points across ${p.gp} games.`;
}

const statSeason = "2025-26";

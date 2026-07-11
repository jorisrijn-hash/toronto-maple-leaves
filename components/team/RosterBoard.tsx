"use client";

import { useState } from "react";
import { roster, type RosterPlayer } from "@/lib/players";
import { RosterSection } from "@/components/team/RosterSection";
import { PlayerCard } from "@/components/team/PlayerCard";
import { GoalieCard } from "@/components/team/GoalieCard";
import { PlayerDrawer } from "@/components/team/PlayerDrawer";

export function RosterBoard() {
  const [selected, setSelected] = useState<RosterPlayer | null>(null);

  const forwards = roster.filter((p) => p.kind === "skater" && p.pos !== "D");
  const defence = roster.filter((p) => p.kind === "skater" && p.pos === "D");
  const goaltenders = roster.filter((p) => p.kind === "goalie");

  return (
    <>
      <RosterSection kicker="Up front" title="Forwards" count={forwards.length}>
        {forwards.map((p) =>
          p.kind === "skater" ? (
            <PlayerCard key={p.slug} player={p} onOpen={() => setSelected(p)} />
          ) : null
        )}
      </RosterSection>

      <RosterSection kicker="On the blue line" title="Defence" count={defence.length}>
        {defence.map((p) =>
          p.kind === "skater" ? (
            <PlayerCard key={p.slug} player={p} onOpen={() => setSelected(p)} />
          ) : null
        )}
      </RosterSection>

      <RosterSection kicker="Between the pipes" title="Goaltenders" count={goaltenders.length}>
        {goaltenders.map((p) =>
          p.kind === "goalie" ? (
            <GoalieCard key={p.slug} goalie={p} onOpen={() => setSelected(p)} />
          ) : null
        )}
      </RosterSection>

      <PlayerDrawer player={selected} onClose={() => setSelected(null)} />
    </>
  );
}

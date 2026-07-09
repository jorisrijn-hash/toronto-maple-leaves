import { TeamHeader } from "@/components/team/TeamHeader";
import { RosterSection } from "@/components/team/RosterSection";
import { PlayerCard } from "@/components/team/PlayerCard";
import { GoalieCard } from "@/components/team/GoalieCard";
import { skaters, goalies } from "@/lib/stats";

export const metadata = { title: "Team" };

export default function TeamPage() {
  const forwards = skaters.filter((s) => s.pos !== "D");
  const defence = skaters.filter((s) => s.pos === "D");

  return (
    <div className="pb-28">
      <TeamHeader forwards={forwards.length} defence={defence.length} goalies={goalies.length} />

      <RosterSection kicker="Up front" title="Forwards" count={forwards.length}>
        {forwards.map((p) => (
          <PlayerCard key={p.name} player={p} />
        ))}
      </RosterSection>

      <RosterSection kicker="On the blue line" title="Defence" count={defence.length}>
        {defence.map((p) => (
          <PlayerCard key={p.name} player={p} />
        ))}
      </RosterSection>

      <RosterSection kicker="Between the pipes" title="Goaltenders" count={goalies.length}>
        {goalies.map((g) => (
          <GoalieCard key={g.name} goalie={g} />
        ))}
      </RosterSection>
    </div>
  );
}

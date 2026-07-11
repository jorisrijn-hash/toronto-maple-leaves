import { TeamHeader } from "@/components/team/TeamHeader";
import { RosterBoard } from "@/components/team/RosterBoard";
import { skaters, goalies } from "@/lib/stats";

export const metadata = { title: "Team" };

export default function TeamPage() {
  const forwards = skaters.filter((s) => s.pos !== "D");
  const defence = skaters.filter((s) => s.pos === "D");

  return (
    <div className="pb-28">
      <TeamHeader forwards={forwards.length} defence={defence.length} goalies={goalies.length} />
      <RosterBoard />
    </div>
  );
}

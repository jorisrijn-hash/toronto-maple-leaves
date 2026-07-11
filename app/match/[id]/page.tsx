import Link from "next/link";
import { notFound } from "next/navigation";
import { allMatches, getMatch } from "@/lib/matches";
import { MatchCenter } from "@/components/schedule/MatchCenter";

export function generateStaticParams() {
  return allMatches.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const m = getMatch(params.id);
  return { title: m ? `Leafs vs ${m.game.opponent}` : "Match" };
}

export default function MatchPage({ params }: { params: { id: string } }) {
  const match = getMatch(params.id);
  if (!match) notFound();

  return (
    <div className="pb-28 pt-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Link href="/schedule" className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-frost/60 transition-colors hover:text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          Schedule
        </Link>
        <MatchCenter match={match} />
      </div>
    </div>
  );
}

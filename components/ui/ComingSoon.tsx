import Link from "next/link";
import { assets } from "@/lib/site";

// Empty-state with direction, not mood. Each page ships in a later phase.
export function ComingSoon({
  title,
  phase,
  blurb,
}: {
  title: string;
  phase: string;
  blurb: string;
}) {
  return (
    <section className="mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assets.leaf} alt="" width={64} height={72} className="mb-8 h-16 w-auto opacity-70 animate-float-slow" />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">{phase}</p>
      <h1 className="mt-4 font-display text-6xl text-white md:text-7xl">{title}</h1>
      <p className="mt-5 max-w-md text-balance text-frost/70">{blurb}</p>
      <Link
        href="/"
        className="mt-9 inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
      >
        Back to home
      </Link>
    </section>
  );
}

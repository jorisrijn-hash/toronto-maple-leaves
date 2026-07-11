import Link from "next/link";
import { assets } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(0,72,141,0.35),rgba(5,19,43,0)_60%)]" />
      <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assets.leaf} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />

      <p className="font-mono text-xs uppercase tracking-[0.4em] text-ice-blue">Offside</p>
      <h1 className="mt-6 font-display text-[28vw] leading-[0.8] text-white sm:text-[12rem]">404</h1>
      <p className="mt-6 max-w-md text-frost/70">
        This play is offside. The page you were looking for isn&apos;t on the ice.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
        >
          Back home
        </Link>
        <Link
          href="/schedule"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-frost/80 transition-colors hover:border-white/30 hover:text-white"
        >
          View schedule
        </Link>
      </div>
    </div>
  );
}

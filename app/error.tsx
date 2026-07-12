"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route level error boundary. Without this, a render error drops the visitor on the
// bare Next.js error screen, which looks like a broken site rather than a handled one.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire this to your error reporter (Sentry, Vercel) when the site goes live.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(0,72,141,0.35),rgba(5,19,43,0)_60%)]" />
      <div className="ice-grooves absolute inset-0 -z-10 opacity-25" />

      <p className="font-mono text-xs uppercase tracking-[0.4em] text-ice-blue">Play stopped</p>
      <h1 className="mt-6 font-display text-[18vw] leading-[0.85] text-white sm:text-8xl">
        Whistle
      </h1>
      <p className="mt-6 max-w-[45ch] text-pretty text-frost/70">
        Something went wrong at our end. The play is dead and we are resetting for the face-off.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-frost/80 transition-colors hover:border-white/30 hover:text-white"
        >
          Back home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 font-mono text-[11px] text-frost/50">Reference: {error.digest}</p>
      )}
    </div>
  );
}

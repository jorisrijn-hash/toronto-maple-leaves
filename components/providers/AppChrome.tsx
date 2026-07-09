"use client";

import { IntroLoader } from "@/components/loader/IntroLoader";
import { PageTransition } from "@/components/loader/PageTransition";
import { CursorFX } from "@/components/ui/CursorFX";

// Global chrome: entrance loader, inter-page transition, cursor effects.
export function AppChrome() {
  return (
    <>
      <IntroLoader />
      <PageTransition />
      <CursorFX />
    </>
  );
}

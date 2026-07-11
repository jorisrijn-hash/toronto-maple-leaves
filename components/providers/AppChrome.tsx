"use client";

import { IntroLoader } from "@/components/loader/IntroLoader";
import { PageTransition } from "@/components/loader/PageTransition";
import { CursorFX } from "@/components/ui/CursorFX";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CommandPalette } from "@/components/ui/CommandPalette";

// Global chrome: announcement bar, entrance loader, page transition, cursor FX,
// cookie consent and the command palette (Cmd/Ctrl+K).
export function AppChrome() {
  return (
    <>
      <AnnouncementBar />
      <IntroLoader />
      <PageTransition />
      <CursorFX />
      <CookieBanner />
      <CommandPalette />
    </>
  );
}

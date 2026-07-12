"use client";

import { IntroLoader } from "@/components/loader/IntroLoader";
import { PageTransition } from "@/components/loader/PageTransition";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CommandHint } from "@/components/ui/CommandHint";

// Global chrome: announcement bar, entrance loader, page transition, cookie
// consent and the command palette (Cmd/Ctrl+K).
// The custom cursor was removed: it reads as portfolio flourish, not club site.
// Restore by re-adding <CursorFX /> (the component is still in components/ui).
export function AppChrome() {
  return (
    <>
      <AnnouncementBar />
      <IntroLoader />
      <PageTransition />
      <CookieBanner />
      <CommandPalette />
      <CommandHint />
    </>
  );
}

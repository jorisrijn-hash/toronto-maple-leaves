"use client";

import { MotionConfig } from "framer-motion";

/**
 * The `prefers-reduced-motion` block in globals.css only neutralises CSS
 * animations and transitions. Framer Motion drives inline styles from JS, so it
 * ignores that block entirely: every reveal, drawer and page transition still
 * played at full strength for users who asked for less motion.
 *
 * `reducedMotion="user"` makes Framer skip transform and layout animations while
 * keeping opacity fades, so content still appears instead of popping in blank.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

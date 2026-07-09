import type { Variants, Transition } from "framer-motion";

// Strong custom curves (animations.dev). Built-in easings lack punch.
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

// Spring for anything that tracks the pointer or should feel "alive" (tilt, magnetic).
export const SPRING: Transition = { type: "spring", stiffness: 220, damping: 26, mass: 0.6 };

// Word / line reveal — stagger stays short (30-80ms) so it never feels slow.
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

// Scroll-triggered section lift with a real 3D flip-up so depth is obvious without
// hovering. transformPerspective is per-element, so no parent perspective is needed.
export const sectionLift: Variants = {
  hidden: { opacity: 0, y: 44, rotateX: -24, scale: 0.96, transformPerspective: 1200 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transformPerspective: 1200,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export const VIEWPORT = { once: true, amount: 0.35 } as const;

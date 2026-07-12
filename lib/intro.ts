const INTRO_DONE = "leafs:intro-done";

// Module level, not just an event. The intro loader mounts before the cookie banner
// and the shortcut hint, so on the "already seen this session" path it would fire the
// event before they had attached a listener and they would wait forever. Recording the
// state here means a late subscriber still gets told.
let done = false;

export function markIntroDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(INTRO_DONE));
}

/**
 * Runs `cb` once the page is actually visible: immediately if the intro has already
 * finished, otherwise when it does. Returns an unsubscribe function.
 */
export function whenIntroDone(cb: () => void): () => void {
  if (done) {
    // Defer by a tick so callers can still return a cleanup before cb runs.
    const t = window.setTimeout(cb, 0);
    return () => window.clearTimeout(t);
  }
  window.addEventListener(INTRO_DONE, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE, cb);
}

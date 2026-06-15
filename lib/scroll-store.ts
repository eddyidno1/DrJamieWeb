// Lightweight shared store for scroll velocity, written by <SmoothScroll>
// (the Lenis owner) and read inside GSAP tickers (e.g. the client marquee).
// A plain mutable object avoids React re-renders on every scroll frame.
export const scrollStore = {
  /** Current Lenis scroll velocity (px/frame-ish). 0 when idle. */
  velocity: 0,
};

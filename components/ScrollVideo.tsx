"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Rect = { left: number; top: number; width: number; height: number };

// Two position gates drive the sequence:
//   pHold     — intro paragraph fully in view → start expanding
//   pContract — "Ideas that" heading enters the window → start shrinking
// Between expand-end and pContract the video is held at full bleed (it's a fixed
// element at a constant rect, so it stays pinned while the page scrolls under).
//   [0, pHold]              hold at 500px start slot
//   [pHold, +expandDur]     expand → full bleed
//   [..., pContract]        hold at full bleed (pinned)
//   [pContract, +contractDur] contract → inline end slot
//   [..., 1]                settle — locked to the (live) end slot
// On mobile: full window width, and shorter (closer) expand/shrink scroll.
const isMobile = () => window.innerWidth <= 768;
const expandDur = () => (isMobile() ? 0.08 : 0.18);
const contractDur = () => (isMobile() ? 0.1 : 0.24);
const widthFactor = () => (isMobile() ? 1 : 0.8);
// Viewport fraction the heading must reach (from the top) before shrinking
// begins. Mobile: hold full-bleed until the title is 2/3 down the window.
const contractAnchor = () => (isMobile() ? 2 / 3 : 0.92);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  left: lerp(a.left, b.left, t),
  top: lerp(a.top, b.top, t),
  width: lerp(a.width, b.width, t),
  height: lerp(a.height, b.height, t),
});
const toRect = (el: Element): Rect => {
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
};

export default function ScrollVideo() {
  const box = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const start = document.getElementById("sv-start");
    const end = document.getElementById("sv-end");
    const el = box.current;
    if (!start || !end || !el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The "hold" rect. Desktop: near full-bleed, centred. Mobile: keep the
    // START size (no enlargement) — the video just rides to the centre at its
    // original size and then shrinks into the heading.
    const fullRect = (): Rect => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = isMobile() ? toRect(start).width : vw * widthFactor();
      const height = Math.min((width * 9) / 16, vh * 0.9);
      return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
    };

    const apply = (r: Rect) =>
      gsap.set(el, {
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height,
        autoAlpha: 1,
      });

    const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

    // Map a document scroll position to this trigger's progress.
    const progressAt = (scrollPos: number, self: ScrollTrigger) => {
      const range = self.end - self.start;
      return range > 0 ? clamp01((scrollPos - self.start) / range) : 0;
    };

    let pHold = 0; // paragraph fully visible → expand
    let pContract = 1; // "Ideas that" heading visible → contract
    const computeGates = (self: ScrollTrigger) => {
      const para = document.getElementById("sv-para");
      const lead = document.getElementById("sv-lead");
      if (para) {
        const r = para.getBoundingClientRect();
        // bottom edge reaches the viewport bottom = paragraph fully shown
        pHold = progressAt(r.bottom + window.scrollY - window.innerHeight, self);
      }
      if (lead) {
        const r = lead.getBoundingClientRect();
        // shrink begins once the heading's top reaches contractAnchor() of the
        // viewport height (measured from the top)
        pContract = progressAt(
          r.top + window.scrollY - window.innerHeight * contractAnchor(),
          self
        );
      }
      // Keep ordering: full-bleed hold can't start before the expand finishes.
      pContract = Math.max(pContract, Math.min(pHold + expandDur(), 1));
    };

    const update = (p: number) => {
      if (reduced) {
        apply(toRect(end));
        return;
      }
      const s = toRect(start);
      const e = toRect(end);
      const f = fullRect();
      const pExpandEnd = Math.min(pHold + expandDur(), 1);
      const pContractEnd = Math.min(pContract + contractDur(), 1);

      let r: Rect;
      if (p <= pHold) {
        r = s; // hold at 500px until the paragraph is fully shown
      } else if (p <= pExpandEnd) {
        r = lerpRect(s, f, easeInOut((p - pHold) / (pExpandEnd - pHold || 1)));
      } else if (p <= pContract) {
        r = f; // pinned at full bleed while the page scrolls under it
      } else if (p <= pContractEnd) {
        r = lerpRect(
          f,
          e,
          easeInOut((p - pContract) / (pContractEnd - pContract || 1))
        );
      } else {
        r = e; // settle, locked to the live end slot
      }
      apply(r);
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      endTrigger: end,
      // Keep tracking the slot until it has fully scrolled off the top, so the
      // media rides up and disappears with the text instead of freezing.
      end: "bottom top",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => {
        computeGates(self);
        update(self.progress);
      },
    });

    computeGates(st);
    update(st.progress);

    // Re-measure once webfonts load (paragraph height drives the start slot).
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => st.kill();
  }, {});

  return (
    <div ref={box} className="scrollvideo" aria-hidden="true">
      <video src="/dental.mp4" autoPlay muted loop playsInline preload="auto" />
    </div>
  );
}

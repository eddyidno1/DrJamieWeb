"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollStore } from "@/lib/scroll-store";

const CLIENTS = [
  "Australian Dental Association",
  "Sydney University",
  "Invisalign",
  "Spark",
  "HealthEngine",
  "CEREC",
  "Medicare",
  "Bupa",
];

export default function ClientMarquee() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Continuous loop across one copy of the list (the DOM holds two copies,
      // so -50% returns to the identical starting frame seamlessly).
      const loop = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });

      // Respond to scroll velocity: speed up briefly, ease back to a glide.
      const ticker = () => {
        const v = Math.abs(scrollStore.velocity);
        const target = 1 + Math.min(v * 0.6, 6);
        loop.timeScale(
          gsap.utils.interpolate(loop.timeScale(), target, 0.1)
        );
      };
      gsap.ticker.add(ticker);

      return () => gsap.ticker.remove(ticker);
    },
    { scope: root }
  );

  return (
    <section className="marquee" ref={root}>
      <div className="marquee__label">
        <span className="eyebrow">Technology &amp; Memberships</span>
      </div>
      <div className="marquee__track" ref={track}>
        {[0, 1].map((copy) =>
          CLIENTS.map((c) => (
            <span
              className="marquee__item"
              key={`${copy}-${c}`}
              aria-hidden={copy === 1}
            >
              {c}
            </span>
          ))
        )}
      </div>
    </section>
  );
}

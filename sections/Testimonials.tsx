"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { REVIEWS as QUOTES } from "@/lib/reviews";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const animating = useRef(false);

  const go = (dir: number) => {
    if (animating.current) return;
    animating.current = true;
    const next = (index + dir + QUOTES.length) % QUOTES.length;
    gsap.to(stage.current, {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(
          stage.current,
          { autoAlpha: 0, scale: 1.06 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => (animating.current = false),
          }
        );
      },
    });
  };

  // Drag / swipe support.
  useGSAP(
    () => {
      let startX = 0;
      const el = root.current!;
      const down = (e: PointerEvent) => (startX = e.clientX);
      const up = (e: PointerEvent) => {
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerup", up);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerup", up);
      };
    },
    { scope: root, dependencies: [index] }
  );

  const current = QUOTES[index];

  return (
    <section className="section testimonials" ref={root}>
      <div className="testimonials__inner">
        <div className="testimonials__counter">
          <b>{String(index + 1).padStart(2, "0")}</b> — {QUOTES.length}
        </div>

        <div className="testimonials__stage" ref={stage}>
          <div>
            <p className="testimonials__quote">“{current.quote}”</p>
            <p className="testimonials__author">
              <b>{current.name}</b>, {current.year}
            </p>
          </div>
        </div>

        <div className="testimonials__nav">
          <button onClick={() => go(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button onClick={() => go(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

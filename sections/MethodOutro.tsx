"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ROWS = [
  { dir: 1, outline: false },
  { dir: -1, outline: true },
  { dir: 1, outline: false },
  { dir: -1, outline: true },
];

export default function MethodOutro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".method__row", root.current);
      rows.forEach((row) => {
        const dir = Number(row.dataset.dir);
        gsap.fromTo(
          row,
          { xPercent: dir * 12 },
          {
            xPercent: dir * -12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="method" id="method" ref={root}>
      {ROWS.map((row, i) => (
        <div
          className={`method__row${row.outline ? " method__row--outline" : ""}`}
          key={i}
          data-dir={row.dir}
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, j) => (
            <span key={j}>Dr Jamie Lam</span>
          ))}
        </div>
      ))}

      <p className="method__thesis">
        Our method turns your ideal smile into a beautiful reality - and your
        trust into everyday confidence.
      </p>
    </section>
  );
}

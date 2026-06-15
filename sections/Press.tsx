"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Each photo in /public is named exactly after its headline, so the image
// path is derived from the headline — guaranteeing the right photo per item.
const ITEMS = [
  { tag: "Technology", headline: "Cone Beam CT (3D imaging)" },
  { tag: "Technology", headline: "LEICA and ZEISS Dental Microscope" },
  { tag: "Technology", headline: "3D Digital Intraoral Scanner" },
  { tag: "Technology", headline: "CEREC – Same Day Crown" },
];

export default function Press() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".press-card", root.current);
      gsap.from(cards, {
        autoAlpha: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".press__grid",
          start: "top 80%",
        },
      });
    },
    { scope: root }
  );

  return (
    <section className="section press" ref={root}>
      <div className="press__head">
        <h2 className="press__title">The precision behind your smile</h2>
        <span className="eyebrow">Our technology</span>
      </div>

      <div className="press__grid">
        {ITEMS.map((item) => (
          <a className="press-card" href="#" key={item.headline}>
            <div className="press-card__media">
              <img
                src={encodeURI(`/${item.headline}.avif`)}
                alt={item.headline}
                loading="lazy"
              />
            </div>
            <span className="press-card__tag">{item.tag}</span>
            <h3 className="press-card__headline">{item.headline}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

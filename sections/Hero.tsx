"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", headline.current);

      // Intro: staggered slide-up of each masked word, then the bottom row.
      // .from() sets the hidden start explicitly so the reveal never depends on
      // parsing a CSS transform (and the text stays visible if JS never runs).
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(reveals, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
      }).from(
        bottom.current,
        { autoAlpha: 0, y: 30, duration: 0.9 },
        "-=0.5"
      );

      // Parallax on the headline only. The bottom row (paragraph + video slot)
      // scrolls naturally so the travelling video can be gated precisely to the
      // paragraph's position.
      gsap.to(headline.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <header className="hero" ref={root}>
      <h1 className="hero__headline" ref={headline} aria-label="Meet your new family dentist">
        {["MEET", "YOUR", "NEW", "FAMILY", "DENTIST"].map((word, i, arr) => (
          <span key={word}>
            <span className="mask-word" aria-hidden="true">
              <span className="mask-inner" data-reveal>
                {word}
              </span>
            </span>
            {i < arr.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <div className="hero__bottom" ref={bottom}>
        <div className="hero__introwrap">
          <p className="hero__intro" id="sv-para" data-cursor="invert">
            I understand dentistry can be confronting for a lot of people, that
            is why I put every effort into making your visit as comfortable as
            possible. I am dedicated to your health and comfort and strive to
            provide the highest standard of care. If this sounds like what you
            are looking for, please call us.
          </p>
          {/* Start slot: the travelling video rests here on load, at the same
              height as the paragraph. The actual media is the fixed overlay
              rendered by <ScrollVideo>. */}
          <div className="hero__videoslot" id="sv-start" aria-hidden="true" />
        </div>
        <span className="hero__scroll">
          (Scroll) <span aria-hidden="true">↓</span>
        </span>
      </div>
    </header>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  "Check-ups",
  "Cleans",
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Implants",
  "Family Dentistry",
];

export default function VideoReveal() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const media = useRef<HTMLSpanElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mediaEl = media.current!;
      const txt = gsap.utils.toArray<HTMLElement>("[data-txt]", headline.current);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(txt, { autoAlpha: 1 });
        gsap.set(marquee.current, { autoAlpha: 0 });
        return;
      }

      // Scale that takes the inline media to a near full-bleed rectangle.
      const getBigScale = () => {
        const w = mediaEl.offsetWidth || 1;
        const h = mediaEl.offsetHeight || 1;
        return Math.min(
          (window.innerWidth * 0.96) / w,
          (window.innerHeight * 0.82) / h
        );
      };

      gsap.set(mediaEl, { transformOrigin: "50% 50%" });
      gsap.set(txt, { autoAlpha: 0 }); // surrounding words hidden during expansion
      gsap.set(marquee.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: pin.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        // Phase 1 — the container's top edge enters from the bottom of the
        // viewport and rises into place as a standalone block.
        .from(mediaEl, {
          y: () => window.innerHeight * 0.72,
          scale: 0.92,
          duration: 0.18,
          ease: "power2.out",
        })
        // Phase 2 — expansion to near full-bleed; services marquee fades in.
        .to(mediaEl, {
          scale: () => getBigScale(),
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(marquee.current, { autoAlpha: 1, duration: 0.08 }, "<0.06")
        // Brief hold at full bleed.
        .to(mediaEl, { scale: () => getBigScale(), duration: 0.12 })
        // Phase 3 — contraction back to inline size.
        .to(mediaEl, { scale: 1, duration: 0.28, ease: "power2.inOut" })
        .to(marquee.current, { autoAlpha: 0, duration: 0.1 }, "<")
        // Phase 4 — the headline scrolls up and locks in around the inline media.
        .to(txt, { autoAlpha: 1, duration: 0.18 }, "<0.04")
        .from(
          headline.current,
          { y: 50, duration: 0.22, ease: "power3.out" },
          "<"
        );
    },
    { scope: root }
  );

  return (
    <section className="reveal" ref={root}>
      <div className="reveal__pin" ref={pin}>
        <h2 className="reveal__headline" ref={headline}>
          <span className="reveal__txt" data-txt>
            Ideas that
          </span>{" "}
          <span className="reveal__media" ref={media}>
            <img
              src="https://picsum.photos/seed/jamie-dental-clinic/1280/720"
              alt="Inside the practice"
            />
          </span>{" "}
          <span className="reveal__txt" data-txt>
            shape the future of brands, cultures, and companies.
          </span>
        </h2>

        <div className="reveal__marquee" ref={marquee} aria-hidden="true">
          {SERVICES.join("  ·  ")} ·
        </div>
      </div>
    </section>
  );
}

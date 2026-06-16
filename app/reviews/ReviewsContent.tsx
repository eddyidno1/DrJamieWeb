"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import MaskedText from "@/components/MaskedText";
import { REVIEWS, GOOGLE_REVIEW_LINKS } from "@/lib/reviews";
import { BOOKING_URL } from "@/lib/booking";

const STATS = [
  { to: 4.9, decimals: 1, suffix: "★", label: "Google rating" },
  { to: 320, decimals: 0, suffix: "+", label: "Google reviews" },
  { to: 13, decimals: 0, suffix: "+", label: "Years of care" },
];

function Stars() {
  return (
    <span className="rv-card__stars" aria-label="5 out of 5 stars">
      {"★★★★★"}
    </span>
  );
}

export default function ReviewsContent() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Hero: masked headline, intro + stats fade in.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", hero.current);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(reveals, { yPercent: 110, duration: 1, stagger: 0.08 })
        .from(".rv-hero__eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, 0)
        .from(".rv-hero__intro", { autoAlpha: 0, y: 26, duration: 0.9 }, 0.3)
        .from(".rv-stat", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.12 }, 0.45);

      // Count-up stats.
      gsap.utils.toArray<HTMLElement>(".rv-stat__num").forEach((el) => {
        const to = Number(el.dataset.to ?? "0");
        const decimals = Number(el.dataset.decimals ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
          scrollTrigger: { trigger: hero.current, start: "top 70%" },
        });
      });

      // Review cards: staggered rise as each enters the viewport.
      gsap.utils.toArray<HTMLElement>(".rv-card").forEach((card, i) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 48,
          duration: 0.85,
          ease: "power3.out",
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: card, start: "top 92%" },
        });
      });

      // Closing CTA reveal.
      gsap.from(".rv-cta__inner > *", {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rv-cta", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <div className="rv" ref={root}>
      {/* ---------- Hero ---------- */}
      <section className="rv-hero" ref={hero}>
        <span className="rv-hero__eyebrow eyebrow">Reviews</span>
        <MaskedText text="Kind words" as="h1" className="rv-hero__title" />
        <p className="rv-hero__intro">
          Don’t just take our word for it. Here’s a selection of what patients
          across Chatswood say about their care with Dr Jamie Lam and the team at
          So Dental — drawn from our Google reviews.
        </p>

        <div className="rv-stats">
          {STATS.map((s) => (
            <div className="rv-stat" key={s.label}>
              <span
                className="rv-stat__num"
                data-to={s.to}
                data-decimals={s.decimals}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </span>
              <span className="rv-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Review grid (masonry) ---------- */}
      <section className="rv-grid">
        {REVIEWS.map((r, i) => (
          <article className="rv-card" key={`${r.name}-${i}`}>
            <span className="rv-card__mark" aria-hidden="true">
              &ldquo;
            </span>
            <Stars />
            <p className="rv-card__quote">{r.quote}</p>
            <footer className="rv-card__author">
              <span className="rv-card__avatar" aria-hidden="true">
                {r.name.charAt(0)}
              </span>
              <span className="rv-card__meta">
                <b>{r.name}</b>
                <span>Google review · {r.year}</span>
              </span>
            </footer>
          </article>
        ))}
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="rv-cta">
        <div className="rv-cta__inner">
          <span className="eyebrow">Your turn</span>
          <h2 className="rv-cta__title">
            Join the families <br />
            who smile with us.
          </h2>
          <p className="rv-cta__text">
            Book your first visit and find out why our patients keep coming back.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-cta__btn"
            data-cursor="invert"
          >
            <span>Schedule a consult</span>
            <span className="rv-cta__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <div className="rv-cta__google">
            <span className="rv-cta__google-label">
              Read all reviews on Google
            </span>
            <div className="rv-cta__google-links">
              {GOOGLE_REVIEW_LINKS.map((g) => (
                <a
                  key={g.url}
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv-cta__google-link"
                  data-cursor="invert"
                >
                  <span>{g.label}</span>
                  <span className="rv-cta__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

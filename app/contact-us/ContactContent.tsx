"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import MaskedText from "@/components/MaskedText";
import { CLINICS, PHONE, PHONE_HREF, EMAIL } from "@/lib/clinics";

// Big, clickable direct-contact rows.
const DIRECT = [
  {
    who: "Dr Jamie Lam",
    label: "Email me directly",
    value: "drjamielam@gmail.com",
    href: "mailto:drjamielam@gmail.com",
  },
  {
    who: "So Dental",
    label: "Call the practice",
    value: PHONE,
    href: PHONE_HREF,
  },
  {
    who: "So Dental",
    label: "General enquiries",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
];

type Hours = { days: string; time: string }[];

// Mon–Sat are identical across both clinics; only Sunday differs.
const WEEK_HOURS: Hours = [
  { days: "Mon – Wed", time: "8:30am – 6:00pm" },
  { days: "Thursday", time: "8:30am – 7:00pm" },
  { days: "Friday", time: "8:30am – 6:00pm" },
  { days: "Saturday", time: "8:30am – 5:00pm" },
];

// Per-clinic extras (hours + blurb), merged onto the shared clinic data so the
// addresses, map and review links stay in a single source of truth.
const EXTRAS: Record<string, { num: string; blurb: string; hours: Hours }> = {
  "chatswood-place": {
    num: "01",
    blurb: "Conveniently located at Chatswood Place shopping centre.",
    hours: [...WEEK_HOURS, { days: "Sunday", time: "9:00am – 4:00pm" }],
  },
  "lemon-grove": {
    num: "02",
    blurb: "Conveniently located in Lemon Grove shopping centre.",
    hours: [...WEEK_HOURS, { days: "Sunday", time: "Closed" }],
  },
};

const LOCATIONS = CLINICS.map((c) => ({ ...c, ...EXTRAS[c.id] }));

export default function ContactContent() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", hero.current);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(reveals, { yPercent: 110, duration: 1, stagger: 0.08 })
        .from(".contact-hero__eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, 0)
        .from(".contact-hero__intro", { autoAlpha: 0, y: 26, duration: 0.9 }, 0.3);

      // Direct rows slide up one by one.
      gsap.from(".contact-direct__row", {
        autoAlpha: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-direct", start: "top 82%" },
      });

      // Section heading masks.
      gsap.utils.toArray<HTMLElement>(".contact-heading").forEach((h) => {
        const words = gsap.utils.toArray<HTMLElement>("[data-reveal]", h);
        gsap.from(words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: h, start: "top 85%" },
        });
      });

      // Location cards reveal.
      gsap.utils.toArray<HTMLElement>(".contact-loc").forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <div className="contact" ref={root}>
      {/* ---------- Hero ---------- */}
      <section className="contact-hero" ref={hero}>
        <span className="contact-hero__eyebrow eyebrow">Contact</span>
        <MaskedText
          text="Let’s talk"
          as="h1"
          className="contact-hero__title"
        />
        <p className="contact-hero__intro">
          Contact me directly via email, or call the practice. Whether you’re
          booking your first visit, in need of pain relief, or just have a
          general dental question — I’d love to hear from you.
        </p>
      </section>

      {/* ---------- Direct contact ---------- */}
      <section className="contact-direct">
        <span className="contact-direct__label eyebrow">
          Reach me directly
        </span>
        <ul className="contact-direct__list">
          {DIRECT.map((d) => (
            <li className="contact-direct__row" key={d.label}>
              <a href={d.href} className="contact-direct__link" data-cursor="invert">
                <span className="contact-direct__meta">
                  <span className="contact-direct__who">{d.who}</span>
                  <span className="contact-direct__caption">{d.label}</span>
                </span>
                <span className="contact-direct__value">
                  {d.value}
                  <span className="contact-direct__arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Locations ---------- */}
      <section className="contact-locations">
        <div className="contact-locations__head">
          <MaskedText
            text="Two Chatswood clinics"
            as="h2"
            className="contact-heading"
          />
          <p className="contact-locations__sub">
            Both fully accredited and equipped with the latest technology.
          </p>
        </div>

        <div className="contact-locations__grid">
          {LOCATIONS.map((loc) => (
            <article className="contact-loc" key={loc.name}>
              <span className="contact-loc__num" aria-hidden="true">
                {loc.num}
              </span>
              <h3 className="contact-loc__name">{loc.name}</h3>
              <p className="contact-loc__address">{loc.address}</p>

              <dl className="contact-loc__details">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={PHONE_HREF} data-cursor="invert">
                      {PHONE}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`} data-cursor="invert">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="contact-loc__hours">
                <span className="contact-loc__hoursTitle">Opening hours</span>
                <dl className="contact-loc__hoursList">
                  {loc.hours.map((h) => (
                    <div key={h.days}>
                      <dt>{h.days}</dt>
                      <dd className={h.time === "Closed" ? "is-closed" : undefined}>
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="contact-loc__blurb">{loc.blurb}</p>

              <div className="contact-loc__mapWrap">
                <iframe
                  className="contact-loc__embed"
                  src={loc.embedUrl}
                  title={`Map of ${loc.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-loc__map"
                data-cursor="invert"
              >
                <span>Get directions</span>
                <span className="contact-loc__mapArrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

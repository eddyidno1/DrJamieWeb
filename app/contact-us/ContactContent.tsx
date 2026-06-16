"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import MaskedText from "@/components/MaskedText";

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
    value: "(02) 9413 1446",
    href: "tel:+61294131446",
  },
  {
    who: "So Dental",
    label: "General enquiries",
    value: "info@sodental.com.au",
    href: "mailto:info@sodental.com.au",
  },
];

const LOCATIONS = [
  {
    num: "01",
    name: "So Dental Chatswood Place",
    address: "54 Hercules St, Chatswood NSW 2067",
    phone: "(02) 9413 1446",
    phoneHref: "tel:+61294131446",
    email: "info@sodental.com.au",
    blurb:
      "Conveniently located at Chatswood Place shopping centre.",
    map: "https://maps.google.com/?q=54+Hercules+St,+Chatswood+NSW+2067",
  },
  {
    num: "02",
    name: "So Dental Lemon Grove",
    address:
      "Shop 37, Lemon Grove Shopping Centre, 431 Victoria Ave, Chatswood NSW 2067",
    phone: "(02) 9413 1446",
    phoneHref: "tel:+61294131446",
    email: "info@sodental.com.au",
    blurb:
      "Conveniently located in Lemon Grove shopping centre.",
    map: "https://maps.google.com/?q=Lemon+Grove+Shopping+Centre,+431+Victoria+Ave,+Chatswood+NSW+2067",
  },
];

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
                    <a href={loc.phoneHref} data-cursor="invert">
                      {loc.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${loc.email}`} data-cursor="invert">
                      {loc.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="contact-loc__blurb">{loc.blurb}</p>

              <a
                href={loc.map}
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

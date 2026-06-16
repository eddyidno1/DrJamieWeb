"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { BOOKING_URL } from "@/lib/booking";

const LINKS = [
  { label: "New patient comprehensive exam", href: "/new-patients", external: false },
  { label: "Pain relief appointment", href: BOOKING_URL, external: true },
  { label: "Explore our services", href: "/services", external: false },
];

export default function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-fade]", root.current);
      blocks.forEach((block) => {
        gsap.from(block, {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section philosophy" id="programs" ref={root}>
      <h2 className="philosophy__lead" id="sv-lead" data-fade>
        Guiding your dental care journey{" "}
        {/* End slot: the travelling video locks in here, inline in the text. */}
        <span className="philosophy__videoslot" id="sv-end" aria-hidden="true" />{" "}
        and getting to know me.
      </h2>

      <div className="philosophy__body">
        <p data-fade>
          I have made this website to help answer some of the everyday questions
          people may have about teeth and treatments that are available for any
          problems they may have, more importantly I understand meeting for the
          first time is confronting, so I want this to be an opportunity for you
          to get to know me.
        </p>
        <p data-fade>If you have any questions please talk to me about it.</p>

        <nav className="cta-links" data-fade aria-label="Primary">
          {LINKS.map((link) => (
            <a
              className="cta-link"
              href={link.href}
              key={link.label}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="cta-link__arrow" aria-hidden="true">
                →
              </span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
